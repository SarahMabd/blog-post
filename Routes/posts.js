const express = require('express')
const mongoose = require('mongoose')
const PostRouter = express.Router()
const Posts = require('./../Models/posts')

exports.Router = PostRouter;
exports.Post = Posts;

//get list of all posts
PostRouter.get('/', async(req, res) => {
    try{
        const posts = await Posts.find({}).exec();
        res.statusCode = 200;
        res.send({"Posts" : posts});
    }catch(err){
         res.statusCode = 422;
         res.send({ "message" : "Something went wrong, try to refresh"});
    }
    // res.render('posts/new')
});
PostRouter.post('/', async(req, res) => {
    const {title, author, post} = req.body;
    try {
        let addPost;
        addPost = await Posts.create({title, author,  post, comments : []});
        res.statusCode = 200;
        res.send({"message" : "Posted successfully"});
    } catch (err) {
        res.statusCode = 400;
        res.send({ "message" : "Something went wrong, try to refresh"});
    }
});

module.exports = PostRouter;