import express, { Request, Response } from "express";
const app = express();
app.use(express.json());
const menuRoute = express.Router();


// GET MENU


menuRoute.get("/", async (req:Request, res:Response) => {
    res.json('nice!')
})











export default menuRoute