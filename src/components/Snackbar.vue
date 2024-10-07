<template>
  <div v-if="snackbar">
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
      location="top right"
    >
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'

interface Snackbar {
  show: boolean;
  message: string;
  color: string;
  timeout: number;
}

const snackbar = inject<Snackbar>('snackbar')
</script>
