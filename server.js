const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
// const port = 3000;

// const productData = require('./data.json');

const app = express();
const PORT = process.env.PORT || 3000;

// Hand-In 3/4 //

const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb+srv://anzhelaschults:GWXedWwlC6AfaONo@mindgardendb.btxav5j.mongodb.net/";
// how can I store this info securely? User and pass

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

/** Hand-in 2/4 updated

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

app.get('/your-garden', (req, res) => {
  res.sendFile(path.join(__dirname, 'your-garden.html'));
});

*/

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
// app.set('views', path.join(__dirname, 'views'));


app.get('/your-garden', async function(req, res) {
  try {
    await client.connect();
    const database = client.db('MindDB');
    const postsCollection = database.collection("Posts")

    const cursor = await postsCollection.find()
    const posts = await cursor.toArray()
    console.log(posts)

    return res.render('your-garden', { data: posts })

  } catch (error) {
    console.log(error)
    res.status(500).send('Internal server error')
  }
});

// app.post('/new-post', function(req, res) {
//   const newPost = {
//     title: req.body.title,
//     content: req.body.content
//   };
//   posts.insertOne(newPost, function(err, result) {
//     if (err) throw err;
//     res.redirect('/your-garden');
//   });
// });

app.post('/edit/:id', async function(req, res) {
  const updatedPost = {
    title: req.body.title,
    content: req.body.content
  };
  await client.connect();
  const database = client.db('MindDB');
  const posts = database.collection('Posts');

  try {
    await posts.updateOne({ _id: new ObjectId(req.params.id) }, { $set: updatedPost })
    
    const cursor = await posts.find()
    const result = await cursor.toArray()

    console.log('result', result)
    res.render('your-garden', { data: result });
  } catch (error) {
    console.log(error)
    res.status(500).status('Internal server error')
  }
});

app.get('/delete/:id', async function(req, res) {
  // posts.deleteOne({ _id: ObjectId(req.params.id) }, function(err, result) {
  //   if (err) throw err;
  //   res.redirect('/your-garden');
  // });

  await client.connect();
  const database = client.db('MindDB');
  const posts = database.collection('Posts');

  try {
    await posts.deleteOne({ _id: new ObjectId(req.params.id) })
    
    const cursor = await posts.find()
    const result = await cursor.toArray()

    res.render('your-garden', { data: result });
  } catch (error) {
    console.log(error)
    res.status(500).status('Internal server error')
  }
});

// at this point i use AI as have no idea why code is not rendered


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
    res.redirect('/your-garden');
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

    const objectId = new ObjectId(req.params.id)
    const post = await posts.findOne({ _id: objectId });
    res.render('edit-post', { post: post });
  } catch (error) {
    console.error('Error retrieving post:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
