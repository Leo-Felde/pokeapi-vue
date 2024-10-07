<template>
  <StylizedCard
    id="card-detalhes"
    paper
    color="blue"
    :class="{'hidden' : !stats.length}"
    @click="$emit('click')"
  >
    <h2
      v-if="stats.length"
      class="text-center"
    >
      Stats
    </h2>
    <div class="px-7 pb-2">
      <div
        v-for="statData in stats"
        :key="statData.stat.name"
        class="stats-data"
      >
        <label>{{ formatStatName(statData.stat.name) }}</label>
        <v-progress-linear
          :model-value="statData.base_stat"
          color="blue"
          height="12"
          min="0"
          max="100"
        >
          <span>{{ statData.base_stat }}</span>
        </v-progress-linear>
      </div>
    </div>
  </StylizedCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import type { PokemonStat } from '@/utils/PokemonData'
import StylizedCard from './StylizedCard.vue'

export default defineComponent({
  name: 'CardDetalhes',
  
  components: {
    StylizedCard
  },

  props: {
    stats: {
      type: Array<PokemonStat>,
      default: () => ([]),
    },
  },

  emits: ['click'],
  setup () {
    const formatStatName = (statName: string) => {
      return statName.charAt(0).toUpperCase() + statName.slice(1).replace('-', ' ')
    }

    return {
      formatStatName
    }
  }
})
</script>

<style scoped lang="sass">
#card-detalhes
  position: absolute
  z-index: 2
  visibility: visible
  width: 250px
  transition: visibility 0.5s eat-out
  height: fit-content
.hidden
  transition: visibility 0s ease-in !important
  visibility: hidden !important

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
