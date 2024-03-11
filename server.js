const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'your_secret_key',
  resave: true,
  saveUninitialized: true
}));

// My static route #1 and it works for all static files 
app.use(express.static(__dirname))


  // BLOG POSTS
  // 1. dynamic 

  app.get('/posts', (req, res) => {
    const postId = req.query.postId;
    // Logic to retrieve a blog post based on postId
    res.send(`<h1>Post Number ${postId}</h1>`);
  });
  
  // static (answer to request)

  app.get('/index', (req, res) => {

    // we get back only index html

        res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.get('/signup', (req, res) => {
        res.sendFile(path.join(__dirname, 'login.html'));
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${3000}`);
  });
  
  
