const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const blog = require("./src/work.js");

let posts;

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://alokskj:9814204411j@todocluster.u1jdnxy.mongodb.net/?retryWrites=true&w=majority/blog"
  )
  .then(console.log("connected to mongodb"))
  .catch((error) => handleError(error));

app.get("/", async (req, res) => {
  posts = await blog.find({});

  res.render("home", {
    posts: posts,
  });
});

app.get("/compose", (req, res) => {
  res.render("compose", {});
});

app.get("/posts/:newPost", (req, res) => {
  let requestedTitle = req.params.newPost;
  posts.forEach((post) => {
    let storedTitle = post.title;
    if (storedTitle === requestedTitle) {
      res.render("post", {
        postTitle: post.title,
        postContent: post.content,
      });
    }
  });
});

app.post("/compose", async (req, res) => {
  const newBlog = {
    title: req.body.postTitle,
    content: req.body.postContent,
    image: req.body.imageurl,
  };

  const result = await blog.insertMany([newBlog]);

  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
