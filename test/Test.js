// Endpoint testing with mocha and chai and chai-http
// Import libraries
const chai = require('chai');
const chaiHttp = require('chai-http');
const session = require('express-session');
const should = chai.should();


// Import server
let server = require('../server');
let posts = require('../Models/posts');


// use chaiHttp for making the actual HTTP requests        
chai.use(chaiHttp);

describe('POSTS API', function() {
   
    it('should list ALL posts on /posts GET', function(done) {
        chai.request(server)
            .get('/posts')
            .end(function(err, res) {
    
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.an.instanceof(Object)
                .that.includes.all.keys(["posts"])
                done();
            });
    });
    it('should add a post on /posts POST', function(done) {
        chai.request(server)
            .post('/posts')
            .send({
                title: 'Cook Indomie',
                author: 'Sarah Mohammed',
                post: 'this is post for food category'
            })
            .end(function(err, res) {

                // the res object should have a status of 200
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.an.instanceof(Object)
                // .that.includes.all.keys(["message"])
                // resonse.body.message.should.equal
                res.body.should.have.property('message');
                res.body.message.should.equal("Posted successfully");
                done();

            
            });
    });
    it('should get a post /posts/:id GET', function(done) {
        chai.request(server)
            .get('/posts')
            .end(function(err, res) {
                const post = res.body.posts[0];
                chai.request(server)
               
               //console.log(json.strigfy(res))
                   
                    .get('/posts/' + post._id)
                   
                   
                    .end(function(error, resp) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.an.instanceof(Object)
                        .that.includes.all.keys(["posts"])
                        done();
                    });
            });
    });
    it('should update a post /posts/:id PATCH', function(done) {
        chai.request(server)
            .get('/posts')
            .end(function(err, res) {
                const post = res.body.posts[0];
                chai.request(server)
               
               //console.log(json.strigfy(res))
                   
                    .patch('/posts/' + post._id)
                    .send({
                        title: 'Cook Indomie',
                        author: 'Mohammed',
                        post: 'this is post for food category'
                    })
                   
                    .end(function(error, resp) {
                        resp.should.have.status(200);
                        resp.should.be.json;
                        resp.body.should.be.an.instanceof(Object)
              
                        resp.body.should.have.property('message');
                        resp.body.message.should.equal("Post updated Successfully");
                        done();
                    });
            });
    });
    it('should delete a post /posts/:id DELETE', function(done) {
        chai.request(server)
            .get('/posts')
            .end(function(err, res) {
                const post = res.body.posts[0];
                chai.request(server)
               
               //console.log(json.strigfy(res))
                   
                    .delete('/posts/' + post._id)
                   
                   
                    .end(function(error, resp) {
                        resp.should.have.status(200);
                        resp.should.be.json;
                        resp.body.should.be.an.instanceof(Object)
              
                        resp.body.should.have.property('message');
                        resp.body.message.should.equal("Post deleted Successfully");
                        done();
                    });
            });
    });

});
describe('COMMENTS API', function(){
    beforeEach(function(done) {
                var newPost = new posts({
                    title: 'Cook Indomie',
                    author: 'Sarah Mohammed',
                    post: 'this is post for food category'
                });
                newPost.save(function(err) {
                    done();
                });
    });
    it('should add comment for a post on /posts/comment/:id POST', function(done) {
        chai.request(server)
        .get('/posts')
        .end(function(err, res) {
            const post = res.body.posts[0];
            console.log(post);
            chai.request(server)               
                .post('/posts/comment/' + post._id)
                .send({
                    commenterName: 'Sarah',
                    comment: 'beautifull'
                })
               
                .end(function(error, resp) {
                    resp.should.have.status(200);
                    resp.should.be.json;
                    resp.body.should.be.an.instanceof(Object)
                
                    resp.body.should.have.property('message');
                    resp.body.message.should.equal("Comment added successfully");
                    done();
                });
        });
    });
    it('should get all comments for a post on /posts/comment/:postId/:commentId GET', function(done) {
        chai.request(server)
        .get('/posts')
        .end(function(err, res) {
            const post = res.body.posts[0];
            console.log(post);
            chai.request(server)               
                .get('/posts/comment/' + post._id)
                
               
                .end(function(error, resp) {
                    resp.should.have.status(200);
                    resp.should.be.json;
                    resp.body.should.be.an.instanceof(Object)
                    .that.includes.all.keys(["Comments"])
                    done();
                });
        });
    });
    it('should update comment for a post on /posts/comment/:postId/:commentId PATCH', function(done) {
        chai.request(server)
        .get('/posts')
        .end(function(err, res) {
            const post = res.body.posts[0];
            const comment = post.comments[0];
            console.log(post);
            console.log(comment);
            chai.request(server)               
                .patch('/posts/comment/' + post._id +'/' + comment._id )
                .send({
                    commenterName: 'Sarah',
                    comment: 'beauty'
                })
               
                .end(function(error, resp) {
                    resp.should.have.status(200);
                    resp.should.be.json;
                    resp.body.should.be.an.instanceof(Object)
                
                    resp.body.should.have.property('message');
                    resp.body.message.should.equal("Comment updated successfully");
                    done();
                });
        });
    });

    it('should delete comment for a post on /posts/comment/:postId/:commentId DELETE', function(done) {
        chai.request(server)
        .get('/posts')
        .end(function(err, res) {
            const post = res.body.posts[0];
            const comment = post.comments[0];
            console.log(post);
            console.log(comment);
            chai.request(server)               
                .delete('/posts/comment/' + post._id +'/' + comment._id )
               
               
                .end(function(error, resp) {
                    resp.should.have.status(200);
                    resp.should.be.json;
                    resp.body.should.be.an.instanceof(Object)
                
                    resp.body.should.have.property('message');
                    resp.body.message.should.equal("Comment deleted successfully");
                    done();
                });
        });
    });

});