export type PokemonList = {
  message: string
  data: Pokemon[] | []
  count: number
  max: number
  next: string | null
  previous: string
}

export type Pokemon = {
  name: string
  image: {
    front: string
    back: string
  }
  types: string[]
  height: number
  weight: number
}