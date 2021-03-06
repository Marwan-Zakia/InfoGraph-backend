/** @format */

"use strict";

/**
 * @constructor {modal}
 * @description takes the modal and applies database operations to it
 * @method {create} @param {object}  - creates a new project in the database
 * @method {get} @param {id} if available - @returns {object} - returns a project with the given id or all projects if no id is provided
 * @method {update} @param {id,object}  - updates a project in the database with the given id
 * @method {delete} @param {id}  - deletes a project in the database
 */
class Collection {
	constructor(model) {
		this.model = model;
	}
	async create(obj) {
		try {
			return await this.model.create(obj);
		} catch (error) {
			console.log(`error.message${error.message}`);
		}
	}
	get(id) {
		if (id) {
			return this.model.findOne({ where: { id } });
		} else {
			return this.model.findAll();
		}
	}

	async update(id, obj) {
		try {
			let recordId = await this.model.findOne({ where: { id: id } });
			let updateRecord = await recordId.update(obj);
			return updateRecord;
		} catch (e) {
			console.error(
				"error in updating record for model",
				this.model.name,
				`id:${id}`,
			);
		}
	}
	delete(id) {
		try {
			return this.model.destroy({ where: { id } });
		} catch (error) {
			console.log(`${error.message}`);
		}
	}
}

module.exports = Collection;
