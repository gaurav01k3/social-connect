import express from 'express'
import mongoose from 'mongoose'
import requireLogin from '../middleware/requireLogin.js';
import { Post } from '../models/post.model.js';

const postRouter = express.Router();

//All posts
postRouter.get('/all-posts', async (req, res) => {
    try {
        const Posts = await Post.find()
            .populate("createdBy", "-password")
        res.json({ Posts });
        console.log(Posts);
    }
    catch (err) {
        console.log(err);
    }
})

//create post
postRouter.post('/create-post', requireLogin, async (req, res) => {
    const { title, description, imageUrl } = req.body;
    if (!title || !description || !imageUrl)
        return res.status(422).json({ error: "Enter the fields carefully" });
    const post = new Post({
        title,
        description,
        image: imageUrl,
        createdBy: req.user
    })
    try {
        const resultPost = await post.save();
        res.json(resultPost);
    }
    catch (err) {
        console.log(err);
    }
})

//All post of logged in user
postRouter.get('/all-posts/me', requireLogin, async (req, res) => {
    try {
        const Posts = await Post.find({ createdBy: req.user })
            .populate("createdBy", "-password")
        res.json({ Posts });
    }
    catch (err) {
        console.log(err);
    }
})


export default postRouter;