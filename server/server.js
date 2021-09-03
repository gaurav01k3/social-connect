import express from "express";
import dotenv from "dotenv";
import connectDB from './config/db.js';
import morgan from 'morgan';
import authRouter from "./routers/auth.router.js";
import postRouter from "./routers/post.router.js";

const app = express();
dotenv.config({ path: "./config.env" });
connectDB();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('tiny'))

app.use('/api', authRouter);
app.use('/api', postRouter);


export const start = () => {
    app.listen(PORT, () => {
        console.log("Server is running on PORT", PORT);
    })
}