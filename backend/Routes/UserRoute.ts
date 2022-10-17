import express, { Request, Response } from "express";
const app = express();
app.use(express.json());
const userRoute = express.Router();



// LOGIN


userRoute.get("/signup", async (req:Request, res:Response) => {
    res.json('nice!')
})

// SIGNUP

// UPDATE USER

//user{name: , email: , accountId: , accountID: , phoneNumber: ,admin: , }



//{
  //  "cart": {[cartItems:[ ],  "totalPrice": 0}
  //  "user": { "name": "",
  //  "email": "",
  //  "accountId": "",
  //  "phoneNumber": "",
  //  "admin": false },

  //  "userComment": "",
  //  "adminComment": "",
  //  "locked": false,
  //  "completed": false,
  //  "orderPlaced": "",
  //  "id":""
  //} 












export default userRoute