import Pokemon from "../model/pokemonModel.js"

export const create = async (req, res) => {
  try {
    const newPokemon = new Pokemon(req.body)
    const { name } = newPokemon
    const pokemonExist = await Pokemon.findOne({ name })
    
    if (pokemonExist) {
      return res.status(400).json({
        message: "Pokemon already exists"
      })
    }
    
    const savedData = await newPokemon.save()
    res.status(200).json({message: "Pokemon created successfully."})
  } catch (error) {
    res.status(500).json({ errorMessage: error.message })
  }
}

export const getAllPokemons = async (req, res) => {
  try {
    const pokemonData = await Pokemon.find()
    if (!pokemonData || pokemonData.length == 0) {
      return res.status(404).json({ message: "No pokemons found." })
    }
    return res.status(200).json(pokemonData)
  } catch (error) {
    res.status(500).json({ errorMessage: error.message })
  }
}

export const getPokemonById = async (req, res) => {
  try {
    const id = req.params.id
    const pokemonExist = await Pokemon.findById(id)

    if (!pokemonExist) {
      return res.status(404).json({ message: "Pokemon not found." })
    }
    return res.status(200).json(pokemonExist)
  } catch (error) {
    res.status(500).json({ errorMessage: error.message })
  }
}

export const updatePokemon = async (req, res) => {
  try {
    const id = req.params.id
    const pokemonExist = await Pokemon.findById(id)

    if (!pokemonExist) {
      return res.status(404).json({ message: "Pokemon not found." })
    }
    
    const updateData = await Pokemon.findByIdAndUpdate(id, req.body, {
      new: true
    })
    res.status(200).json({message: "Pokemon updated successfully."})
  } catch (error) {
    res.status(500).json({ errorMessage: error.message })
  }
}

export const deletePokemon = async (req, res) => {
  try {
    const id = req.params.id
    const pokemonExist = await Pokemon.findById(id)
    
    if (!pokemonExist) {
      return res.status(404).json({ message: "Pokemon not found." })
    }
    
    await Pokemon.findByIdAndDelete(id)
    res.status(200).json({ message: "Pokemon deleted successfully." })
  } catch (error) {
    res.status(500).json({ errorMessage: error.message })
  }
}