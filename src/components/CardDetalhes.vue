<template>
  <StylizedCard
    id="card-detalhes"
    paper
    color="yellow"
    :class="{'hidden' : !pokemon.name}"
  >
    <h2 class="text-center">
      Stats
    </h2>
    <div
      v-if="pokemon.stats"
      class="px-7 pb-2"
    >
      <div
        v-for="(stat) in pokemon.stats"
        :key="stat.stat.name"
        class="stats-data"
      >
        <label>{{ formatStatName(stat.stat.name) }}</label>
        <v-progress-linear
          :model-value="stat.base_stat"
          color="blue"
          height="12"
          min="0"
          max="100"
        >
          <span>{{ stat.base_stat }}</span>
        </v-progress-linear>
      </div>
    </div>
  </StylizedCard>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { PokemonData } from '@/utils/PokemonData'
import StylizedCard from './StylizedCard.vue'

export default defineComponent({
  name: 'PokemonDetails',
  
  components: {
    StylizedCard
  },

  props: {
    pokemon: {
      type: Object as PropType<PokemonData>,
      default: () => ({}),
    },
  },

  methods: {
    formatStatName(statName: string): string {
      return statName.charAt(0).toUpperCase() + statName.slice(1).replace('-', ' ')
    },
  },
})
</script>

<style scoped lang="sass">
#card-detalhes
  position: absolute
  z-index: 2
  transition: opacity 0.5s ease
  opacity: 100%
  width: 250px
.hidden
  opacity: 0% !important


.stats-data
  label
    font-weight: bold
    width: 20%
    font-size: 0.9rem
  .v-progress-linear
    width: 100%
    span
      font-size: 0.7rem
      font-weight: bold

</style>
