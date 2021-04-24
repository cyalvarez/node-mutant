const Mutant = require('../models/mutant.model')
const Human = require('../models/human.model')

exports.getMutantCount = async () => {
  try {
    return await Mutant.countDocuments({})
  } catch (e) {
    throw Error(e)
  }
}

exports.getHumanCount = async () => {
  try {
    return await Human.countDocuments({})
  } catch (e) {
    throw Error(e)
  }
}

exports.saveMutant = async (data) => {
  try {
    const mutant = new Mutant({
      dna: JSON.stringify(data)
    })
    const ans = await mutant.save()
    return ans
  } catch (e) {
    throw Error(e)
  }
}

exports.saveHuman = async (data) => {
  try {
    const human = new Human({
      dna: JSON.stringify(data)
    })
    const ans = await human.save()
    return ans
  } catch (e) {
    throw Error(e)
  }
}
