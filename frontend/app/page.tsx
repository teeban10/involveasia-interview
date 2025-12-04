'use client'
import { PageLayout } from '@/components/PageLayout'
import { PokeCard } from '@/components/PokeCard'
import axios from 'axios'
import { FormEvent, useEffect, useState } from 'react'
import { getPokemons } from './action'
import { Pokemon, PokemonList } from '@/lib/types'
import { toast } from 'sonner'
import { SearchBar } from '@/components/SearchBar'
import { Button } from '@/components/ui/button'

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalLoaded, setTotalLoaded] = useState(0)
  const [isLoadMore, setIsLoadMore] = useState(true)
  const [displayedPokemons, setDisplayedPokemons] =
    useState<Pokemon[]>([])
  const [searchQuery, setSearchQuery] = useState<String | null>(null);
  useEffect(() => {
    ;(async () => {
      await fetchData()
    })()
  }, [])
  const fetchData = async () => {
    try {
      setIsLoading(true)
      const pokemonsList: PokemonList = await getPokemons(
        totalLoaded,
        50
      )
      if (totalLoaded === pokemonsList.max) {
        console.log('REACHED MAX')
        setIsLoadMore(false)
      }
      if (!pokemonsList.next) setIsLoadMore(false)
      const merged = pokemons.concat(pokemonsList.data)
      setTotalLoaded(totalLoaded + pokemonsList.count)
      setPokemons(merged)
      setDisplayedPokemons(merged)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error('Error fetching pokemons:', error)
      toast.error(
        'Failed to load pokemons. Please try again.'
      )
    }
  }
  const searchPokemon = () => {
    if (!searchQuery) {
      return;
    }
    const q = searchQuery
      .toLowerCase()
      .trim()
    setIsLoadMore(false)
    if (!q) {
      setDisplayedPokemons([])
      return
    }
    const filtered = pokemons.filter((p) =>
      p.name.toLowerCase().includes(q)
    )
    setDisplayedPokemons(filtered)
  }
  const reset = () => { setDisplayedPokemons(pokemons); setSearchQuery(null); setIsLoadMore(true); }
  return (
    <div className='bg-white'>
      <PageLayout>
        <SearchBar searchPokemon={searchPokemon} reset={reset} setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
        <div className='px-1 py-0'>
          {displayedPokemons.length === 0 ? (
            <div className='text-center py-10 text-gray-500'>
              No Pokémon found.
            </div>
          ): (
            <div className='grid grid-cols-3 gap-4 pb-4'>
              {displayedPokemons.map((pokemon, index) => (
                <PokeCard
                  key={`${pokemon.name}-${index}`}
                  name={pokemon.name}
                  image={pokemon.image}
                  types={pokemon.types}
                />
              ))}
            </div>
          )}
          {(isLoadMore) && (
            <Button
              disabled={isLoading}
              onClick={() => fetchData()}
              className='w-full mb-4 bg-orange-400'
            >
              {isLoading ? 'Loading...' : 'Load More'}
            </Button>
          )}
        </div>
      </PageLayout>
    </div>
  )
}
