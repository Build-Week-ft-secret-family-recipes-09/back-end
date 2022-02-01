const express = require('express');
const Recipes = require('./recipes-model')

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const recipe = await Recipes.findAll()
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

router.post('/category', async (req, res, next) => {
    try {
        const category_name = req.body.category_name
        const data = await Recipes.findBy(category_name)
        res.json(data)
    } catch (error) {
        next(error)
    }
})

// router.post('/add', async (req, res, next) => {
//     try {
//         const data = await Recipes.add(req.body)
//         res.status(201).json(data)
//     } catch (error) {
//         next(error)
//     }
// })

module.exports = router