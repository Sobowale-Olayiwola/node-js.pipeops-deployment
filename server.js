const express = require("express");
const axios = require("axios");
const process = require("process")
require('dotenv').config()
const port = process.env.PORT || 8085

const app = express();

app.get("/", (req, res) => {
  res.json({ data: "Node js server deployed " });
});

app.get("/port", (req, res) => {
  res.json({ port });
});

app.get("/posts", async (req, res) => {
  try {
    const { data: posts } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const transformedPosts = [];
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      post.userId = i;
      transformedPosts.push(post);
    }
    return res.json({ message: "Fetched information successfully",data: transformedPosts });
  } catch (error) {
    console.error("Error getting posts", error);
    return res.json({
      message: "Internal Server Error",
      data: error,
    });
  }
});

app.listen(port, () => {
  setTimeout(() => {
    console.log(JSON.stringify({currentServerTime: new Date()}))
  }, 1000)
    console.log(`Server running successfully on PORT ${port}`)
});