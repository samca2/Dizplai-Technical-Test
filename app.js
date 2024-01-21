const path = require('path')
const express = require('express')

const app = express()
const port = 3000

app.use('/static', express.static(path.join(__dirname, 'assets')))

app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/',(req, res) => {
    res.send('Hello World')
})

app.listen(port)
