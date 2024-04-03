const pokeController = require('./pokecontroller.js')

const allPokemon = (pokedex, app) => {
    app.get('/', (req, resp) => {
        pokeController.getAllPokemon(req, resp, pokedex)
    })
}

const pokemonNumber = (pokedex, app) => {
    app.get('/pokemon/number/:number', (req, resp) => {
        pokeController.getSinglePokemon(req, resp, pokedex)
    })
}

const FilteredPokemon = (pokedex, app) => {
    app.get('/pokemon/base/:hp/:attack/:defense/:spattack/:spdefense/:speed', (req, resp) => {
        pokeController.getFilteredPokemon(req, resp, pokedex)
    })
}

const pokemonSpattack = (pokedex, app) => {
    app.get('/pokemon/spattack/:spattack', (req, resp) => {
        pokeController.getSpecialAttack(req, resp, pokedex)
    })
}


module.exports = {
    allPokemon,
    pokemonNumber,
    pokemonSpattack,
    FilteredPokemon
}