
exports.seed = function(knex, Promise) {
  return knex('users').insert([
		{ username: 'alpha', password: '1234'},
		{ username: 'beta', password: '1234'},
		{ username: 'omega', password: '1234'},
  ]);
};
