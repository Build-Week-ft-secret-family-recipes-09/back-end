
exports.seed = function(knex, Promise) {
  return knex('categories').insert([
		{ category_name: 'dinner'},
		{ category_name: 'chicken'},
		{ category_name: 'breakfast'},
		{ category_name: 'brownie'},
		{ category_name: 'pasta'},
		{ category_name: 'dessert'},
		{ category_name: 'lunch'},
  ]);
};
