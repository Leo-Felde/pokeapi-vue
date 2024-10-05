<template>
  <StylizedCard
    id="card-evolucao"
    paper
    color="red"
    :class="{'hidden' : !species}"
  >
    <h2
      v-if="species"
      class="text-center"
    >
      Cadeia de Evolução
    </h2>
    <div class="px-7 pb-2">
      <div
        v-for="(pokemon, index) in evolutionNames"
        :key="index"
        class="evolution-step"
      >
        <label>{{ pokemon }}</label>
        <span v-if="index < evolutionNames.length - 1"> → </span>
      </div>
    </div>
  </StylizedCard>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, inject, type PropType } from 'vue'

import type { PokemonSpecies } from '@/utils/PokemonData'

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

  setup(props) {
    const ShowSnackbar = inject<ShowSnackbar>('showSnackbar')

    const api = CriarApi()
    const evolutionChain = ref<object | null>(null)
    const evolutionNames = ref<string[]>([])

    const fetchEvolutionChainUrl = async () => {
      // que função feia, meu Deus!
      if (props.species) {
        try {
          const speciesResp = await api.get(props.species.url)
          const evolutionChainUrl = speciesResp.data.evolution_chain.url

          const evolutionResp = await api.get(evolutionChainUrl)
          evolutionChain.value = evolutionResp.data
          formatarNomeEvolucao(evolutionResp.data.chain)
        } catch (error) {
          ShowSnackbar('Não foi possível carregar a cadeia de evolução', 'red', 2000)
          console.error('Erro ao buscar a cadeia de evolução:', error)
        }
      }
    }

    const formatarNomeEvolucao = (chain: any) => {
      const names = []
      let currentChain = chain
      while (currentChain) {
        names.push(currentChain.species.name)
        currentChain = currentChain.evolves_to[0]
      }
      evolutionNames.value = names
    }

    onMounted(() => {
      fetchEvolutionChainUrl()
    })

    watch(() => props.species, fetchEvolutionChainUrl)

    return {
      evolutionChain,
      evolutionNames,
    }
  },
})
</script>

<style scoped lang="sass">
#card-evolucao
  position: absolute
  z-index: 2
  opacity: 100%
  width: 250px
  transition: opacity 0.5s eat-out

.hidden
  transition: opacity 0s ease-in
  opacity: 0% !important

.evolution-step
  label
    font-weight: bold
    font-size: 0.9rem
  span
    font-size: 1.2rem
    font-weight: bold
</style>
