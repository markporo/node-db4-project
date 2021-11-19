const db = require('../../data/db-config')

async function getRecipeById(recipe_id) {
    // return Promise.resolve(`awesome ${recipe_id}`) // use this to test setting up migrations and seeds
    const recipe = await db('recipes as r')
        .where('recipe_id', recipe_id)
    return recipe;
}

module.exports = { getRecipeById }