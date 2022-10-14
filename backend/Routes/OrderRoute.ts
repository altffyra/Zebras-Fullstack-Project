import express, { Request, Response } from "express";
const app = express();
app.use(express.json());
const orderRoute = express.Router();

// GET USER ORDERS



orderRoute.get("/", async (req:Request, res:Response) => {
    

    res.json('getOrders!')
})
// GET ORDERS

// GET ORDER

// MAKE ORDER

// CHANGE ORDER


//{user: (account ID/guest), cartItems: [] , orderPlaced: , userComment: , adminComment: , locked: , completed: , id:  }













export default orderRoute