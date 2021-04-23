var mutantService = require('../services/mutant.service')

exports.getMutant = async (req, res) => {
  try {
    const ans = await mutantService.getMutant(req.body)
    res.json(ans)
  } catch (e) {
    res.status(400).send(e.message)
  }
}