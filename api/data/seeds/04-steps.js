
exports.seed = function (knex, Promise) {// eslint-disable-line
	return knex('steps').insert([
		{ description: 'put tomato sauce and olive oil on', step_number: 4, recipe_id: 1 },
		{ description: 'boil water in pot', step_number: 1, recipe_id: 1 },
		{ description: 'when spaghetti cooked, take out', step_number: 3, recipe_id: 1 },
		{ description: 'put spaghetti in', step_number: 2, recipe_id: 1 },
		{ description: 'enjoy', step_number: 5, recipe_id: 1 },
		{ description: 'pour money onto cashier', step_number: 2, recipe_id: 2 },
		{ description: 'enjoy', step_number: 3, recipe_id: 2 },
		{ description: 'drive to mcdonalds', step_number: 1, recipe_id: 2 },
	]);
};
