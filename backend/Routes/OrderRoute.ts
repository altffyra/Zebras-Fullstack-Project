import express, { NextFunction, Request, Response } from "express";
 const app = express();
 app.use(express.json());
 const orderRoute = express.Router();
 import {User, Order} from '../lowDb/dbinterface'
 import db, {authenticateLogin, getOrders,checkOrder, updateOrder, createOrder, started, completed} from '../lowDb/database.js'
 import { isValidCart, isValidUpdatedOrder } from "../validators/validOrder.js";
 import { isValidUser, isValidGuest } from "../validators/validUser.js";
import { uuid } from "uuidv4";



 const auth = async function (req:Request, res:Response, next:NextFunction) {
  
   const idhead = req.header('accountID')
   if (!idhead ) 
     {
     return res.status(403).json({ error: 'no credentials.' });
     } 

   if (idhead)
     {
       const checklogin:User[] = await authenticateLogin(idhead)
       if (checklogin.length>0) next();
        else 
       return res.json({ error: 'not an admin' })
      
     }
 };







 // GET ORDER
 type IdObject = { id: string };
 type IdParam = Request<IdObject>;

 orderRoute.get("/user/:id", async (req:IdParam, res:Response) => {
     const id:string = req.params.id;
     let resOrders = await getOrders()
     let filter = resOrders.filter((order:Order) => order.id == id);

   if (filter.length > 0) {
     res.send(filter);
   } else {
     res.sendStatus(404);
   }
 });


// // GET ALL ORDERS ADMIN
 orderRoute.get("/admin", auth, async (req:Request, res:Response) => {
     const resOrders:Order[] = await getOrders()
     res.json(resOrders)
 })


// // GET USER ORDERS
 type nameObject = { name: string };
 type nameParam = Request<nameObject>;

 orderRoute.get("/:name", async (req:nameParam, res:Response) => {
     const name:string = req.params.name;
     let resOrders = await getOrders()
     let filter = resOrders.filter((order:Order) => order.user.name == name);
   if (filter.length > 0) {
     res.send(filter);
   } else {
     res.sendStatus(404);
   }
   
 });

// // MAKE ORDER
orderRoute.post("/", async (req, res) => {
  let orderObj: Order = req.body;
  const func = orderObj.user.accountId ? isValidUser : isValidGuest;
  const person = func == isValidUser ? 'user' : 'guest';

  
 if (func(orderObj.user)) {
    if(isValidCart(orderObj)) {
      orderObj.locked = false;
      orderObj.completed = false;
      orderObj.orderPlaced = started;
      orderObj.orderCompleted = completed;
      orderObj.id = uuid();
      await createOrder(orderObj)
      res.status(200).send('Order placed')

    } else {
      res.status(400).send('Bad cart')
    }

  } else {
    res.status(400).send('Bad '+ person)
  }
})

// // CHANGE ORDER
orderRoute.put("/:id", async (req:IdParam, res:Response) => {
  const id:string = req.params.id;  
  let updatedOrder: Order = req.body;
  const foundIndex: number = await checkOrder(id);
  if(foundIndex === -1) {
    res.status(400).send('No order with that id')
    return
  }

  if(isValidUser(updatedOrder.user)) {
    if(isValidCart(updatedOrder)) {    
      if(isValidUpdatedOrder(updatedOrder)) {        
          const checkedOrder = await updateOrder(updatedOrder, foundIndex)
          if(!checkedOrder) {
            res.send({locked: true})
            return
          }
          res.sendStatus(200)
      } else {
        res.status(400).send('Bad placed order')
      }
    } else {
      res.status(400).send('Bad order')
    }
  } else {
    res.status(400).send('Bad user')
  }
});

// GET ALL FOR TESTING
orderRoute.get("/", async (req:IdParam, res:Response) => {
  const id:string = req.params.id;
  let resOrders = await getOrders()
  if (resOrders.length > 0) {
    res.send(resOrders);
  } else {
    res.sendStatus(404);
  }
});

// // function isValidOrder(isorder: Order)
   


// //{user: (account ID/guest), cartItems: [] , orderPlaced: , userComment: , adminComment: , locked: , completed: , id:  }













export default orderRoute