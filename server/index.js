const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();
//use express.json() to get data into json format
app.use(express.json());

//use cors
app.use(cors());

// add port and connect to server
const PORT = process.env.PORT || 8089;
app.listen(PORT, () => console.log(`listening on port ${PORT}, Server Connected`)) 

//import router
const authRoute = require("./routes/auth")
const TodoItemRoute = require("./routes/todoItems");
const userRoute = require('./routes/user');


//connect to mongodb
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("Databse connected"))
  .catch((err) => console.log(err));

app.use("/", TodoItemRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute)


