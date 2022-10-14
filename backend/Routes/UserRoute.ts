import express, { Request, Response } from "express";
import { User } from "../lowDb/dbinterface";
import { newUser } from "../lowDb/database";
import { findUser } from "../lowDb/database";
const app = express();
app.use(express.json());
const userRoute = express.Router();



// LOGIN


// SIGNUP
userRoute.post("/signup", async (req:Request, res:Response) => {
    const userData: User = req.body
    
    const resObj = {
        success: true,
        userExist: false
    }
    const userExist = await findUser(userData)
    if( userExist.length > 0 ) {
        resObj.success = false;
    }
    if( resObj.userExist ) {
        resObj.success = false
    } else {
        await newUser(userData)
    }
    res.json(resObj);
})

// UPDATE USER

//user{name: , email: , accountId: , accountID: , phoneNumber: ,admin: , }














export default userRoute