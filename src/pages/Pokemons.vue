<template>
  <div id="list-wrapper">
    <div
      v-if="pokemonsEncontrados.length"
      id="pokemon-list"
    >
      <PokemonCard
        v-for="pokemon in pokemonsEncontrados"
        :key="`card-${pokemon.name}`"
        :pokemon="pokemon"
        @selecionar-pokemon="selecionarPokemon"
      />
    </div>

    <div
      v-if="isLoading"
      id="loading-indicator"
    >
      Carregando...
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount, inject } from 'vue'
import { usePokemonStore } from '@/stores/PokemonStore'

import CriarApi from '@/api/index'
import PokemonCard from '@/components/PokemonCard.vue'

interface ShowSnackbar {
  (message: string, color?: string, timeout?: number): void;
}

export default {
  name: 'App',

  components: {
    PokemonCard,
  },

  setup() {
    const showSnackbar = inject<ShowSnackbar>('showSnackbar')
    
    const pokemonStore = usePokemonStore()

    const api = CriarApi()
    const pokemonsEncontrados = ref([])

    const limit = 20
    const offset = ref(0)
    const semMaisPokemons = ref(false)
    const isLoading = ref(false)

    const listarPokemons = async () => {
      if (semMaisPokemons.value || isLoading.value) return
      isLoading.value = true

      try {
        const resp = await api.get('/pokemon', {
          params: {
            limit,
            offset: offset.value,
          },
        })

        pokemonsEncontrados.value.push(...resp.data.results)

        if (resp.data.results.length < limit) {
          semMaisPokemons.value = true
        } else {
          offset.value += limit
        }
      } catch (err) {
        if (showSnackbar) {
          showSnackbar('Não foi possível carregar novos pokemons', 'red', 2000)
        }
        console.error('Não foi possível carregar os pokemons', err)
      } finally {
        isLoading.value = false
      }
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      const scrollOffset = 100 // quão longe do bottom fazer o request
      if (scrollTop + windowHeight >= documentHeight - scrollOffset) {
        listarPokemons() 
      }
    }

    const selecionarPokemon = (pokemonData: PokemonData) => {
      pokemonStore.setSelectedPokemon(pokemonData) // Set the selected Pokemon in the store
    }

    onMounted(() => {
      listarPokemons()
      window.addEventListener('scroll', handleScroll)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      pokemonsEncontrados,
      semMaisPokemons,
      isLoading,
      selecionarPokemon
    }
  }
}
</script>

<style lang="sass" scoped>
#list-wrapper
  width: 100%
  height: 100%
  padding-top: 10px

#pokemon-list 
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))
  margin-left: 250px
  margin-right: 250px
  gap: 20px
  padding: 20px

  @media (max-width: 1200px)
    gap: 15px
    margin-left: 50px
    margin-right: 50px

  @media (max-width: 480px)
    gap: 10px
    margin-left: 10px
    margin-right: 10px

#loading-indicator
  display: flex
  justify-content: center
  margin: 20px 0
  font-size: 1.2em
  color: #333
</style>
