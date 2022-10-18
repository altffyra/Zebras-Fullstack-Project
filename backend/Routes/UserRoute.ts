import express, { Request, Response } from "express";
import { User } from "../lowDb/dbinterface";
import { newUser, getUsers, findUser } from "../lowDb/database.js";

const app = express();
app.use(express.json());
const userRoute = express.Router();

userRoute.get('/', async (req, res) => {
    const users: User[] = await getUsers()
    console.log(users)
    res.json(users)
})

// LOGIN


// SIGNUP
userRoute.post("/signup", async (req, res) => {
    
    const userData: User = req.body
    let userExist: User = await findUser(userData)

    const resObj = {
        success: true,
        userExist: false
    }

    newUser(userData)
    console.log('userExist:', userExist)
    console.log('userData:', userData);
    

    res.json(resObj)
    

})

// UPDATE USER

//user{name: , email: , accountId: , accountID: , phoneNumber: ,admin: , }














export default userRoute