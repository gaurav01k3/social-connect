import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import requireLogin from '../middleware/requireLogin.js';

const router = express.Router();

dotenv.config({ path: "./config.env" })

const authRouter = express.Router();


//signup route
authRouter.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(422).json({ error: "All the fields are required!" })
    }
    try {
        const savedUser = await User.findOne({ email: email });
        if (savedUser) {
            console.log(savedUser);
            return res.status(422).json({ error: "User already exists" })
        }
        else {
            try {
                const hashPassword = await bcrypt.hash(password, 12)
                const user = new User({
                    name, email, password: hashPassword
                })
                const result = await user.save()
                res.send(result);
            }
            catch (err) {
                console.log(err);
            }
        }
    } catch (err) {
        console.log(err);
    }
})

//login route
authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(422).json({ error: "All the fields are required!" })
    }
    try {
        const savedUser = await User.findOne({ email: email });
        if (savedUser) {
            try {
                const passMatch = await bcrypt.compare(password, savedUser.password)
                if (!passMatch)
                    return res.status(422).json({ error: "Invalid Details" })
                else {
                    const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET)
                    const { _id, name, email } = savedUser;
                    res.json({ token, user: { _id, name, email } });
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            return res.status(422).json({ error: "Invalid Details" })
        }
    } catch (err) {
        console.log(err);
    }
})

export default authRouter;