/** @format */

"use strict";

const express = require("express");
const authRouter = express.Router();
const users = require("./models/index");
const basicAuth = require("./middleware/basic");
const bearerAuth = require("./middleware/bearer");
const permissions = require("./middleware/acl.js");
const project = require("./models/index");

authRouter.post("/signup", async (req, res, next) => {
	console.log(users);
	try {
		let userRecord = await users.Users.create(req.body);
		const output = {
			user: userRecord,
			token: userRecord.token,
		};
		res.status(201).json(output);
	} catch (error) {
		next(error.message);
	}
});

authRouter.post("/signin", basicAuth, async (req, res, next) => {
	res.status(200).json(req.user);
});

authRouter.get(
	"/users",
	bearerAuth,
	permissions("delete"),
	async (req, res, next) => {
		const userRecords = await users.Users.findAll({});
		const list = userRecords.map((user) => user.username);
		res.status(200).json(list);
	},
);
authRouter.post("/project", async (req, res) => {
	let projects = await project.Project.create(req.body);
	res.status(201).json(projects);
});
authRouter.get("/project", async (req, res) => {
	let somthing = await project.Project.findAll({});
	res.status(200).json(somthing);
});

module.exports = authRouter;
