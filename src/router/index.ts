import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/Home.vue';
import ListaPokemons from '@/views/pokemon/index.vue';

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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
