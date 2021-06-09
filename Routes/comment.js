const express = require('express')
const mongoose = require('mongoose')
const CommentRouter = express.Router()
const Posts = require('./../Models/posts')

//add new comment
CommentRouter.post('/:postId', async (req, res) => {
    const { commenterName, comment } = req.body;
    let addComment;
    try {
        const post = await Posts.findOne({ _id: req.params.postId }).exec();
        if (post != null) {
            addComment = { commenterName, comment };
            await Posts.updateOne({ _id: req.params.postId }, { $push: { comments: addComment } });
            res.statusCode = 200;
            res.send({ "message": "Comment added successfully" });
        } else {
            res.statusCode = 404;
            res.send({ "message": "There is no post like that" });
        }
    } catch (err) {
        res.statusCode = 422;
        res.send({ "message": "Something went wrong, try to refresh" });
    }
});

//get list of all comment on a post by id
CommentRouter.get('/:postId', async (req, res) => {
    try {
        const post = await Posts.findOne({ _id: req.params.postId }).exec();
        if (post != null) {
            res.statusCode = 200;
            res.send({ "Comments": post.comments });
        } else {
            res.statusCode = 404;
            res.send({ "message": "There is no post like that" });
        }
    } catch (err) {
        res.statusCode = 422;
        res.send({ "message": "Something went wrong, try to refresh" });
    }
});





module.exports = CommentRouter;