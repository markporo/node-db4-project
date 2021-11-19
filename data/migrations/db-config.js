// THIS IS WHERE THE DECISION
//FOR WHICH ENVIRONMENT TO 
//USE IS MADE!!!

//WE AER USING development environment

const knex = require('knex')
const configurations = require('../../knexfile')
const environment = process.env.NODE_ENV || 'development'

module.exports = knex(configurations[environment]);