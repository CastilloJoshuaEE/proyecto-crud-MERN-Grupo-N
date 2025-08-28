import React, { useEffect, useState } from 'react'
import './pokemonlist.css'
import axios from "axios"
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/pokemons")
        setPokemons(response.data)
      } catch (error) {
        console.log("Error while fetching data ", error)
      }
    }
    fetchData()
  }, [])

  const deletePokemon = async (pokemonId) => {
    await axios.delete(`http://localhost:8000/api/delete/pokemon/${pokemonId}`)
      .then((response) => {
        setPokemons((prevPokemons) => prevPokemons.filter((pokemon) => pokemon._id !== pokemonId))
        toast.success(response.data.message, { position: "top-right" })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="pokemonTable">
      <h2 className="main-title">Gestionar Pokemones</h2>
      <Link to="/add" type="button" className="btn btn-primary add-btn">
        Añadir pokemon <i className="fa-solid fa-plus"></i>
      </Link>
      
      {pokemons.length === 0 ? (
        <div className="no-data">
          <h3>No hay pokemones por ahora</h3>
          <p>Por favor añade un Pokémon</p>
        </div>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Tipo</th>
              <th scope="col">Nivel</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pokemons.map((pokemon, index) => {
              return (
                <tr key={pokemon._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{pokemon.name}</td>
                  <td>{pokemon.type}</td>
                  <td>{pokemon.level}</td>
                  <td className="actionsButtons">
                    <Link to={`/detail/${pokemon._id}`} type="button" className="btn btn-info">
                      <i className="fa-solid fa-eye"></i> Ver información
                    </Link>
                    <Link to={`/update/${pokemon._id}`} type="button" className="btn btn-warning">
                      <i className="fa-solid fa-pen-to-square"></i> Editar
                    </Link>
                    <button
                      onClick={() => deletePokemon(pokemon._id)}
                      type="button" 
                      className="btn btn-danger"
                    >
                      <i className="fa-solid fa-trash"></i> Borrar
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}