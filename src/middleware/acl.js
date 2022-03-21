/** @format */

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
