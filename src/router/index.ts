import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/Home.vue';
import ListaPokemons from '@/views/pokemon/index.vue';
import PesquisaPokemon from '@/views/pokemon/Pesquisa.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/pokemons',
    name: 'ListaPokemons',
    component: ListaPokemons,
  },
  {
    path: '/pokemons/:query',
    name: 'PesquisaPokemon',
    component: PesquisaPokemon,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
