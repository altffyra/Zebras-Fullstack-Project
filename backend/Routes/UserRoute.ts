import express, { Request, Response } from "express";
import { User } from "../lowDb/dbinterface";
import { newUser, getUsers } from "../lowDb/database.js";

const app = express();
app.use(express.json());
const userRoute = express.Router();

userRoute.get('/', async (req, res) => {
    const users = await getUsers()
    console.log(users)
    res.json(users)
})

// LOGIN


// SIGNUP
userRoute.post("/signup", async (req, res) => {
    
    const userData: User = req.body

    const userList = await getUsers()
    
    console.log('userData:', userData);
    
    console.log('userList', userList)
    res.json()
    

})

// UPDATE USER

//user{name: , email: , accountId: , accountID: , phoneNumber: ,admin: , }














export default userRoute