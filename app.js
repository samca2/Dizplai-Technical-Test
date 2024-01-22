const path = require('path')
const express = require('express')
const fs = require("fs");

const index = require(path.join(__dirname, 'routes/index'))
const voting = require(path.join(__dirname, 'routes/voting'))
const results = require(path.join(__dirname, 'routes/results'))

// set up express app with static files, views  and seed 'polls' data 
const app = express()
const port = 3000

app.use('/static', express.static(path.join(__dirname, 'assets')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

try {
    const pollsFile = fs.readFileSync(path.join(__dirname, 'data/polls.json'))

    app.locals.polls = JSON.parse(pollsFile)
} catch (error) {
    app.locals.polls = null
}

// declare routes
app.get('/', index.route)

app.listen(port)
