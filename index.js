const express = require('express');
require('dotenv').config(); 
const { MongoClient, ServerApiVersion, ObjectId, ClientSession } = require('mongodb');  
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4849;




  // <-------------------------> //
 // <------ Middlewares ------> //
// <-------------------------> //

app.use(cors());

app.use(express.json());



  // <---------------------------------------------> //
 // <------ CRUD Operations Start From Here ------> //
// <---------------------------------------------> //





const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.y6otyph.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const dbConnect = async () => {
  try {

    const ProductCollection = client.db('BrandShopDB').collection('Products');
    const UsersCollection = client.db('BrandShopDB').collection('usersCollection');

    app.get('/products', async(req, res) => {
      const cursor = ProductCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })
     
    app.get('/products/:brand', async(req, res) => {
      const brand = req.params.brand;
      const query = { brand : brand };
      const result = await ProductCollection.find(query).toArray();
      res.send(result);
    })

    app.get('/products/:brand/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await ProductCollection.findOne(query);
      res.send(result);
    })

    app.get('/collections/:email', async(req, res) => {
      const email = req.params.email;
      const query = {email : email};
      const result = await UsersCollection.find(query).toArray();
      res.send(result);
    })

      app.post('/products', async(req, res) => {
        const product = req.body;
        const result = await ProductCollection.insertOne(product);
        res.send(result);
        
      })

      app.post('/collections', async(req, res) => {
        const item = req.body;
        console.log(item);
        const result = await UsersCollection.insertOne(item);
        res.send(result);
      })



      await client.connect()
      console.log('Database Connected!')
  } catch (error) {
      console.log(error.name, error.message)
  }
}
dbConnect()

app.get('/', (req, res) => {

  res.send('This the Server of Brand Shob Website')
})


app.listen(port, () => {
    console.log('the server is Running on ', port, 'port.');
})
