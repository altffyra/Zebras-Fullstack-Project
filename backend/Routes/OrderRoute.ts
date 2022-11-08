import express, { NextFunction, Request, Response } from "express";
 const app = express();
 app.use(express.json());
 const orderRoute = express.Router();
 import {User, Order} from '../lowDb/dbinterface'
 import { authenticateLogin, getOrders,checkOrder, createOrderInfo, updateOrder, createOrder, adminUpdateOrder, deleteOrder} from '../lowDb/database.js'
 import { isValidCart, isValidUpdatedOrder } from "../validators/validOrder.js";
 import { isValidUser, isValidGuest } from "../validators/validUser.js";

 const auth = async function (req:Request, res:Response, next:NextFunction) {
  
   const idhead = req.header('accountID')
   if (!idhead ) 
     {
     return res.status(403).json({ error: 'no credentials.' });
     } 

   if (idhead)
     {         
       const checklogin: User[] = await authenticateLogin(idhead)
       if (checklogin.length > 0) next();
        else 
       return res.json({ error: 'not an admin' })
      
     }
 };

// SEARCH ORDER
orderRoute.get('/:id', async (req:IdParam, res:Response) => {
  const id:string = req.params.id;  
  
  let resOrders = await getOrders()
  let filter = resOrders.filter((order:Order) => order.id == id);
  if (filter.length > 0) {
    res.send(filter);
  } else {
    res.send({found: false})
  }
})

type IdObject = { id: string };
type IdParam = Request<IdObject>;

// GET USER ORDERS
 orderRoute.get("/user/:id", async (req:IdParam, res:Response) => {
     const id:string = req.params.id;
     let resOrders = await getOrders()
     let filter = resOrders.filter((order:Order) => order.user.accountId == id);
     res.send(filter);
 });


// GET ALL ORDERS ADMIN
orderRoute.get("/admin/orders", auth, async (req:Request, res:Response) => {

  const resOrders: Order[] = await getOrders()

  if (resOrders) {
    res.send(resOrders);
  } else {
    res.sendStatus(404);
  }
})


// MAKE ORDER
orderRoute.post("/", async (req, res) => {
  let orderObj: Order = req.body;
  const func = orderObj.user.accountId ? isValidUser : isValidGuest;
  const person = func == isValidUser ? 'user' : 'guest'

  
  if (func(orderObj.user)) {
    if(isValidCart(orderObj)) {
      orderObj.locked = false;
      orderObj.completed = false;
      
      const orderInfo = await createOrderInfo();
      orderObj.orderPlaced = orderInfo.started;
      orderObj.orderCompleted = orderInfo.completed;
      orderObj.id = orderInfo.id

      await createOrder(orderObj)
      res.status(200).send(orderObj)
    } else {
      res.status(400).send('Bad cart')
    }

  } else {
    res.status(401).send('Bad '+ person)
  }
})

// CHANGE ORDER
orderRoute.put("/:id", async (req:IdParam, res:Response) => {
  const id:string = req.params.id;  
  let updatedOrder: Order = req.body;
  
  const foundIndex: number = await checkOrder(id);
  if(foundIndex === -1) {
    res.status(400).send('No order with that id')
    return
  }
  if(isValidGuest(updatedOrder.user)) {
    if(isValidCart(updatedOrder)) {    
      if(isValidUpdatedOrder(updatedOrder)) {      
          if(updatedOrder.completed) {
            res.send({locked: true})
            return
          }
          const checkedOrder: boolean = await updateOrder(updatedOrder, foundIndex)
          
          if(!checkedOrder) {
            res.send({locked: true})
            return
          }
          res.status(200).send(updatedOrder)
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

// DELETE ORDER
orderRoute.delete("/delete/:id", async (req:IdParam, res:Response) => {
  const id:string = req.params.id;
  let resOrders: Order | undefined = await deleteOrder(id)
  if (resOrders){
    if(resOrders.locked == false) {
      res.status(200).send({locked: false})
    } else {
      res.status(200).send({locked: true})
    }
  }
  else res.status(400).send('Error')
});


// CHANGE ADMIN ORDER
orderRoute.put("/admin/:id", auth, async (req:Request, res:Response) => {
  const id:string = req.params.id;  
  let updatedOrder: Order = req.body;
  const foundIndex: number = await checkOrder(id);
  if(foundIndex === -1) {
    res.status(400).send('No order with that id')
    return
  }

  res.status(200)
  if(isValidGuest(updatedOrder.user)) {
    if(isValidCart(updatedOrder)) {    
      if(isValidUpdatedOrder(updatedOrder)) {        
          const allOrders: Order[] = await adminUpdateOrder(updatedOrder, foundIndex)

        
          res.status(200).send(allOrders)
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
  
export default orderRoute