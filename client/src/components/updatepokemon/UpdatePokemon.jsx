import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import toast from 'react-hot-toast'
import './updatepokemon.css'

export default function UpdatePokemon() {
  const pokemon = {
    name: "",
    type: "",
    level: "",
    image: "",
    description: ""
  }
  
  const [currentPokemon, setCurrentPokemon] = useState(pokemon)
  const navigate = useNavigate()
  const { id } = useParams()
  
  const inputHandler = (e) => {
    const { name, value } = e.target
    setCurrentPokemon({ ...currentPokemon, [name]: value })
  }

  useEffect(() => {
    axios.get(`http://localhost:8000/api/pokemon/${id}`)
      .then((response) => {
        setCurrentPokemon(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])

  const submitForm = async (e) => {
    e.preventDefault()
    await axios.put(`http://localhost:8000/api/update/pokemon/${id}`, currentPokemon)
      .then((response) => {
        toast.success(response.data.message, { position: "top-right" })
        navigate("/")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="updatePokemon">
      <Link to="/" type="button" className="btn btn-secondary back-btn">
        <i className="fa-solid fa-arrow-left"></i> Regresar
      </Link>
      
      <h3>Editar Pokémon</h3>
      
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input value={currentPokemon.name} onChange={inputHandler} 
            type="text" className="form-control" id="name" name="name" />
        </div>
        
        <div className="form-group">
          <label htmlFor="type">Tipo:</label>
          <input value={currentPokemon.type} onChange={inputHandler} 
            type="text" className="form-control" id="type" name="type" />
        </div>
        
        <div className="form-group">
          <label htmlFor="level">Nivel:</label>
          <input value={currentPokemon.level} onChange={inputHandler} 
            type="number" className="form-control" id="level" name="level" />
        </div>
        
        <div className="form-group">
          <label htmlFor="image"> URL de la imagen:</label>
          <input value={currentPokemon.image} onChange={inputHandler} 
            type="url" className="form-control" id="image" name="image" />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Descripción:</label>
          <textarea value={currentPokemon.description} onChange={inputHandler} 
            className="form-control" id="description" name="description" rows="3"></textarea>
        </div>
        
        <button type="submit" className="btn btn-primary submit">Editar Pokémon</button>
      </form>
    </div>
  )
}