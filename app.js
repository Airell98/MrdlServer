require("dotenv").config()
const express = require("express");
const http = require('http');
const app = express();
const errorhandler = require("./middlewares/errorHandler");

const routes = require("./routes");

const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(routes);

app.use(errorhandler);

app.listen(port, ()=>{
    console.log(port, '==========================')
})