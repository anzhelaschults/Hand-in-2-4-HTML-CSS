const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const port = 3002;

const productData = require('./data.json');

const app = express();
const PORT = process.env.PORT || 3002;

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


  app.listen(PORT, () => {
    console.log(`Server is running on port ${3002}`);
  });


// extra test
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// async function run() {
//   try {
//     // Connect to the MongoDB cluster
//     await client.connect();

//     // Access the database and collections
//     const database = client.db("MindGarden");
//     const users = database.collection("Users");

//     const result = await users.insertOne({ username: "anzhela1", email: "anzhela1@gmail.com" });
//     console.log(`New document inserted with _id: ${result.insertedId}`);

//   } finally {
//     // Close the connection to the MongoDB cluster
//     await client.close();
//   }
// }

// run().catch(console.error);

  
