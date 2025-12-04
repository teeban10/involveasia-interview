'use client'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from './ui/input-group'

export function SearchBar({
  searchPokemon,
  reset,
  setSearchQuery,
  searchQuery,
}: {
  searchPokemon: () => void
  reset: () => void
  setSearchQuery: (query: String | null) => void
  searchQuery: String | null
}) {
  const isDisabled = !searchQuery
  console.log(isDisabled, 'ISS', searchQuery)
  return (
    <div className='w-full flex space-x-2 outline-0 sticky top-0 bg-white z-10 pt-3 pb-4 px-1'>
      <Input
        onChange={(e) => {
          e.preventDefault()
          setSearchQuery(e.target.value)
        }}
        onKeyDown={(e) => {
          console.log(e.key, 'KEY')
          if (e.key === 'Enter') {
            searchPokemon()
          }
        }}
        name='search'
        type='text'
        placeholder='Search your Pokemon'
      />
      <Button
        disabled={isDisabled}
        onClick={searchPokemon}
        className='bg-orange-400'
      >
        Search
      </Button>
      <Button
        onClick={reset}
        variant='outline'
        className='border-orange-400 text-orange-400 hover:bg-orange-50'
      >
        Reset
      </Button>
    </div>
  )
}
