<template>
  <div class="home-container mx-auto">
    <main class="main-content">
      <div>
        <p>
          Bem-vindo ao pokecards, uma implementação da <a
            href="https://pokeapi.co/"
            target="_blank"
          >PokeAPI v2</a> 
          para criar cartas de Pokémon Trading Card Game
        </p>
        <StylizedButton
          color="blue"
          @click="goToCardsList"
        >
          Ver Lista de Cartas
        </StylizedButton>
      </div>
      <img
        src="/icon.png"
        alt="Pokémon Cards"
        class="logo-img"
      >
    </main>
  </div>
</template>

<script>
import StylizedButton from '@/components/StylizedButton.vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Home',

  components: {
    StylizedButton
  },
  setup() {
    const router = useRouter()
    const goToCardsList = () => {
      router.push({ name: 'ListaPokemons' })
    }

    return {
      goToCardsList
    }
  }
}
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.header p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 800px;
}

.main-content {
  display: flex;
  align-items: center;
}

.logo-img {
  width: 100%;
  max-width: 600px;
  height: auto;
  margin-bottom: 2rem;
}

p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  max-width: 600px;
}

a {
  color: #3b82f6;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
