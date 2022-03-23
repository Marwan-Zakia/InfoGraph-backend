/** @format */

const users = require("../models/index");

/**
 * 
 * @param {*} req allows to access the request object which contains headers and 
 * authorization and i use a method called authToken to check if the token is valid
 * @param {*} res 
 * @param {*} next  allows the valid user to be authenticated
 */



module.exports = async (req, res, next) => {
	try {
		if (!req.headers.authorization) {
			_authError();
		}

		const token = req.headers.authorization.split(" ").pop();
		const validUser = await users.Users.authToken(token);
		req.user = validUser;
		req.token = validUser.token;
		next();
	} catch (e) {
		_authError();
	}

	function _authError() {
		next("there was bearer authentication error ");
	}
};
