const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3001
require('dotenv').config();

//Middlewares
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Routes
app.use('/mutant', require('./routes/mutant.routes'))

app.get('/', (req, res) => {
    res.send('<html><body><h1>Server Running &#x269B;</h1></body></html>')
})

//Server start
app.listen(port, () => console.log('Running on port ' + port))