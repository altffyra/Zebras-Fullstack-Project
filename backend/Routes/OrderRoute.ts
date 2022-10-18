import express, { NextFunction, Request, Response } from "express";
import { IncomingHttpHeaders } from 'http';
const app = express();
app.use(express.json());
const orderRoute = express.Router();
import {MenuItems, headersType, User} from '../lowDb/dbinterface'
import {authenticateLogin, getOrders} from '../lowDb/database.js'
import {Order} from '../lowDb/dbinterface.js'
import { stringify } from "querystring";








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
    let filter = resOrders.orders.filter((order:Order) => order.id == id);

  if (filter.length > 0) {
    res.send(filter);
  } else {
    res.sendStatus(404);
  }
});


// GET ALL ORDERS ADMIN
orderRoute.get("/admin", auth, async (req:Request, res:Response) => {
    const resOrders:Order[] = await getOrders()
    res.json(resOrders)
})


// GET USER ORDERS
type nameObject = { name: string };
type nameParam = Request<nameObject>;

orderRoute.get("/:name", async (req:nameParam, res:Response) => {
    const name:string = req.params.name;
    let resOrders = await getOrders()
    let filter = resOrders.orders.filter((order:Order) => order.user.name == name);
  if (filter.length > 0) {
    res.send(filter);
  } else {
    res.sendStatus(404);
  }
});

// MAKE ORDER



// CHANGE ORDER


// function isValidOrder(isorder: Order)
   


//{user: (account ID/guest), cartItems: [] , orderPlaced: , userComment: , adminComment: , locked: , completed: , id:  }













export default orderRoute