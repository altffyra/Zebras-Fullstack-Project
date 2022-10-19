import express, { Request, Response } from "express";
import { User } from "../lowDb/dbinterface";
import db from "../lowDb/database.js";
import { resolve } from "path";
import { data as defaultData } from "../defaultData.js";
import { isValidUser } from "../validators/validUser.js";
const app = express();
app.use(express.json());
const userRoute = express.Router();


// SIGNUP

userRoute.post('/signup', async (req, res) => {
//     if( !db.data ) {
//         db.data = defaultData
//   }
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
        if( !db.data ) {
            db.data = defaultData
        }
        const userExist = await db.data.users.filter((user) => user.email === userData.email || user.name === userData.name)
        if( userExist.length > 0 ) {
            resObj.userExist = true
        } else {
            db.data.users.push(userData)
            db.write()
        }
    }
        res.send(resObj)
})

// userRoute.post("/signup", async (req, res) => {

//     const userData: User = req.body
//     let userExist: User = await findUser(userData)

//     const resObj = {
//         success: true,
//         userExist: false
//     }

//     newUser(userData)
//     console.log('userExist:', userExist)
//     console.log('userData:', userData);


//     res.json(resObj)
// })
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



export default userRoute