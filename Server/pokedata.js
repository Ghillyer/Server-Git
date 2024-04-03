const path = require('path')
const fs = require('fs')

const jsonPath = path.join(__dirname, 'public', 'pokedex.json')

const jsonData = fs.readFileSync(jsonPath, 'utf8')

const pokedex = JSON.parse(jsonData);

module.exports = {pokedex}