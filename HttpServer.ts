
import express from 'express';
import dotenv from 'dotenv';
import { startDB } from './db/Database';
import bodyParser from 'body-parser'
import { userRouter } from './endpoints/user/UserRoute';


dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(bodyParser.json())

app.use(userRouter)



startDB()

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});     