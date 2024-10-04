<template>
  <div
    id="list-wrapper"
    ref="listWrapper"
  >
    <div
      v-if="pokemonsEncontrados.length"
      id="pokemon-list"
    >
      <PokemonCard
        v-for="pokemon in pokemonsEncontrados"
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
      v-if="pokemonSelecionado.name" 
      class="overlay" 
      @click="selecionarPokemon(pokemonSelecionado)" 
    />

    <CardDetalhes :pokemon="pokemonSelecionado" />
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount, inject, computed } from 'vue'
import { usePokemonStore } from '@/stores/PokemonStore'

import CriarApi from '@/api/index'

import type { PokemonData } from '@/utils/PokemonData'

import PokemonCard from '@/components/PokemonCard.vue'
import CardDetalhes from '@/components/CardDetalhes.vue'

interface ShowSnackbar {
  (message: string, color?: string, timeout?: number): void;
}

export default {
  name: 'App',

  components: {
    PokemonCard,
    CardDetalhes
  },

  setup() {
    const showSnackbar = inject<ShowSnackbar>('showSnackbar')
    
    const pokemonStore = usePokemonStore()

    const listWrapper = ref()

    const api = CriarApi()
    
    const pokemonsEncontrados = ref([])
    const limit = ref(20)
    const offset = ref(0)
    const semMaisPokemons = ref(false)
    const isLoading = ref(false)

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

      if (!cardElement || !cardDetalhes) return

      var x       = cardElement.getBoundingClientRect().x
      var y       = cardElement.getBoundingClientRect().y
      var width   = cardElement.getBoundingClientRect().width
      var height  = cardElement.getBoundingClientRect().height
      var cx      = window.innerWidth / 2
      var cy      = window.innerHeight / 2
      var xVector = cx-(width/2)-x
      var yVector = cy-(height/2)-y

      cardElement.style = 'transform: translate('+xVector+'px,'+yVector+'px) scale(1.2);'
      
      cardDetalhes.style.left = `${cx + cardElement.clientWidth}px`
      cardDetalhes.style.top = `${cy - cardElement.clientHeight / 2}px`
    }

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
      pokemonSelecionado,
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
  padding-top: 5px
  margin-top: 10px
  height: calc(100vh - 60px)
  overflow-y: scroll

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
