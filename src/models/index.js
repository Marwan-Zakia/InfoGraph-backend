/** @format */
/**	
 * * I defiend the configs for the database
 * *I created the database and imported the models
 * * I instantiated my class colloection for the models
 * 
 */

"use strict";
const { Sequelize, DataTypes } = require("sequelize");
const Users = require("./users");
const Collection = require("./collection");
const Project = require("./project");


require("dotenv").config();
const POSTGRES_URL =
	process.env.NODE_ENV === "test"
		? "sqlite:memory:"
		: process.env.DATABASE_URL;

const sequelizeOptions =
	process.env.NODE_ENV === "production"
		? {
				dialectOptions: {
					ssl: {
						require: true,
						rejectUnauthorized: false,
					},
				},
		  }
		: {};

const sequelize = new Sequelize(POSTGRES_URL, sequelizeOptions);
const usersModel = Users(sequelize, DataTypes);
const usersCollection = new Collection(usersModel);
const projectsModel = Project(sequelize, DataTypes);
const projectsCollection = new Collection(projectsModel);

// usersModel.hasMany(projectsModel,{targetKey: "userID", foreignKey: "id"});
// projectsModel.belongsTo(usersModel, { foreignKey: "userID" ,sourceKey: "id"});  //fix this later

module.exports = {
	sequelize,
	usersCollection: usersCollection,
	Users: usersModel,
	projectsCollection: projectsCollection,
	Project: projectsModel,
};
