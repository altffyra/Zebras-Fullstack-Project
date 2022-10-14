import express, { Request, Response } from "express";
const app = express();
app.use(express.json());
const orderRoute = express.Router();
import {getOrders} from '../lowDb/database.js'
import {Order} from '../lowDb/dbinterface.js'




// GET USER ORDERS
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
orderRoute.get("/admin", async (req:Request, res:Response) => {
    const resOrders:Order[] = await getOrders()
    res.json(resOrders)
})



// GET ORDER

// MAKE ORDER

// CHANGE ORDER


//{user: (account ID/guest), cartItems: [] , orderPlaced: , userComment: , adminComment: , locked: , completed: , id:  }













export default orderRoute