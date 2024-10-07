<template>
  <StylizedCard
    id="card-evolucao"
    paper
    color="red"
    :class="{'hidden' : !species || evolutionChain?.length <= 1}"
    @click="$emit('click')"
  >
    <h2
      v-if="species"
      class="text-center"
    >
      Cadeia de Evolução
    </h2>
    <div
      v-if="evolutionChain?.length >= 2"
      class="px-7 pb-2"
    >
      <div
        v-for="(evolution, index) in evolutionChain"
        :key="index"
        class="evolution-step"
      >
        <v-avatar
          :image="getSpriteUrl(evolution.url)"
          class="mx-auto"
          size="64"
          color="grey"
          style="outline: 3px #d2d2d2 solid"
        />
        <label class="mx-auto">{{ evolution.name }}</label>
        <v-icon
          v-if="index < evolutionChain.length - 1"
          class="mx-auto"
        >
          mdi-chevron-down
        </v-icon>
      </div>
    </div>
  </StylizedCard>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, inject, type PropType } from 'vue'

import type { EvolutionChain, PokemonSpecies } from '@/utils/PokemonData'

import StylizedCard from './StylizedCard.vue'
import CriarApi from '@/api/index'


interface ShowSnackbar {
  (message: string, color?: string, timeout?: number): void;
}

export default defineComponent({
  name: 'CardEvolucao',
  components: {
    StylizedCard
  },
  
  props: {
    species: {
      type: Object as PropType<PokemonSpecies | null>,
      required: false,
      default: null,
    },
  },

  emits: ['click'],
  setup(props) {
    const ShowSnackbar = inject<ShowSnackbar>('showSnackbar')

    const api = CriarApi()
    const evolutionRaw = ref<object | null>(null)
    const evolutionChain = ref<PokemonSpecies[]>([])

    const carregarEvolucao = async () => {
      // que função feia, meu Deus!
      if (props.species) {
        try {
          const speciesResp = await api.get(props.species.url)
          const evolutionChainUrl = speciesResp.data.evolution_chain.url

          const evolutionResp = await api.get(evolutionChainUrl)
          evolutionRaw.value = evolutionResp.data
          if (evolutionRaw.value?.id) {
            formatarEvolucao()
          }
        } catch (error) {
          ShowSnackbar('Não foi possível carregar a cadeia de evolução', 'red', 2000)
          console.error('Erro ao buscar a cadeia de evolução:', error)
        }
      }
    }

    const iterarEvolucao = (chainNode: EvolutionChain): PokemonSpecies[] => {
      const evolution: PokemonSpecies[] = []
      
      let currentChain = chainNode
      while (currentChain) {
        evolution.push(currentChain.species)
        currentChain = currentChain.evolves_to[0]
      }

      return evolution
    }

    const formatarEvolucao = () => {
      const evolution = iterarEvolucao(evolutionRaw.value.chain)

      evolutionChain.value = evolution
    }

    const getSpriteUrl = (url: string) => {
      if (!url) return null

      const parts = url.split('/').filter(Boolean)
      const idSpecie = parts[parts.length - 1]

      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idSpecie}.png`
    }

    onMounted(() => {
      carregarEvolucao()
    })

    watch(() => props.species, () => {
      if (props.species) {
        carregarEvolucao()
      } else {
        evolutionChain.value = []
      }
      
    })

    return {
      evolutionRaw,
      evolutionChain,
      getSpriteUrl
    }
  },
})
</script>

<style scoped lang="sass">
#card-evolucao
  position: absolute
  z-index: 2
  visibility: visible
  width: 250px
  transition: visibility 0.5s ease-in

.hidden
  transition: visibility 0s ease-in !important
  visibility: hidden !important

.evolution-step
  display: flex
  flex-direction: column
  label
    font-weight: bold
    font-size: 0.9rem
  span
    font-size: 1.2rem
    font-weight: bold
</style>
