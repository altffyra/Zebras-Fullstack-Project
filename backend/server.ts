import express, { Request, Response } from "express";
import {join, dirname} from 'path'
import {fileURLToPath}from 'url'
import userRoute from './Routes/UserRoute.js'
import orderRoute from './Routes/OrderRoute.js'
import menuRoute from './Routes/MenuRoute.js'

import cors from 'cors';

const app = express();
const PORT: number = 8080;

app.use(cors({ origin: "*" }));

app.use(express.json());

const __dirname:string = dirname(fileURLToPath(import.meta.url));
const staticPath:string = join(__dirname, '../../dist')

app.use("/api/menu", menuRoute)
app.use("/api/order", orderRoute)
app.use("/api/user", userRoute)

app.use(express.static(staticPath))


app.listen(PORT, () => {
    console.log("Running on ", PORT);
  });