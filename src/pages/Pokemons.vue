<template>
  <div id="tela-listagem-pokemons">
    <div id="search-wrapper">
      <SearchInput
        v-model="searchText"
        v-model:selected-type="searchType"
      />
    </div>
    <div
      id="list-wrapper"
      ref="listWrapper"
    >
      <div
        v-if="pokemonsFiltrados.length"
        id="pokemon-list"
      >
        <PokemonCard
          v-for="pokemon in pokemonsFiltrados"
          :id="`card-${pokemon.name}`"
          :key="`card-${pokemon.name}`"
          :class="{'selected' : pokemon.name === pokemonSelecionado.name}"
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

      <div
        v-if="!pokemonsFiltrados.length"
        class="text-center"
      >
        Nenhum pokemon foi encontrado...
      </div>

      <div 
        v-if="pokemonSelecionado.name" 
        class="overlay" 
        @click="selecionarPokemon(pokemonSelecionado)" 
      />

      <CardDetalhes :stats="pokemonSelecionado.stats" />
      <CardEvolucao :species="pokemonSelecionado.species" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount, inject, computed, watch } from 'vue'
import { usePokemonStore } from '@/stores/PokemonStore'

import CriarApi from '@/api/index'

import type { PokemonData } from '@/utils/PokemonData'

import SearchInput from '@/components/SearchInput.vue'
import PokemonCard from '@/components/PokemonCard.vue'
import CardDetalhes from '@/components/CardDetalhes.vue'
import CardEvolucao from '@/components/CardEvolucao.vue'

interface ShowSnackbar {
  (message: string, color?: string, timeout?: number): void;
}

