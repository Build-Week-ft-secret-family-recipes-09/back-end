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

router.get('/category/:category_name', async (req, res, next) => {
    try {
        const { category_name } = req.params
        const data = await Recipes.findBy({ category_name })
        res.json(data)
    } catch (error) {
        next(error)
    }
})

router.post('/add', async (req, res, next) => {
    try {
        const data = await Recipes.add(req.body)
        console.log('req.body', req.body, 'data', data)
        res.status(201).json(data)
    } catch (error) {
        next(error)
    }
})

//heyyy 
//why not working
//helpp

router.delete('/:id', (req, res, next) => {
    Recipes.deletebyId(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: 'deletion successful' })
            } else {
                res.status(404).json({ message: 'Record not found' });
            }
        })
})

module.exports = router