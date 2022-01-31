
exports.seed = function(knex, Promise) {//eslint-disable-line
	return knex('ingredients').insert([
		{ ingredient_name: 'olive oil' },
		{ ingredient_name: 'spaghetti' },
		{ ingredient_name: 'tomato sauce' },
		{ ingredient_name: 'water' },
		{ ingredient_name: 'money' }
	])
}