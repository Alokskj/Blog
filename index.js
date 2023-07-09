const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const blog = require("./src/work.js");

let posts;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://alokskj:9814204411j@todocluster.u1jdnxy.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(console.log("connected to mongodb"));


app.get("/", (req, res) => {
 const result = async ()=>{
  const result = await blog.find({})
    res.render("home", {posts : result})
 }
  result()
  
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.get("/posts/:id",async (req, res) => {
  let id = req.params.id;
  const post = await blog.findById(id)
  res.render("post", {
    postTitle: post.title,
    postContent: post.content,
    postId : post._id
  });
});


app.post("/compose", async (req, res) => {
  const newBlog = new blog({
    title: req.body.postTitle,
    content: req.body.postContent,
    image: req.body.imageurl,
  });
 

  await newBlog.save();
  res.redirect("/");
});

app.post("/posts/:id", async (req, res) => {
  const postId = req.params.id;

  try {
    await blog.findByIdAndDelete(postId);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while deleting the post.");
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});

module.exports = app