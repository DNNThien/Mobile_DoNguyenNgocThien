const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const dbName = "Food";
const collectionName = "food";

async function main() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const collection = client.db(dbName).collection(collectionName);

    app.get("/food", async (req, res) => {
      try {
        const data = await collection.find({}).toArray();
        res.json(data);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.post("/food", async (req, res) => {
      try {
        const response = await collection.insertOne(req.body);
        res.json(response);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.put("/food/:id", async (req, res) => {
      try {
        const response = await collection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: req.body }
        );
        res.json(response);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.delete("/food/:id", async (req, res) => {
      try {
        const response = await collection.deleteOne({
          _id: new ObjectId(req.params.id),
        });
        res.json(response);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.listen(3000, () => console.log("Server running on port 3000"));
  } catch (err) {
    console.log("Error: ", err);
  }
}

main();
