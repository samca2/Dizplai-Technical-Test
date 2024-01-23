const path = require('path')
const express = require('express')
const fs = require("fs");

const routes = require(path.join(__dirname, 'routes'))

// set up express app with static files, views and seed 'polls' data 
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(path.join(__dirname, 'assets')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

try {
    const pollsFile = fs.readFileSync(path.join(__dirname, 'data/polls.json'))
    app.locals.polls = JSON.parse(pollsFile)
} catch (error) {
    app.locals.polls = undefined
}

// declare routes
app.get('/', routes.index)
app.get('/vote/:id', routes.voting)
app.post('/vote/:id', routes.vote)
app.get('/vote/:id/results', routes.results)
app.get('*', routes.error)

app.listen(port)
