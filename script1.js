const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/portfolioDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  github: String
});

const Project = mongoose.model("Project", ProjectSchema);

// Get projects
app.get("/projects", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// Add project
app.post("/projects", async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.json(project);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});