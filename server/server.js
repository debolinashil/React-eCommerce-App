// This code snippet sets up an Express server with middleware for logging, parsing JSON, and enabling CORS. It connects to a MongoDB database and defines a route for a GET request to "/api" that returns a JSON response. The server listens on a specified
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

const authRoutes = require("./routes/auth");

//app
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

//db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((error) => {
    console.log("Error: ", error);
  });

//routes
const port = process.env.PORT || 8000;

app.use("/api", authRoutes);

//routes middleware
readdirSync("./routes").map((route) =>
  app.use("/api", require("./routes/" + route))
);

app.listen(port, () => {
  console.log("Server started at ", port);
});
