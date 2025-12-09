import express, {
  type Request,
  type Response,
} from 'express'
import 'dotenv/config'
import helmet from 'helmet'
import serverAuthentication from './middleware/index.js'
import axios from 'axios'
import type { PokemonList } from './types.js'
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(helmet())

app.get(
  '/',
  (req: Request, res: Response) => {
    res.json({ message: 'Health Check OK' })
  }
)
app.get(
  '/api/pokemons',
  serverAuthentication,
  async (req: Request, res: Response) => {
    try {
      const { limit = 50, current = 0 } = req.query
      const offset = Number(current)
      const pokemonResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      )
      const pokemon_list: PokemonList = pokemonResponse.data
      const pokemons = await Promise.all(
        pokemon_list.results.map(async (pokemon) => {
          const pokemonDetailsResponse = await axios.get(
            pokemon.url
          )
          const pokemonData = pokemonDetailsResponse.data
          return {
            name: pokemon.name,
            image: {
              front: pokemonData.sprites.front_default,
              back: pokemonData.sprites.back_default,
            },
            types: pokemonData.types.map(
              (t: any) => t.type.name
            ),
            height: pokemonData.height,
            weight: pokemonData.weight,
          }
        })
      )
      res.json({
        message: 'Ok',
        data: pokemons,
        max: pokemon_list.count,
        count: pokemons.length,
        next: pokemon_list.next,
        previous: pokemon_list.previous,
      })
    } catch (error) {
      console.log(error, '/pokemon GET')
      res.status(500).json({
        message: 'Error fetching pokemons',
        error,
      })
    }
  }
)
app.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT}`
  )
})
