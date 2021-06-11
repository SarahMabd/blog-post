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

    afterEach(function(done) {
        posts.collection.drop().then(function() {

            // success     
        }).catch(function() {

            // error handling
            console.warn(' collection may not exists!');
        })
        done();
    });
    it('should list ALL posts on /posts GET', function(done) {
        chai.request(server)
            .get('/posts')
            .end(function(err, res) {
                console.log(res);
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
    it('should update a post /posts/:id GET', function(done) {
        chai.request(server)
            .get('/posts')
            .end(function(err, res) {
                chai.request(server)
                    .patch('/posts/' + res.params.id)
                    .send({
                        title: 'Cook Indomie',
                        author: 'Mohammed',
                        post: 'this is post for food category'
                    })
                   
                    .end(function(error, res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.an.instanceof(Object)
                        // .that.includes.all.keys(["message"])
                        // resonse.body.message.should.equal
                        res.body.should.have.property('message');
                        res.body.message.should.equal("Post updated successfully");
                        done();
                    });
            });
    });
});