import express, { Request, Response } from "express";
import { User, LoginCreds } from "../lowDb/dbinterface";
import db, { findUser, createAccount, findAccount, updateUser, getUser } from "../lowDb/database.js";
import { data as defaultData } from '../defaultData.js'
import { isValidUser } from "../validators/validUser.js";
import { uuid } from 'uuidv4';
const app = express();
app.use(express.json());
const userRoute = express.Router();

// SIGNUP
userRoute.post('/signup', async (req, res) => {
    const userData: User = req.body
    const resObj = {
        success: true,
        userExist: false,
        user: {
            name: '',
            email: '',
            password: '',
            phoneNumber: '',
            accountId: '',
            // admin: false,
        },
        message: `Konto skapat för: ${userData.name}`
    }
    if( !userData ) {
        resObj.message = '400 No data'
        res.json(resObj)
    } else if( isValidUser(userData) ) {
        const userExist = await findUser(userData)
        if( userExist.length > 0 ) {
            resObj.userExist = true
            resObj.message = `Konto finns redan för ${userData.name}`
        } 
        if( resObj.userExist ) {
            resObj.success = false
        } else {
            userData.accountId = uuid()
            createAccount(userData)
            resObj.user = userData
        }
    }
        res.send(resObj)
})

// LOGIN
userRoute.post('/login', async (req, res) => {
    if( !db.data ) {
        db.data = defaultData
  }
    const userData: LoginCreds = req.body

    const resObj = {
        success: false,
        user: {
            name: '',
            email: '',
            password: '',
            phoneNumber: '',
            accountId: '',
            // admin: false,
        },
        message: 'No credentials'
    }

    const foundAccount = await findAccount(userData)

    if( foundAccount.length === 1) {
        let account = foundAccount[0]
        if( userData.name === account.name && userData.password === account.password) {
            resObj.success = true
            resObj.user = account
        } 
    } 
    
    res.json(resObj)
})

//   GET USER
userRoute.get('/:id', async (req, res) => {
    const id:string = req.params.id;
    const user: User | boolean = await getUser(id)
    if(!user) {
        res.status(400).send({error: true})
        return
    }
    res.status(200).send(user)
})

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


export default userRoute