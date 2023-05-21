const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());


const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    // console.log("database connect");
    const testsCollection = client.db("demo-data").collection("tests");

    // get tests
    app.get("/tests", async (req, res) => {
      const query = {};
      const cursor = testsCollection.find(query);
      const mainProducts = await cursor.toArray();
      res.send(mainProducts);
    });
  } finally {
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Running development-agriculture-e-commerce-client');
});

app.listen(port, () => {
  console.log('development-agriculture-e-commerce-client is running ');
});
