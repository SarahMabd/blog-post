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
//add new post
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

//get post by id
PostRouter.get('/:id', async(req, res)=>{
    try{
        const post = await Posts.findOne({_id : req.params.id}).exec();
        if(post != null){
            res.statusCode = 200;
            res.send({"Post" : post});
        }else{
            res.statusCode = 404;
            res.send({"message" : "There is no post like that"});
        }
    }catch(err){
         res.statusCode = 422;
         res.send({ "message" : "Something went wrong, try to refresh"});
    }
});
//update post by id
PostRouter.patch('/:id', async (req, res) => {
    let {title, author, post} = req.body;
    try{
        const updatedPost = await Posts.findOne({_id : req.params.id});
        if(updatedPost != null){
            await Posts.updateOne({_id : req.params.id}, {title : title ?? updatedPost.title, author : author ?? updatedPost.author,post : post ?? updatedPost.post});
            res.statusCode = 200;
            res.send({"message":"Post updated Successfully"});
        }else{
            res.statusCode = 404;
            res.send({"message":"There is no post like that"});
        }
    }catch(err){
         res.statusCode = 422;
         res.send({ "message" : "Something went wrong, try to refresh"});
        }
 });
module.exports = PostRouter;