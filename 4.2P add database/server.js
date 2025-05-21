const express = require("express");
const app = express();
const port = process.env.port || 3004;
const mongoose = require("mongoose");

// Middleware
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/myprojectDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("✅ Connected to MongoDB");
});

// Define schema and model
const ProjectSchema = new mongoose.Schema({
  title: String,
  image: String,
  link: String,
  description: String,
});

const Project = mongoose.model("Project", ProjectSchema);

// REST API route to get all projects
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json({ statusCode: 200, data: projects, message: "Success" });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: "Failed", error: err });
  }
});

// REST API route to add a new project
app.post("/api/projects", async (req, res) => {
  try {
    const project = new Project(req.body);
    const saved = await project.save();
    res.status(201).json({ statusCode: 201, data: saved, message: "Project saved successfully!" });
  } catch (err) {
    res.status(400).json({ statusCode: 400, message: "Error saving project", error: err });
  }
});

// Add sample project
const sampleProject2 = new Project({
  title: "Kitten 3",
  image: "images/kitten3.jpg",
  link: "https://example.com/kitten3",
  description: "Demo description about kitten 3",
});

sampleProject2.save().then(() => console.log("🐱 Sample project saved!"));

// Start server
app.listen(port, () => {
  console.log(`🚀 App listening on http://localhost:${port}`);
});
