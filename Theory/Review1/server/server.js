const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

app.get("/medicine", async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("Medicine").collection("medicine");
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    await client.close();
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
