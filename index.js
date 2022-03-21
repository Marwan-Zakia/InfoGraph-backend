/** @format */

"use strict";

const server = require("./src/server");
const { sequelize } = require("./src/models/index");
const PORT = process.env.PORT || 3001;
require("dotenv").config();



sequelize
	.sync()
	.then(() => {
		server.listen(PORT, () => {
			console.log(`Server listening on port 🏠 ${PORT}`);
		});
	})
	.catch((err) => {
		console.error(err);
	});
