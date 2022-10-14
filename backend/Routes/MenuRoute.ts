import express, { Request, Response } from "express";
const app = express();
app.use(express.json());
const menuRoute = express.Router();
import {getMenu} from '../lowDb/database.js'
import {MenuItems} from '../lowDb/dbinterface.js'


// GET MENU


menuRoute.get("/", async (req:Request, res:Response) => {
    const resMenu = await getMenu()
    res.json(resMenu)
})











export default menuRoute