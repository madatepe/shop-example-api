const express = require("express");
const app = express();
require("dotenv").config();
require("./src/config/databaseConnection");
const port = process.env.PORT || 5001;
const userRouter = require("./src/router/userRouter");

app.use(express.json()); // This is how we can read "req.body"

app.use('/api', userRouter);

app.get("/", (req, res) => {
  res.send("Hello world")
});

app.listen(port, () => {
  console.log(`Server started with ${port} `);
});
