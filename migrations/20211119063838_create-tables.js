
exports.up = function (knex, Promise) {
    // 1 recipe has many ingredients/ steps/ quantities
    return knex.schema.createTable('recipes', tbl => {
        tbl.increments();
        tbl.string('recipe_name', 128).notNullable();
    })
        .createTable('steps', tbl => {
            tbl.increments(); // steps id
            tbl.integer('step_number')
                .unsigned()
                .notNullable();
            tbl.string('instructions', 1024);
            // foreign key that points to other tables
            tbl.integer() // forces integer to be positive
                .unsigned()
                .notNullable()
                .references('id') // refers to id from other table
                .inTable('recipes'); //must match this table
        })
        .createTable('ingredients', tbl => {
            tbl.increments(); // steps id
            tbl.string('ingredient_name', 128);
            // foreign key that points to other tables
            tbl.integer()
                .unsigned()
                .notNullable()
                .references('id') // refers to id from other table
                .inTable('steps'); //must match this table
        })
        .createTable('quantity_of_ingredient', tbl => {
            tbl.increments();
            tbl.string('quantity', 128);
            // foreign key that points to other tables
            tbl.integer()
                .unsigned()
                .notNullable()
                .references('id') // refers to id from other table
                .inTable('steps'); //must match this table
        });
};

exports.down = function (knex, Promise) {
    // drop in the opposite order
    return knex.schema
        .dropTableIfExists('quantity_of_ingredient')
        .dropTableIfExists('ingredients')
        .dropTableIfExists('steps')
        .dropTableIfExists('recipes')
};


// ONE TO ONE
// recipe name to recipe id
// ingredients Name to Ingredient ID
// Quantitiy to Quantity ID
// Step Instructions to Step Number

// ONE TO MANY
// RECIPES TO STEPS, ingredients, quantities

// MANY TO MANY
// Steps to Ingredients/ steps to quantities
// quantities to ingredients

// *******************************************
// TABLE 1: -RECIPE NAME   -RECIPE ID 
// TABLE 2: -STEPS ID  -Step INSTRUCTIONS -STEP NUMBER -RECIPE ID  -INGREDIENTS ID -quantity ID
// TABLE 3: -Ingredient Name  -INGREDIENT ID  
// TABLE 4: -QUANTITY OF INGREDIENT -Quantity ID 
