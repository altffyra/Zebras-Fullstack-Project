import express, { Request, Response } from "express";
import {join, dirname} from 'path'
import {fileURLToPath}from 'url'
import userRoute from './Routes/UserRoute.js'
import orderRoute from './Routes/OrderRoute.js'
import menuRoute from './Routes/MenuRoute.js'

import cors from 'cors';

const app = express();
const PORT: number = 8000;

app.use(cors({ origin: "*" }));

app.use(express.json());

const __dirname:string = dirname(fileURLToPath(import.meta.url));
const staticPath:string = join(__dirname, '../../dist')



app.use("/api/menu", menuRoute)
app.use("/api/order", orderRoute)
app.use("/api/user", userRoute)

// HA KVAR FÖR DET AKTIVERAR DATABASEN
// @ts-ignore

// async function start(){
// // const lolw = await lol()
// }
// start()

app.use(express.static(staticPath))


app.listen(PORT, () => {
    console.log("Running on ", PORT);
  });
  

//cartItems: MenuItems[];
////totalPrice: number;
//user: User;
////userComment: string;
//adminComment: string;
//locked: boolean;
//completed: boolean;
//orderPlaced: string;



//name: string;
//email: string;
//accountId: string;
//phoneNumber: string;
//admin?: boolean;
