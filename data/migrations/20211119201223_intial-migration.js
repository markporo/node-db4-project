

exports.up = async function (knex) {
    // 1 recipe has many ingredients/ steps/ quantities
    await knex.schema.createTable('recipes', tbl => {
        tbl.increments('recipe_id')
        tbl.string('recipe_name', 128).notNullable().unique();
    })

        .createTable('ingredients', tbl => {
            tbl.increments('ingredient_id') // 
            tbl.string('ingredient_name', 256).notNullable().unique();
            tbl.string('ingredient_unit', 50)

        })
        .createTable('steps', tbl => {
            tbl.increments('step_id') // steps id
            tbl.string('step_instructions', 1024).notNullable()
            tbl.integer('step_number').notNullable()
            // // foreign key that points to recipes
            tbl.integer('recipe_id') // forces integer to be positive
                .unsigned()
                .notNullable()
                .references('recipe_id') // refers to id from other table
                .inTable('recipes') //must match this table
                .onDelete('RESTRICT')
                .onUpdate('RESTRICT')
        })

        .createTable('step_ingts', tbl => {
            tbl.increments('step_ingts_id')
            tbl.float('quantity').notNullable()
            // foreign key that points to steps
            tbl.integer('step_id')
                .unsigned()
                .notNullable()
                .references('step_id')
                .inTable('steps')
                .onDelete('RESTRICT')
                .onUpdate('RESTRICT')
            // foreign key that points to ingredients
            tbl.integer('ingredient_id')
                .unsigned()
                .notNullable()
                .references('ingredient_id')
                .inTable('ingredients')
                .onDelete('RESTRICT')
                .onUpdate('RESTRICT')

            //     tbl.string('quantity', 128);
            //     // foreign key that points to other tables
            //     tbl.integer()
            //         .unsigned()
            //         .notNullable()
            //         .references('id') // refers to id from other table
            //         .inTable('steps'); //must match this table
        });
};

exports.down = async function (knex) {
    // drop in the opposite order
    await knex.schema
        .dropTableIfExists('step_ingts')
        .dropTableIfExists('steps')
        .dropTableIfExists('ingredients')
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


///GUIDED TABLE
// TABLE 1: -RECIPE NAME   -RECIPE ID 
// TABLE 2: -Ingredient Name  -INGREDIENT ID  -ing_unit
// TABLE 3: -STEPS ID  -Step INSTRUCTIONS -STEP_order -RECIPE ID (foreing key)  
// TABLE 4: -step_id -step_id (foreign key) ing_id (foreign_key) Quantity (points to -ing_unit)
