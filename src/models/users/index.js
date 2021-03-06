"use strict";
/**
 * @param {sequelize} sequelize
 * @param {DataTypes} DataTypes
 * @returns {userModel}
 * @description creates the user model and exports it
 * @method {beforeCreate} @param {user object}  - hashes the password before creating the user in the database 
 * @method {BasicAuth} @param {email,password}  - authenticates the user using the email and password
 * @method {authToken} @param {token}  - authenticates the user using the token
 */


const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET || "SECRET";


const Users = (sequelize, DataTypes) => {
	const userModel = sequelize.define("users", {
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			required: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			required: true,
		},
		role: {
			type: DataTypes.ENUM("admin", "projectsowners"),
			allowNull: true,
			defaultValue: "projectsowners",
		},
		token: {
			type: DataTypes.VIRTUAL,
			get() {
				return jwt.sign(
					{
						email: this.email,
						username: this.username,
						capabilities: this.capabilities,
					},
					SECRET,
				);
			},
			set(tokenObj) {
				let token = jwt.sign(tokenObj, SECRET);
				return token;
			},
		},
		capabilities: {
			type: DataTypes.VIRTUAL,
			get() {
				const acl = {
					admin: ["read", "write", "delete", "update"],
					projectsowners: ["read", "write", "update"],
				};
				return acl[this.role];
			},
		},
	});

	userModel.beforeCreate(async (user) => {
		let hashedPass = await bcrypt.hash(user.password, 10);
		user.password = hashedPass;
	});
	userModel.BasicAuth = async function (email, password) {
		console.log('yoos',email, password)
		const user = await this.findOne({ where: { email } });
		const valid = await bcrypt.compare(password, user.password);
		if (valid) {
			return user;
		}
		throw new Error("Invalid User");
	};

	userModel.authToken = async function (token) {
		try {
			const parsedToken = jwt.verify(token, SECRET);
			const user = this.findOne({
				where: { email: parsedToken.email },
			});
			if (user) {
				return user;
			}
			throw new Error("User Not Found");
		} catch (e) {
			throw new Error(e.message);
		}
	};

	return userModel;
};

module.exports = Users;
