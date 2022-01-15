import express, {Request, Response} from 'express';
import cors from 'cors';
import type { ErrorRequestHandler } from "express";
import {farmdataRouter} from './routes/farmdataRouter'
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';

import {create, db} from './models/db';
import { Farmdata } from './types/farm_data';


const app = express();
dotenv.config();


const errorHandler: ErrorRequestHandler = (err, req, res, next) => {};
app.use(errorHandler);

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use("/", farmdataRouter);




app.listen(process.env.PORT, () => {
  console.log(`Server is running at https://localhost:${process.env.PORT}`);
});