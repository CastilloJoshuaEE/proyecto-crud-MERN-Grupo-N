import express from "express"
import { 
  getAllPokemons, 
  create, 
  getPokemonById, 
  updatePokemon, 
  deletePokemon 
} from "../controller/pokemonController.js"

const route = express.Router()

route.post("/pokemon", create)
route.get("/pokemons", getAllPokemons)
route.get("/pokemon/:id", getPokemonById)
route.put("/update/pokemon/:id", updatePokemon)
route.delete("/delete/pokemon/:id", deletePokemon)

export default route