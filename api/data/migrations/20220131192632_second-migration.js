exports.up = async (knex) => {
	await knex.schema
		.createTable('recipes', table => {
			table.increments('recipe_id')
			table.string('recipe_name', 128).notNullable()
			table.string('source_name', 128).notNullable()
		})
	await knex.schema
		.createTable('ingredients', table => {
			table.increments('ingredient_id')
			table.string('ingredient_name', 128).notNullable()
		})
	await knex.schema
		.createTable('steps', table => {
			table.increments('step_id')
			table.integer('recipe_id')
				.unsigned()
				.notNullable()
				.references('recipe_id')
				.inTable('recipes')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
			table.integer('step_number', 128).notNullable()
			table.string('description').notNullable()
		})
	await knex.schema
		.createTable('ingredients_steps', table => {
			table.increments('ingredient_step_id')
			table.integer('step_id')
				.unsigned()
				.notNullable()
				.references('step_id')
				.inTable('steps')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
			table.integer('ingredient_id')
				.unsigned()
				.notNullable()
				.references('ingredient_id')
				.inTable('ingredients')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
			table.string('amount')
				.notNullable()
		})
	await knex.schema
		.createTable('categories', table => {
			table.increments('category_id')
			table.string('category_name')
				.notNullable()
				.unique()
		})
	await knex.schema
		.createTable('recipes_categories', table => {
			table.increments('recipe_category_id')
			table.integer('recipe_id')
				.unsigned()
				.notNullable()
				.references('recipe_id')
				.inTable('recipes')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
			table.integer('category_id')
				.unsigned()
				.notNullable()
				.references('category_id')
				.inTable('categories')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
		})
}

exports.down = async (knex) => {
	await knex.schema.dropTableIfExists('recipes_categories')
	await knex.schema.dropTableIfExists('categories')
	await knex.schema.dropTableIfExists('ingredients_steps')
	await knex.schema.dropTableIfExists('steps')
	await knex.schema.dropTableIfExists('ingredients')
	await knex.schema.dropTableIfExists('recipes')
}
