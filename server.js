const express = require("express");
const axios = require("axios");
const process = require("process");
const Redis = require('ioredis');
require("dotenv").config();
const port = process.env.PORT || 8085;

const app = express();

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

// Check Redis connection on startup
redis.on('connect', () => console.log('Connected to Redis ✅'));
redis.on('error', (err) => console.error('Redis Error ❌', err));

app.get("/", (req, res) => {
  res.json({ data: "Node js server deployed " });
});

app.get("/port", (req, res) => {
  res.json({ port });
});

app.get('/redis', async (req, res) => {
  try {
      await redis.ping(); // Send a PING command to Redis
      res.status(200).json({ message: 'pong' });
  } catch (error) {
      res.status(500).json({ error: 'Redis is down' });
  }
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
    return res.json({
      message: "Fetched information successfully",
      data: transformedPosts,
    });
  } catch (error) {
    console.error("Error getting posts", error);
    return res.json({
      message: "Internal Server Error",
      data: error,
    });
  }
});
console.log("hahah");
app.listen(port, () => {
  console.log(`Server running successfully on PORT ${port}`);
});
async function runner() {
  console.log("runner");
  let counter = 1;
  while (true) {
    if (counter % 2 === 0) {
      console.log(">>>> modulo ");
    } else {
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve(
            console.log(JSON.stringify({ currentServerTime: new Date() }))
          );
        }, 5000)
      );
    }
    counter++;
  }
}
runner();
