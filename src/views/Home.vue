<template>
  <div class="home-container mx-auto">
    <main class="main-content">
      <div>
        <p>
          Bem-vindo ao pokecards, uma implementação da <a
            href="https://pokeapi.co/"
            target="_blank"
          >PokeAPI v2</a> 
          para exibir cartas de Pokémon Trading Card Game
        </p>
        <div class="actions">
          <StylizedButton
            color="blue"
            :to="{ name: 'ListaPokemons' }"
          >
            Ver Lista de Cartas
          </StylizedButton>
          <h3>ou</h3>
          <v-text-field
            v-model="searchQuery"
            label="Pesquise por um pokemon"
            @input="onInput"
            @keydown.enter="onEnter"
          >
            <template #details>
              <span v-if="loading">🔄 Carregando...</span>
              <span v-else-if="isFound === true">✔️ Pokémon encontrado!</span>
              <span v-else-if="isFound === false && searchQuery.length > 0">❌ Pokémon não encontrado!</span>
              <span v-else>
                Nome completo ou id
              </span>
            </template>
          </v-text-field>
        </div>
      </div>
      <img
        v-if="mdAndUp"
        src="/icon.png"
        alt="Pokémon Cards"
        class="logo-img"
      >
    </main>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

import CriarApi from '@/api/index'

import StylizedButton from '@/components/StylizedButton.vue'

export default {
  name: 'Home',

  components: {
    StylizedButton
  },

  setup() {
    const router = useRouter()

    const { mdAndUp } = useDisplay()
    const api = CriarApi()

    const searchQuery = ref<string | null>('')
    const isFound = ref<boolean | null>(null)
    const loading = ref<boolean>(false)

    const onInput = async () => {
      if (searchQuery.value.length < 1) {
        isFound.value = null
        return
      }

      loading.value = true
      isFound.value = null

      try {
        await api.get(`/pokemon/${searchQuery.value}`)
        isFound.value = true
      } catch (error) {
        if (error.response && error.response.status === 404) {
          isFound.value = false
        } else {
          console.error(error)
        }
      } finally {
        loading.value = false
      }
    }

    const onEnter = () => {
      if (!isFound.value) return

      router.push({ path: `/pokemons/${searchQuery.value}` })
    }

    return {
      mdAndUp,
      searchQuery,
      isFound,
      loading,
      onInput,
      onEnter
    }
  }
}
</script>

<style lang="sass" scoped>
.home-container 
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  padding: 2rem
  text-align: center

.header h1
  font-size: 2.5rem
  margin-bottom: 1rem

.header p 
  font-size: 1.2rem
  margin-bottom: 2rem
  max-width: 800px

.main-content 
  display: flex
  align-items: center

.logo-img 
  width: 100%
  max-width: 600px
  height: auto
  margin-bottom: 2rem

p 
  font-size: 1.1rem
  margin-bottom: 1.5rem
  max-width: 600px

a 
  color: #3b82f6
  text-decoration: none

a:hover
  text-decoration: underline

.actions
  display: flex
  flex-direction: column
  h3
    text-align: center
    margin-top: 3px
    margin-bottom: 3px
</style>
