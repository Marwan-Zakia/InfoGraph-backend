/** @format */

	/**
	 *  a middleware that checks if the user has the required capability
	 * @param {*} capability  
	 * 
	 */

module.exports = (capability) => {
	return (req, res, next) => {
		try {
			if (req.user.capabilities.includes(capability)) {
				next();
			} else {
				next("Access Denied");
			}
		} catch (e) {
			next("there was capability and authentication error");
		}
	};
};
