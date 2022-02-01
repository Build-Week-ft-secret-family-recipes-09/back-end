const db = require("../data/db-config");

function findAll()
  return db("recipes");
}

function findById(recipe_id) {
  const data = db("recipes as r ")
    .leftJoin("steps as s", "r.recipe_id", "s.recipe_id")
    .leftJoin("ingredients_steps as si", "s.step_id", "si.step_id")
    .leftJoin("ingredients as i", "si.ingredient_id", "i.ingredient_id")
    .where("recipe_id", recipe_id)
    .select(
      "r.recipe_id",
      "source_name",
      "recipe_name",
      "step_number",
      "description",
      "ingredient_name",
      "amount"
    );
    return data;
}

module.exports = {
  findAll,
  findById,
};
