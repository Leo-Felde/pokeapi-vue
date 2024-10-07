import { fileURLToPath, URL } from 'node:url'
import * as PokemonData from './srcutils/PokemonData.ts'
import * as PokemonTypes from './srcutils/PokemonTypes.ts'
import * as Functions from './srcutils/Functions.ts'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
