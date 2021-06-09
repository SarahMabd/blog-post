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

//update comment by its id and post id
CommentRouter.patch('/:postId/:commentId', async (req, res) => {
    const { commenterName,comment } = req.body;
    try {
        const updatedComment = await Posts.findOne(
            { _id: req.params.postId, "comments._id": req.params.commentId },
            { comments: { $slice: 1 } }
        ).exec();
        if (updatedComment != null) {
            await Posts.updateOne(
                { _id: req.params.postId, "comments._id": req.params.commentId },
                {
                    $set: {
                        "comments.$.commenterName": commenterName,
                        "comments.$.comment": comment,

                    }
                }
            );
            res.statusCode = 200;
            res.send({ "message": "Comment updated successfully" });
        } else {
            res.statusCode = 404;
            res.send({ "message": "There is no comment like that" });
        }
    } catch (err) {
        res.statusCode = 422;
        res.send({ "message": "Something went wrong, try to refresh" });
    }
});

//delete comment by its id and post id
CommentRouter.delete('/:postId/:commentId', async (req, res) => {
    try {
        const deletedComment = await Posts.findOne(
            { _id: req.params.postId, "comments._id": req.params.commentId },
            { comments: { $slice: 1 } }
        ).exec();
        if (deletedComment != null) {
            await Posts.updateOne(
                { _id: req.params.postId },
                { $pull: { comments: { _id: req.params.commentId } } }
            );
            res.statusCode = 200;
            res.send({ "message": "Comment deleted successfully" });
        } else {
            res.statusCode = 404;
            res.send({ "message": "There is no comment like that" });
        }
    } catch (err) {
        res.statusCode = 422;
        res.send({ "message": "Something went wrong, try to refresh" });
    }
});

module.exports = CommentRouter;