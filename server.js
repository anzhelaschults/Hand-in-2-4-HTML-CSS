const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const port = 3003;

const productData = require('./data.json');

const app = express();
const PORT = process.env.PORT || 3003;

// Hand-In 3/4 //

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://anzhelaschults:GWXedWwlC6AfaONo@mindgardendb.btxav5j.mongodb.net/";

const client = new MongoClient(uri);

async function run() {
  try {
    // await client.connect();
    const res = await client.connect();
    // console.log(res);
    const database = client.db('MindDB');
    const users = database.collection('Users'); 
 
    // const user = await users.findOne({ user_id: "660bbd8ef998994c129e33dc"});
    const user = await users.find({}).toArray();
  
    console.log(user);
    console.log('something inside');

  } finally {
    await client.close();
  }
}
run().catch(console.dir);

// Hand-in 2/4 updated

app.use(express.static(path.join(__dirname, 'public')));

  // dynamic 

  app.get('/posts', (req, res) => {
    const postId = req.query.postId;
   
    res.send(`<h1>Post Number ${postId}</h1>`);
  });
  
  // static 

  app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
  
  app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
  });

  // app.get('/your-garden', (req, res) => {
  //   res.sendFile(path.join(__dirname, 'your-garden.html'));
  // });


  app.listen(PORT, () => {
    console.log(`Server is running on port ${3003}`);
  });


app.get('/your-garden', function(req, res) {
  posts.find({}).toArray(function(err, result) {
    if (err) throw err;
    res.render('your-garden', { posts: result });
  });
});

app.post('/new-post', function(req, res) {
  const newPost = {
    title: req.body.title,
    content: req.body.content
  };
  posts.insertOne(newPost, function(err, result) {
    if (err) throw err;
    res.redirect('/your-garden');
  });
});


app.post('/edit/:id', function(req, res) {
  const updatedPost = {
    title: req.body.title,
    content: req.body.content
  };
  posts.updateOne({ _id: ObjectId(req.params.id) }, { $set: updatedPost }, function(err, result) {
    if (err) throw err;
    res.redirect('/your-garden');
  });
});

app.get('/delete/:id', function(req, res) {
  posts.deleteOne({ _id: ObjectId(req.params.id) }, function(err, result) {
    if (err) throw err;
    res.redirect('/your-garden');
  });
});

// at this point i use AI as have no idea why code is not rendered

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('MindDB');
    const posts = database.collection('Posts');
    const allPosts = await posts.find({}).toArray();
    res.render('your-garden', { posts: allPosts });
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.get('/new-post', (req, res) => {
  res.render('new-post');
});

app.post('/new-post', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('MindDB');
    const posts = database.collection('Posts');
    const newPost = {
      title: req.body.title,
      content: req.body.content
    };
    await posts.insertOne(newPost);
    res.redirect('/');
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.get('/edit/:id', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('MindDB');
    const posts = database.collection('Posts');
    const post = await posts.findOne({ _id: ObjectId(req.params.id) });
    res.render('edit-post', { post: post });
  } catch (error) {
    console.error('Error retrieving post:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${3003}`);
});


