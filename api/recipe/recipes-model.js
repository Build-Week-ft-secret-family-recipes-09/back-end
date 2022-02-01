const db = require('../data/db-config')

function findAll(){
    return db('recipes').select('source_name', 'recipe_name')
}

function findById(recipe_id){
    db('recipes ad r ')
    .leftJoin('steps as s', 'r.recipe_id', 's.recipe_id')
}

module.exports = {
    findAll,
    findById,
}

