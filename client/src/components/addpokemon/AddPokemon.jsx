import React, { useState } from 'react'
import './addpokemon.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from 'react-hot-toast'

export default function AddPokemon() {
  const pokemon = {
    name: "",
    type: "",
    level: "",
    image: "",
    description: ""
  }
  
  const [newPokemon, setNewPokemon] = useState(pokemon)
  const navigate = useNavigate()

  const inputHandler = (e) => {
    const { name, value } = e.target
    setNewPokemon({ ...newPokemon, [name]: value })
  }

  const submitForm = async (e) => {
    e.preventDefault()
    await axios.post("http://localhost:8000/api/pokemon", newPokemon)
      .then((response) => {
        toast.success(response.data.message, { position: "top-right" })
        navigate("/")
      })
      .catch((error) => {
        console.log(error)
        toast.error("Error adding Pokémon")
      })
  }
  
  return (
    <div className="addPokemon">
      <Link to="/" type="button" className="btn btn-secondary back-btn">
        <i className="fa-solid fa-arrow-left"></i> Regresar
      </Link>
      
      <h3>Añadir un nuevo Pokémon</h3>
      
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input onChange={inputHandler} type="text" className="form-control" 
            id="name" name="name" placeholder="nombre..." required />
        </div>
        
        <div className="form-group">
          <label htmlFor="type">Tipo:</label>
          <input onChange={inputHandler} type="text" className="form-control" 
            id="type" name="type" placeholder="ej: Fuego, agua)" required />
        </div>
        
        <div className="form-group">
          <label htmlFor="level">Nivel:</label>
          <input onChange={inputHandler} type="number" className="form-control" 
            id="level" name="level" placeholder="nivel...." min="1" max="100" required />
        </div>
        
        <div className="form-group">
          <label htmlFor="image"> URL de la imagen:</label>
          <input onChange={inputHandler} type="url" className="form-control" 
            id="image" name="image" placeholder="URL" required />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Descripcion:</label>
          <textarea onChange={inputHandler} className="form-control" 
            id="description" name="description" rows="3" placeholder="Añade descripcion" required></textarea>
        </div>
        
        <button type="submit" className="btn btn-primary submit">Añadir Pokémon</button>
      </form>
    </div>
  )
}