export default {
  name: 'App',

  components: {
    SearchInput,
    PokemonCard,
    CardDetalhes,
    CardEvolucao
  },

  setup() {
    const showSnackbar = inject<ShowSnackbar>('showSnackbar')
    
    const pokemonStore = usePokemonStore()
    const listWrapper = ref()
    const api = CriarApi()
    
    const pokemonsEncontrados = ref<PokemonData[]>([])
    const pokemonsFiltrados = ref<PokemonData[]>([])

    const limit = ref<number>(20)
    const offset = ref<number>(0)
    const semMaisPokemons = ref<boolean>(false)
    const isLoading = ref<boolean>(false)

    const searchText = ref<string | null>('')
    const searchType = ref<string | null>(null)

    const listarPokemons = async () => {
      if (semMaisPokemons.value || isLoading.value) return
      isLoading.value = true

      try {
        const resp = await api.get('/pokemon', {
          params: {
            limit: limit.value,
            offset: offset.value,
          },
        })

        pokemonsEncontrados.value.push(...resp.data.results)

        if (resp.data.results.length < limit.value) {
          semMaisPokemons.value = true
        } else {
          offset.value += limit.value
        }

        filtrarPokemons()

      } catch (err) {
        showSnackbar('Não foi possível carregar os pokemons', 'red', 2000)

        console.error('Não foi possível carregar os pokemons', err)
      } finally {
        isLoading.value = false
      }
    }

    const listarPokemonsPorTipo = async () => {
      isLoading.value = true
      try {
        const resp = await api.get(`/type/${searchType.value}`)
        const pokemons = resp.data.pokemon.map(p => p.pokemon)

        pokemonsEncontrados.value = pokemons
        pokemonsFiltrados.value = [...pokemonsEncontrados.value]

        filtrarPokemons()
      } catch (err) {
        if (showSnackbar) {
          showSnackbar('Não foi possível carregar pokemons por tipo', 'red', 2000)
        }
        console.error('Não foi possível carregar pokemons por tipo', err)
      } finally {
        isLoading.value = false
      }
    }

    const filtrarPokemons = () => {
      if (!searchText.value) {
        pokemonsFiltrados.value = pokemonsEncontrados.value
        return
      }

      const textFilter = searchText.value.toLowerCase()

      pokemonsFiltrados.value = pokemonsEncontrados.value.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(textFilter) || pokemon.id?.toString().includes(textFilter)
      })
    }

    const handleScroll = () => {
      // caso esteja filtrando por tipo, o offset não é utilizado
      if (searchType.value) return
      
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // quão longe do bottom fazer o request
      const scrollOffset = 100
      if (scrollTop + windowHeight >= documentHeight - scrollOffset) {
        listarPokemons() 
      }
    }
    
    const pokemonSelecionado = computed(() => {
      return pokemonStore.selectedPokemon
    })

    const selecionarPokemon = (pokemonData: PokemonData) => {      
      if (pokemonSelecionado.value.name) {
        const selecionadoAnteriormente = document.getElementById(`card-${pokemonSelecionado.value.name}`)
        if (!selecionadoAnteriormente) return

        selecionadoAnteriormente.style = 'transform: translate(0); z-index: 2;'

        if (pokemonSelecionado.value.name === pokemonData.name) {
          listWrapper.value.classList.remove('no-scroll')
          pokemonStore.clearSelectedPokemon()
          return
        }
      }

      pokemonStore.setSelectedPokemon(pokemonData)
      calcularPosicaoCentro()
      listWrapper.value.classList.add('no-scroll')
    }

    const calcularPosicaoCentro = ()=>  {
      if (!pokemonSelecionado.value.name) return

      const cardElement = document.getElementById(`card-${pokemonSelecionado.value.name}`)
      const cardDetalhes = document.getElementById('card-detalhes')
      const cardEvolucao = document.getElementById('card-evolucao')

      if (!cardElement) return

      var x       = cardElement.getBoundingClientRect().x
      var y       = cardElement.getBoundingClientRect().y
      var width   = cardElement.getBoundingClientRect().width
      var height  = cardElement.getBoundingClientRect().height
      var cx      = window.innerWidth / 2
      var cy      = window.innerHeight / 2
      var xVector = cx-(width/2)-x
      var yVector = cy-(height/2)-y

      cardElement.style = 'transform: translate('+xVector+'px,'+yVector+'px) scale(1.2);'
      
      if (cardDetalhes) {
        cardDetalhes.style.left = `${cx - cardElement.clientWidth * 1.7}px`
        cardDetalhes.style.top = `${cy - cardElement.clientHeight / 1.7}px`
      }

      if (cardEvolucao) {
        cardEvolucao.style.left = `${cx + cardElement.clientWidth / 1.42}px`
        cardEvolucao.style.top = `${cy - cardElement.clientHeight / 1.7}px`
      }
    }

    watch(() => searchText.value, () => {
      filtrarPokemons()
    })

    watch(() => searchType.value, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        offset.value = 0
        pokemonsEncontrados.value = []
      }
      listWrapper.value.scrollTo({ top: 0, behavior: 'smooth' })
      if (searchType.value) {
        listarPokemonsPorTipo()
      } else {
        listarPokemons()
        
      }
    })

    onMounted(() => {
      listarPokemons()

      listWrapper.value.addEventListener('scroll', handleScroll)
      window.addEventListener('resize', calcularPosicaoCentro)
    })

    onBeforeUnmount(() => {
      listWrapper.value.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', calcularPosicaoCentro)
    })

    return {
      listWrapper,
      pokemonsEncontrados,
      pokemonsFiltrados,
      searchText,
      searchType,
      pokemonSelecionado,
      semMaisPokemons,
      isLoading,
      selecionarPokemon
    }
  }
}
</script>

<style lang="sass" scoped>
#tela-listagem-pokemons
  width: 100%
  height: 100%
  margin-top: 16px

#search-wrapper
  padding-top: 10px
  padding-bottom: 10px
  display: flex
  .v-input
    margin-left: auto
    margin-right: auto
    width: 100%
    padding-left: 10px
    padding-right: 10px
    max-width: 600px
    

#list-wrapper
  height: calc(100vh - 129px)
  overflow-y: scroll

#pokemon-list 
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))
  gap: 20px
  padding: 20px

  @media (min-width: 1870px)
    margin-left: 250px
    margin-right: 250px
  @media (max-width: 1870px)
    margin-left: 100px
    margin-right: 100px

  @media (max-width: 1500px)
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

.overlay
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: rgba(0, 0, 0, 0.7)
  z-index: 2
  cursor: pointer

.card-detalhes
  margin-left: 20px
  flex-shrink: 0
  width: 300px
  max-width: 100%
</style>
