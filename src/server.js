/** @format */

"use strict";
require("dotenv").config();
const express = require("express");
const server = express();
const cors = require("cors");
const morgan = require("morgan");
const authRouter = require("./routes");
server.use(cors());
server.use(cors({ origin: "*" }));
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(authRouter);



server.get("/", (req, res) => {
	res.send("Welcome to the home page⭐");
});
module.exports = server;
