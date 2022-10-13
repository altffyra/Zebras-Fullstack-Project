import express, { Request, Response } from "express";
import {join, dirname} from 'path'
import {fileURLToPath}from 'url'
import userRoute from './Routes/UserRoute.js'
import orderRoute from './Routes/OrderRoute.js'
import menuRoute from './Routes/MenuRoute.js'

const app = express();
const PORT: number = 8000;

app.use(express.json());

const __dirname = dirname(fileURLToPath(import.meta.url));
const staticPath = join(__dirname, '../../dist')
app.use(express.static(staticPath))



app.use("/menu", menuRoute)
app.use("/order", orderRoute)
app.use("/user", userRoute)




app.listen(PORT, () => {
    console.log("Running on ", PORT);
  });
  