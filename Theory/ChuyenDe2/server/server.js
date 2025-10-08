const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const dbName = "Shoes";
const collectionName = "shoe";

async function main() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const collection = client.db(dbName).collection(collectionName);

    // Lấy tất cả sản phẩm
    app.get("/shoe", async (req, res) => {
      try {
        const data = await collection.find({}).toArray();
        res.json(data);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // Thêm sản phẩm
    app.post("/shoe", async (req, res) => {
      try {
        const result = await collection.insertOne(req.body);
        res.status(201).json(result);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // Cập nhật sản phẩm
    app.put("/shoe/:id", async (req, res) => {
      try {
        const result = await collection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: req.body }
        );
        res.json(result);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // Xóa sản phẩm
    app.delete("/shoe/:id", async (req, res) => {
      try {
        const result = await collection.deleteOne({
          _id: new ObjectId(req.params.id),
        });
        res.json(result);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.listen(3000, () => console.log("Server running on port 3000"));
  } catch (err) {
    console.error(err);
  }
}

main();
