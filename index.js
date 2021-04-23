const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const port = process.env.PORT || 3001
require('dotenv').config();

//Middlewares
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Routes
app.use('/dna', require('./routes/dna.routes'))

app.get('/', (req, res) => {
	res.send('<html><body><h1>Server Running &#x269B;</h1></body></html>')
})

//Connect to DB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i8uw8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(
	uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
	async (err) => {
		if (err) console.log(err)
		else console.log('Connected to DB!')
	}
)

//Server start
app.listen(port, () => console.log('Running on port ' + port))