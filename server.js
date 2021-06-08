const express = require('express');
const app = express();
var cors = require('cors')
var cookieParser = require('cookie-parser');
const session = require('express-session');
require('./db_connection/mongodb');
const postRouter = require('./Routes/posts')


app.use(express.static('public')); // store anything in static public file like files or images 
app.use(express.json()); // parses incoming requests with JSON payloads and is based on body-parser
app.use(express.urlencoded({ extended: true })); // parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(cors()) // used to enable CORS with various options
app.use(cookieParser()) // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.


app.get("/", (req, res) => {
    const posts = [{
        title: 'test posts',
        createdAt: new Date(),
        description: 'test description'
    }]
    res.render('posts/index', { posts: posts });
});

app.use('/posts', postRouter)

app.set('view engine', 'ejs')

app.listen(process.env.PORT || 3000, () => {
    console.info(`server listening on port 3000`);
});