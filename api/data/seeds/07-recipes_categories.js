
exports.seed = function (knex, Promise) {// eslint-disable-line
	return knex('recipes_categories').insert([
		{ recipe_id: 1, category_id: 1 },
		{ recipe_id: 1, category_id: 5 },
		{ recipe_id: 2, category_id: 7 },
		{ recipe_id: 3, category_id: 3 },
		{ recipe_id: 3, category_id: 6 },
	])
}