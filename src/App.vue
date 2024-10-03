<template>
  <v-app>
    <Snackbar />

    <v-layout>
      <AppBar />

      <v-main class="d-flex">
        <Pokemons />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script lang="ts">
import AppBar from '@/components/AppBar.vue'
import Pokemons from '@/pages/Pokemons.vue'
import Snackbar from '@/components/Snackbar.vue'

export default {
  name: 'App',

  components: {
    AppBar,
    Pokemons,
    Snackbar
  }
}
</script>
