const express = require('express')
const recipesRouter = require('./recipes/recipes-router')

//server
const server = express() // server from instantiating express as a function

// middleware to parse json data
server.use(express.json());



// ROUTER
server.use('/api/recipes', recipesRouter)


// catch all endpoints
server.use('*', (req, res) => {
    res.json({ api: 'up' })
});


module.exports = server;