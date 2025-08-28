import './App.css'
import PokemonList from './components/getpokemon/PokemonList'
import AddPokemon from './components/addpokemon/AddPokemon'
import UpdatePokemon from './components/updatepokemon/UpdatePokemon'
import PokemonDetail from './components/pokemondetail/PokemonDetail'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <PokemonList />
    },
    {
      path: "/add",
      element: <AddPokemon />
    },
    {
      path: "/update/:id",
      element: <UpdatePokemon />
    },
    {
      path: "/detail/:id",
      element: <PokemonDetail />
    }
  ])
  
  return (
    <div className="App">
      <header className="App-header">
        <RouterProvider router={route}></RouterProvider>
      </header>
    </div>
  )
}

export default App