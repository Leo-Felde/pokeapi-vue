<template>
  <div
    id="tela-pesquisa-pokemons"
    class="mt-7 d-flex"
  >
    <div
      v-if="pokemonEncontrado"
      class="justify-center mx-auto pesquisa-wrapper"
      :class="mdAndUp ? 'd-flex' : 'd-flex-column'"
    >
      <CardDetalhes
        :stats="pokemonEncontrado.stats"
        class="mx-auto"
      />
      
      <div class="mx-auto px-7 py-7">
        <PokemonCard
          :pokemon="pokemonEncontrado"
        />
      </div>

      <CardEvolucao
        :species="pokemonEncontrado.species"
        class="mx-auto"
      />
    </div>
    <div v-else>
      Nenhum pokemon encontrado, <a to="/"> voltar a lista </a>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'

import type { PokemonData } from '@/utils/PokemonData'
import CriarApi from '@/api/index'

import PokemonCard from '../../components/PokemonCard.vue'
import CardDetalhes from '@/components/CardDetalhes.vue'
import CardEvolucao from '@/components/CardEvolucao.vue'

export default {
  components: {
    PokemonCard,
    CardDetalhes,
    CardEvolucao
  },

  setup () {
    const route = useRoute()
    const { mdAndUp } = useDisplay()
    const api = CriarApi()

    const pokemonEncontrado = ref<PokemonData>()
    const loading = ref<boolean>(false)

    onMounted(() => {
      if (route.params.query) {
        getPokemon()
      }
    })

    const getPokemon = async () => {
      loading.value = true

      try {
        const resp = await api.get(`/pokemon/${route.params.query}`)
        console.log(resp)
        pokemonEncontrado.value = resp.data
      } catch (error: any) {
        console.error('não foi possível carregar o pokemon', error)
      } finally {
        loading.value = false
      }
    }

    return {
      mdAndUp,
      pokemonEncontrado
    }
  }
}
</script>

<style lang="sass" scoped>
#tela-pesquisa-pokemons
  width: 100%
  height: 100vh
  overflow: auto !important
  margin-bottom: 20px

// .pesquisa-wrapper
//   height: 100%
//   overflow-x: auto

#card-detalhes, #card-evolucao
  position: relative !important
  left: 0p
  top: 0px

</style>
