const path = require('path')
const fs = require('fs')
const express = require('express')


const cors = require('cors')
const pokeData = require('./pokedata.js')
const pokeRouter = require('./pokerouter.js')

const app = express();
app.use(express.urlencoded({extended: true}))
app.use(cors())

//handle requests for static resources
app.use('/static', express.static(path.join(__dirname, './public')));


const pokedex = pokeData.pokedex;

pokeRouter.allPokemon(pokedex, app)
pokeRouter.pokemonNumber(pokedex, app)
pokeRouter.pokemonSpattack(pokedex, app)
pokeRouter.FilteredPokemon(pokedex, app)

let port = process.eventNames.PORT || 8080
app.listen(port, () => {
  console.log("Server running at port: " + port)
})