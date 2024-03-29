A simple blog post with comments Restful API using Node.js
-

Tools : Nodejs + Mongodb For Database + Mongodb Atlas For Deolpying Database And Heroku For Deploying API + Express framework


Deployed Link for APIs: https://blogpost-ass.herokuapp.com/


Postman to test all routes and create API doc in this link : https://documenter.getpostman.com/view/7215977/TzeTHow5#intro


Main Steps:-

#1 Read Requirmant And Know Exactly What I am Going To Do

#2 Design Database

#3 Create Database Schema For Post Model:-

        title:{type: String, required: true, maxlength: 50},
        
        author:{type: String, required: true, maxlength: 50},
        
        post:{type: String, required : true},
        
        createdAt:{type: Date, default: Date.now},
        
        comments:[{_id : {type : mongoose.Schema.Types.ObjectId, index: true,required: true, auto: true},
                  commenterName:{type: String,required: true, maxlength: 50},comment :{
                  type: String,required: true, maxlength: 200}}]


#4 Use npm "express" framework (server.js)

#5 Create Database Connection Using npm "mongoose" (dbConnection/mongodb.js)

#6 Create Post CRUD Operations And Routes in (Routes/posts.js)

#7 Create Comment CRUD Operations And Routes in (Routes/comment.js)

#8 Test EndPoints For Posts Using Postman:-

    For Adding New Post[ Route: (/posts), Method : POST, Body : title(required) author(required) post(required)] 
    For Update A Post[ Route: (/posts/:id), Method : PATCH, Body : title(required) author(required) post(required)]
    For Delete A Post[ Route: (/posts/:id), Method : DELETE]
    For Get A Post[ Route: (/posts/:id), Method : GET]
    For Get All Posts[ Route: (/posts), Method : GET]


#9 Test EndPoints For Comments Using Postman:-

    For Adding New Comment[ Route: (/posts/comment/:postId), Method : POST, Body : commenterName(required) comment(required)]
    For Update A Comment[ Route: (/posts/comment/:postId/:commentId), Method : PATCH, 
                          Body : commenterName(required) comment(required)]
    For Delete A Comment[ Route: (/posts/comment/:postId/:commentId), Method : DELETE]
    For Get All Comment On Specific Post[ Route: (/posts/comment/:postId), Method : GET]

#10 Deployed Node JS Using Github and Heroku

    link : https://blogpost-ass.herokuapp.com/
    
#11 Create APIs Documentation Using Postman

    Link : https://documenter.getpostman.com/view/7215977/TzeTHow5#intro
    
#12 Create 9 Endpoints Test Using Mocha and Chai:-
    
        1- list ALL Posts On /posts GET
        2- Add A Post On /posts POST
        3- Get A Post On /posts/:id GET
        4- Update A Post On /posts/:id PATCH
        5- Delete A Post On /posts/:id DELETE
        6- Add Comment On A Post On /posts/comment/:id POST
        7- Get All comments On A Post On /posts/comment/:postId/:commentId GET
        8- Update Comment On A Post On /posts/comment/:postId/:commentId PATCH
        9- Delete comment On A Post On /posts/comment/:postId/:commentId DELETE
    
