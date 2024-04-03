const getAllPokemon = (req, resp, pokedex) => {
    resp.json(pokedex)
}

const getSinglePokemon = (req, resp, pokedex) => {
    const pokenum = req.params.number
    console.log(pokenum)
    const pokemon = pokedex.filter(pokemon => {
        return pokemon.id == pokenum
    })
    resp.json(pokemon)
}


const getSpecialAttack = (req, resp, pokedex) => {
    const spattack = req.params.spattack
    const pokemon = pokedex.filter(pokemon => {
        return pokemon.base["Sp. Attack"] > spattack
    })
    resp.json(pokemon)
}

//this works
const getFilteredPokemon = (req, resp, pokedex) => {
    const HP = req.params.hp
    const Attack = req.params.attack
    const Defense = req.params.defense
    const SpAttack = req.params.spattack
    const SpDefense = req.params.spdefense
    const Speed = req.params.speed

    let pokemon = pokedex;
    if(HP !== undefined || HP !== '')
        pokemon = pokemon.filter(p => p.base.HP > HP);

        
    if(Attack !== undefined || Attack !== '')
        pokemon = pokemon.filter(p => p.base.Attack > Attack);


    if(Defense !== undefined || Defense !== '')
        pokemon = pokemon.filter(p => p.base.Defense > Defense);


    if(SpAttack !== undefined || SpAttack !== '') {
        pokemon = pokemon.filter(p => p.base['Sp. Attack'] > SpAttack);
    }

    if(SpDefense !== undefined || SpDefense !== '') {
        pokemon = pokemon.filter(p => p.base['Sp. Defense'] > SpDefense);
    }

    if(Speed !== undefined || Speed !== '')
        pokemon = pokemon.filter(p => p.base.Speed > Speed);


    if(pokemon.length > 0)
    {
        resp.json(pokemon)
    } else{
        //change to add a message here eventually
        console.log("No matching pokemon")
    }

}


// Create a new Pokemon
const createPokemon = (req, res) => {
    // Assuming the new Pokemon data is sent in the request body
    const newPokemon = req.body;
    // Add validation or data processing if needed
    // Add the new Pokemon to the pokedex (assuming pokedex is an array)
    pokedex.push(newPokemon);
    res.status(201).json(newPokemon);
};

// Update an existing Pokemon
const updatePokemon = (req, res) => {
    const pokemonId = req.params.id; // Assuming the Pokemon ID is part of the URL
    const updatedPokemonData = req.body; // Assuming the updated data is sent in the request body
    // Find the Pokemon in the pokedex by ID and update its data
    const updatedPokemon = pokedex.find(pokemon => pokemon.id == pokemonId);
    if (updatedPokemon) {
        Object.assign(updatedPokemon, updatedPokemonData);
        res.json(updatedPokemon);
    } else {
        res.status(404).json({ error: 'Pokemon not found' });
    }
};

// Delete an existing Pokemon
const deletePokemon = (req, res) => {
    const pokemonId = req.params.id; // Assuming the Pokemon ID is part of the URL
    // Find the index of the Pokemon in the pokedex by ID
    const pokemonIndex = pokedex.findIndex(pokemon => pokemon.id == pokemonId);
    if (pokemonIndex !== -1) {
        // Remove the Pokemon from the pokedex array
        const deletedPokemon = pokedex.splice(pokemonIndex, 1)[0];
        res.json(deletedPokemon);
    } else {
        res.status(404).json({ error: 'Pokemon not found' });
    }
};


module.exports = {
    getAllPokemon,
    getSinglePokemon,
    getSpecialAttack,
    getFilteredPokemon,
    createPokemon,
    updatePokemon,
    deletePokemon

}