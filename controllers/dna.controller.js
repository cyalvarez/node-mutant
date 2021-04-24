var dnaService = require('../services/dna.service')

exports.postMutant = async ({ body: { dna } }, res) => {
  try {
    if (isMutant(dna)) {
      dnaService.saveMutant(dna);
      res.status(200);
      return res.send('is a mutant');
    }
    else {
      dnaService.saveHuman(dna);
      res.status(403);
      return res.send('is not a mutant');
    }
  } catch (e) {
    res.status(400).send(e.message)
  }
}

exports.getStats = async (req, res) => {
  try {
    const mutantCount = await dnaService.getMutantCount()
    const humanCount = await dnaService.getHumanCount()
    const response = {
      count_mutant_dna: mutantCount,
      count_human_dna: humanCount + mutantCount,
      ratio: calculateRatio(mutantCount, humanCount)
    }
    res.status(200)
    res.json(response)
    return response
  } catch (e) {
    res.status(400)
    res.send(e.message)
  }
}

function calculateRatio(mutantCount, humanCount) {
  return (mutantCount + humanCount) / mutantCount;
}

function isMutant(gen) {
  let data = [];
  let contMutants = 0;
  for (var i = 0; i < gen.length; i++) {
    const row = gen[i];
    data.push([]);
    for (var j = 0; j < row.length; j++) {
      const pro = row.charAt(j)
      let curr = {
        h: hCoincidence(i, j, pro, gen, data),
        v: vCoincidence(i, j, pro, gen, data),
        md: mdCoincidence(i, j, pro, gen, data),
        sd: sdCoincidence(i, j, pro, gen, data)
      }
      if (curr.h >= 3 || curr.v >= 3 || curr.md >= 3 || curr.sd >= 3) {
        contMutants++;
        if (contMutants > 1) {
          return true;
        }
      }
      data[i].push(curr);
    }
  }
  return false;
}

function hCoincidence(x, y, pro, gen, data) {
  const coord = y - 1;
  if (coord < 0) return 0;
  if (gen[x].charAt(coord) === pro) return data[x][coord].h + 1;
  else return 0;
}

function vCoincidence(x, y, pro, gen, data) {
  const coord = x - 1;
  if (coord < 0) return 0;
  if (gen[coord].charAt(y) === pro) return data[coord][y].v + 1;
  else return 0;
}

function mdCoincidence(x, y, pro, gen, data) {
  const coordX = x - 1;
  const coordY = y - 1;
  if (coordX < 0 || coordY < 0) return 0;
  if (gen[coordX].charAt(coordY) === pro) return data[coordX][coordY].md + 1;
  else return 0;
}

function sdCoincidence(x, y, pro, gen, data) {
  const coordX = x - 1;
  const coordY = y + 1;
  if (coordX < 0 || coordY > gen.length - 1) return 0;
  if (gen[coordX].charAt(coordY) === pro) return data[coordX][coordY].sd + 1;
  else return 0;
}