import express, { Request, Response } from "express";
import { User } from "../lowDb/dbinterface";
import { findUser, createAccount, updateUser,getUsers } from "../lowDb/database.js";
import { isValidUser } from "../validators/validUser.js";
const app = express();
app.use(express.json());
const userRoute = express.Router();


// SIGNUP

userRoute.post('/signup', async (req, res) => {

    const userData: User = req.body
    const resObj = {
        success: true,
        userExist: false,
        message: `Konto skapat för: ${userData.name}`
    }
    if( !userData ) {
        resObj.message = '400 No data'
        res.json(resObj)
    } else if( isValidUser(userData) ) {
        const userExist = await findUser(userData)
        if( userExist !== undefined ) {
            resObj.userExist = true
            resObj.message = `Konto finns redan för ${userData.name}`
        } 
        if( resObj.userExist ) {
            resObj.success = false
        } else {
            createAccount(userData)
        }
    }
        res.send(resObj)
})

// LOGIN


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

  // UPDATE USER
  type IdObject = { id: string };
  type IdParam = Request<IdObject>;
  userRoute.put('/:id', async (req:IdParam, res:Response) => {
    const id:string = req.params.id;
    let updatedUser: User = req.body;
    const checkIfUpdate = await updateUser(id, updatedUser)
    if(!checkIfUpdate) {
        res.status(400).send({success: false})
    }
    res.status(200).send({success: true})
  })

  userRoute.get('/', async(req, res) => {
    const lol = await getUsers()
    res.send(lol)
  })


export default userRoute