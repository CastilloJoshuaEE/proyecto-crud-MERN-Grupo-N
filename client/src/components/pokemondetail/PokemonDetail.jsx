import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from "axios"
import './pokemondetail.css'

export default function PokemonDetail() {
  const [pokemon, setPokemon] = useState(null)
  const { id } = useParams()
  
  useEffect(() => {
    axios.get(`http://localhost:8000/api/pokemon/${id}`)
      .then((response) => {
        setPokemon(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])

  if (!pokemon) {
    return <div className="loading">Cargando detalles del Pokémon...</div>
  }

  return (
    <div className="pokemonDetail">
      <Link to="/" type="button" className="btn btn-secondary back-btn">
        <i className="fa-solid fa-arrow-left"></i> regresar a la lista
      </Link>
      
      <div className="detail-card">
        <h2 className="pokemon-name">{pokemon.name}</h2>
        
        <div className="detail-content">
          <div className="image-container">
            <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
          </div>
          
          <div className="info-container">
            <div className="info-item">
              <span className="label">Tipo:</span>
              <span className="value">{pokemon.type}</span>
            </div>
            
            <div className="info-item">
              <span className="label">Nivel:</span>
              <span className="value">{pokemon.level}</span>
            </div>
            
            <div className="info-item description">
              <span className="label">Descripcion:</span>
              <p className="value">{pokemon.description}</p>
            </div>
            
            <Link to={`/update/${pokemon._id}`} type="button" className="btn btn-warning edit-btn">
              <i className="fa-solid fa-pen-to-square"></i> Editar Pokémon
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}