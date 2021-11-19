const router = require('express').Router()
const recipeModel = require('./recipes-model')

router.get('/:recipe_id', (req, res, next) => {
    recipeModel.getRecipeById(req.params.recipe_id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(next)
})



router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
})


module.exports = router