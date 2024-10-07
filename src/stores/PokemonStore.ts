import { defineStore } from 'pinia'
import type { PokemonData } from '../utils/PokemonData'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    selectedPokemon: {} as PokemonData,
  }),
  
  actions: {
    setSelectedPokemon(pokemon: PokemonData) {
      this.selectedPokemon = pokemon
    },
    clearSelectedPokemon() {
      this.selectedPokemon = {}
    }
  },
})
