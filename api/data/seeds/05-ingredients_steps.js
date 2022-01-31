
exports.seed = function(knex, Promise) {
  return knex('steps_ingredients').insert([
    { step_id: 1, ingredient_id: 3, amount: '56 liters' },
		{ step_id: 1, ingredient_id: 1, amount: '73 liters' },
		{ step_id: 2, ingredient_id: 4, amount: '200 liters' },
		{ step_id: 4, ingredient_id: 2, amount: '156 grams' },
		{ step_id: 6, ingredient_id: 5, amount: '4 dollars' },		
  ]);
};
