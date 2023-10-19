const express = require('express');
require('dotenv').config(); 
const { MongoClient, ServerApiVersion } = require('mongodb');  
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

    

      app.post('/products', async(req, res) => {
        const product = req.body;
        console.log(product); 
        const result = await ProductCollection.insertOne(product);
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
