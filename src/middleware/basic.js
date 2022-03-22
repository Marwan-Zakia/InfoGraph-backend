/** @format */

"use strict";

const base64 = require("base-64");

const { Users } = require("../models/index");

module.exports = async (req, res, next) => {
	console.log(req.headers.authorization);
	const encodedHeaders = req.headers.authorization.split(" ")[1];
	const [username, password] = base64
		.decode(encodedHeaders)
		.split(":");
	console.log(username, password);

	Users.BasicAuth(username, password)
		.then((validUser) => {
			req.user = validUser;
			next();
		})
		.catch((err) => {
			next("there was a basic authentication error ");
		});
};
