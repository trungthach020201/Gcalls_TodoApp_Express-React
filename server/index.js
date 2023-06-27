const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();
//use express.json() to get data into json format
app.use(express.json());

//use cors
app.use(cors());

//port
const PORT = process.env.PORT || 8089;

//let's import router
const TodoItemRoute = require("./routes/todoItems");

//connect to mongodb
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("Databse connected"))
  .catch((err) => console.log(err));

app.use("/", TodoItemRoute);
// add port and connect to server
app.listen(PORT, () => console.log("Server connected"));
