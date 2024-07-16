const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());



// apis routes
app.use("/api/user", require("./router/userRouter"));


module.exports = app;
