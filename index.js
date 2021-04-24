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
	res.send(`<html>
	<body>
	<h1>Server Running &#x269B;</h1>
	<article>
	<h2>REST API</h2>
	<h3>Revisar ADN</h3>
	<h4>Request</h4>
	<p><code>POST /dna</code></p>
	<h4>Body</h4>
	<p>Ejemplo</p>
	<pre><code>"dna": ["atcaga","cgaaac","accagc","aaacgc","ctgcac","acgtgc"]</code></pre>
	<h4>Response</h4>
	<pre><code>Status Code: 200 OK 
"is a mutant"

Status Code: 403 Forbidden
"is not a mutant"
</code></pre>
	<h3>Ver estadisticas</h3>
	<h4>Request</h4>
	<p><code>GET /dna/stats</code></p>
	<h4>Response</h4>
	<pre><code>Status Code: 200 OK 
{"count_mutant_dna":0,"count_human_dna":0,"ratio":0}
</code></pre>
	</article>
	</body>
	</html>`)
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