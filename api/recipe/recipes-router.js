const express = require('express');
const Recipes = require('./recipes-model')

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const recipe = await Recipes.findAll()
        console.log('?????', recipe)
        res.json(recipe)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const recipe = await Recipes.findById(req.params.id)
        res.json(recipe)
    } catch (error) {
        next(error)
    }
})

module.exports = router