const db = require("../data/db-config");

function findAll() {
  return db("recipes");
}

async function findById(recipe_id) {
  const data = await db("recipes as r")
    .leftJoin('steps as s', 'r.recipe_id', 's.recipe_id')
    .leftJoin('ingredients_steps as i_s', 's.step_id', 'i_s.step_id')
    .leftJoin('ingredients as i', 'i_s.ingredient_id', 'i.ingredient_id')
    .select(
      'r.recipe_id',
      'r.recipe_name',
      'r.source_name',
      's.step_number',
      's.description',
      'i.ingredient_name',
      'i_s.amount'
    )
    .orderBy('s.step_number')
    .where("r.recipe_id", recipe_id)

  const newObj = {
    recipe_id: data[0].recipe_id,
    recipe_name: data[0].recipe_name,
    source_name: data[0].source_name,
    steps: data.reduce((acc, step) => {
      console.log('newObj step.amount', step.amount, 'data', data)
      if (!step.amount) {
        return acc.concat({
          step_number: step.step_number,
          description: step.description,
        });
      }
      console.log('other step.amount', step.amount)
      return acc.concat({
        step_number: step.step_number,
        description: step.description,
        ingredient_name: step.ingredient_name,
        amount: step.amount,
      });
    }, []),
  };

  return newObj;
}

async function findBy(filter) {
  const data = await db("recipes_categories as rc")
    .leftJoin("recipes as r", "rc.recipe_id", "r.recipe_id")
    .leftJoin("categories as c", "rc.category_id", "c.category_id")
    .where(filter)
    .select(
      "recipe_category_id",
      "r.recipe_id",
      "rc.category_id",
      "r.recipe_name",
      "r.source_name",
      "c.category_name"
    );

  return data
}

async function add({ recipe_name, source_name, category_name, steps }) {
  let created_recipe_id
  await db.transaction(async trx => {
    const recipe = await trx('recipes as r')
      .insert({ recipe_name, source_name, category_name })
      .returning('r.recipe_id')
    created_recipe_id = recipe[0].recipe_id

    steps.map(async step => {
      let step_id_to_use

      const stepsData = await db('steps as s')
        .insert({
          recipe_id: created_recipe_id,
          step_number: step.step_number,
          description: step.description
        })
        .returning('s.step_id').then().catch()

      step_id_to_use = stepsData[0].step_id

      let ingred
      if (step.ingredient_name) {
         ingred = await db('ingredients')
          .where('ingredient_name', step.ingredient_name)
          .select('ingredient_id')
      }

      if (!ingred.length) {
        await db('ingredients').insert({ ingredient_name: step.ingredient_name }).then().catch()
        console.log('if statement')
      }
      console.log('step.amount', step.amount);
      await db('ingredients_steps')
        .insert({
          ingredient_id: ingred[0].ingredient_id,
          step_id: step_id_to_use,
          amount: step.amount
        }).then().catch()
    })

  })
    .then(esp => {
      console.log('esp', esp)
    })
    .catch(err => {
      console.log('the real world', err)
    })
  return findById(created_recipe_id)
}

async function deletebyId(id) {
  const data = await db('recipes').where('recipe_id', id).del()
  return data
}

module.exports = {
  findAll,
  findById,
  findBy,
  deletebyId,
  add,
};

