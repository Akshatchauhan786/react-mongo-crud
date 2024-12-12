const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Initialize Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/crudApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a Mongoose schema and model
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Item = mongoose.model("Item", itemSchema);

// Create (POST) route
app.post("/api/items", async (req, res) => {
  const { name, description } = req.body;
  const item = new Item({ name, description });
  await item.save();
  res.status(201).send(item);
});

// Read (GET) route
app.get("/api/items", async (req, res) => {
  const items = await Item.find();
  res.status(200).json(items);
});

// Update (PUT) route
app.put("/api/items/:id", async (req, res) => {
  const { name, description } = req.body;
  const updatedItem = await Item.findByIdAndUpdate(
    req.params.id,
    { name, description },
    { new: true }
  );
  res.status(200).json(updatedItem);
});

// Delete (DELETE) route
app.delete("/api/items/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Start server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
