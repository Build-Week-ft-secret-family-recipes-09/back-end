const db = require("../data/db-config");

function findAll() {
  return db("recipes");
}

async function findById(recipe_id) {
  const data = await db("recipes as r")
    .leftJoin("steps as s", "r.recipe_id", "s.recipe_id")
    .select(
      "r.recipe_id",
      "recipe_name",
      "source_name",
      "category_name",
      "step_number",
      "description",
      "ingredient_name",
      "amount"
    )
    .orderBy("s.step_number")
    .where("r.recipe_id", recipe_id);

  const newObj = {
    recipe_id: data[0].recipe_id,
    recipe_name: data[0].recipe_name,
    source_name: data[0].source_name,
    category_name: data[0].category_name,
    steps: data.reduce((acc, step) => {
      console.log("newObj step.amount", step.amount, "data", data);
      if (!step.amount) {
        return acc.concat({
          step_number: step.step_number,
          description: step.description,
        });
      }
      console.log("other step.amount", step.amount);
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
  const data = await db("recipes as r")
    .leftJoin("steps as s", "r.recipe_id", "s.recipe_id")
    .select(
      "r.recipe_id",
      "recipe_name",
      "source_name",
      "category_name",
      "step_number",
      "description",
      "ingredient_name",
      "amount"
    )
    .orderBy("s.step_number")
    .where(filter);
    
    const newObj = {
      recipe_id: data[0].recipe_id,
      recipe_name: data[0].recipe_name,
      source_name: data[0].source_name,
      category_name: data[0].category_name,
      steps: data.reduce((acc, step) => {
        console.log("newObj step.amount", step.amount, "data", data);
        if (!step.amount) {
          return acc.concat({
            step_number: step.step_number,
            description: step.description,
          });
        }
        console.log("other step.amount", step.amount);
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

async function add({ recipe_name, source_name, category_name, steps }) {
  let created_recipe_id;
  await db
    .transaction(async (trx) => {
      const recipe = await trx("recipes as r")
        .insert({ recipe_name, source_name, category_name })
        .returning("r.recipe_id");
      created_recipe_id = recipe[0].recipe_id;

      steps.map(async (step) => {
        let step_id_to_use;

        const stepsData = await db("steps as s")
          .insert({
            recipe_id: created_recipe_id,
            step_number: step.step_number,
            description: step.description,
          })
          .returning("s.step_id")
          .then()
          .catch();

        step_id_to_use = stepsData[0].step_id;

        let ingred;
        if (step.ingredient_name) {
          ingred = await db("ingredients")
            .where("ingredient_name", step.ingredient_name)
            .select("ingredient_id");
        }

        if (!ingred.length) {
          await db("ingredients")
            .insert({ ingredient_name: step.ingredient_name })
            .then()
            .catch();
          console.log("if statement");
        }
        console.log("step.amount", step.amount);
        await db("ingredients_steps")
          .insert({
            ingredient_id: ingred[0].ingredient_id,
            step_id: step_id_to_use,
            amount: step.amount,
          })
          .then()
          .catch();
      });
    })
    .then((esp) => {
      console.log("esp", esp);
    })
    .catch((err) => {
      console.log("the real world", err);
    });
  return findById(created_recipe_id);
}

async function deletebyId(id) {
  const data = await db("recipes").where("recipe_id", id).del();
  return data;
}

async function update({
  recipe_name,
  source_name,
  category_name,
  steps,
  recipe_id,
}) {
  const recipe = await db("recipes").where("recipe_id", recipe_id).update({
    recipe_name: recipe_name,
    source_name: source_name,
    category_name: category_name,
  });

  const step = await db("steps")
    .where("recipe_id", recipe_id)
    .orderBy("step_number");

  step.map(async (data, index) => {
    await db("steps").where("step_id", data.step_id).update({
      description: steps[index].description,
      ingredient_name:steps[index].ingredient_name,
      amount:steps[index].amount
    });
  })
  return findById(recipe_id);
  
}

module.exports = {
  findAll,
  findById,
  findBy,
  deletebyId,
  add,
  update,
};
