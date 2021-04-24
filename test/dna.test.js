const should = require('should')
const sinon = require('sinon')
const dnaController = require('../controllers/dna.controller')
require('dotenv').config();
const mongoose = require('mongoose')


describe('dna Controller Test:', () => {
	describe('Post', () => {
		it('should deliver 200 if it is a mutant', () => {
			const req = {
				body: {
					"dna": ["atcaga", "cgaaac", "accagc", "aaacgc", "ctgcac", "acgtgc"]
				}
			}
			const res = {
				status: sinon.spy(),
				send: sinon.spy(),
				json: sinon.spy()
			}

			dnaController.postMutant(req, res)
			res.status.calledWith(200).should.equals(true, `is a mutant ${res.status.args[0][0]}`)
			res.send.calledWith('is a mutant').should.equals(true)
		});

		it('should deliver 403 if it is not a mutant', () => {
			const req = {
				body: {
					"dna": ["atcaga", "cgaaac", "accagc", "aaacgg", "ctgcac", "acgtgc"]
				}
			}
			const res = {
				status: sinon.spy(),
				send: sinon.spy(),
				json: sinon.spy()
			}

			dnaController.postMutant(req, res)
			res.status.calledWith(403).should.equals(true, `is not a mutant ${res.status.args[0][0]}`)
			res.send.calledWith('is not a mutant').should.equals(true)
		});

		before(function () {
			//Connect to DB
			const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i8uw8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
			mongoose.connect(
				uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
				async (err) => {
					if (err) console.log(err)
					else console.log('Connected to DB!')
				}
			)
		});

		after(function () {
			mongoose.connection.close();
		});

		it('should deliver stats related to dna', () => {
			const req = {};
			const res = {
				status: sinon.spy(),
				send: sinon.spy(),
				json: sinon.spy()
			}

			return dnaController.getStats(req, res).then(data => {
				res.status.calledWith(200).should.equals(true)
				sinon.assert.calledWith(res.json, sinon.match.has('count_mutant_dna'));
				sinon.assert.calledWith(res.json, sinon.match.has('count_human_dna'));
				sinon.assert.calledWith(res.json, sinon.match.has('ratio'));
			})
		});
	});
});