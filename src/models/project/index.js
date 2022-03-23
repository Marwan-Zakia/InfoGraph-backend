/** @format */

"use strict";
/**
 * i create the model for the project and i export it
 * 
 * @param {*} sequelize 
 * @param {*} DataTypes 
 * @returns projectModel
 */

const Porjects = (sequelize, DataTypes) => {
	const projectModel = sequelize.define("projects", {
		userName: {
			type: DataTypes.STRING,
		},
		projectName: {
			type: DataTypes.STRING,
			allowNull: false,
			required: true,
		},
		projectDesc: {
			type: DataTypes.STRING,
			allowNull: false,
			required: true,
		},
		projectSector: {
			type: DataTypes.STRING,
			allowNull: false,
			required: true,
		},

		statusOfFunding: {
			type: DataTypes.STRING,
			allowNull: false,
			required: true,
		},

		numberOfEmloyees: {
			type: DataTypes.STRING,
			allowNull: false,
			required: true,
		},
	});
	return projectModel;
};

module.exports = Porjects;