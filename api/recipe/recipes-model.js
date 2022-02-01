const db = require("../data/db-config");

function findAll() {
  return db("recipes");
}

async function findById(recipe_id) {
  const data = await db("recipes as r ")
    .leftJoin("steps as s", "r.recipe_id", "s.recipe_id")
    .leftJoin("ingredients_steps as si", "s.step_id", "si.step_id")
    .leftJoin("ingredients as i", "si.ingredient_id", "i.ingredient_id")
    .where("r.recipe_id", recipe_id)
    .select(
      "r.recipe_id",
      "source_name",
      "recipe_name",
      "step_number",
      "description",
      "ingredient_name",
      "amount"
    )
    .orderBy("step_number", "asc");

  const newObj = {
    recipe_id: data[0].recipe_id,
    recipe_name: data[0].recipe_name,
    source_name: data[0].source_name,
    steps: data.reduce((acc, step) => {
      if (!step.amount) {
        return acc.concat({
          step_number: step.step_number,
          description: step.description,
        });
      }
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

// async function add({ recipe_name, source_name, steps }) {
//   let created_recipe_id
//   await db.transaction(async trx => {
//     let recipe_id_to_use
//     const [recipe] = await trx('recipes').insert({})
//   })
// }

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

