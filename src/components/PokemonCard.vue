<template>
  <div
    class="poke-card"
    @mousemove="handleMouseMove"
    @mouseleave="resetTilt"
    @click="$emit('selecionarPokemon', pokemonData)"
  >
    <div
      class="card-inner"
      :class="{'dark-card' : pokemonType === 'dark'}"
      :style="cardStyle"
    >
      <div
        class="glare"
        :style="glareStyle"
      />
      <div
        ref="cardFront"
        class="card-front"
      >
        <div
          v-if="loaded && pokemonData"
          class="d-flex-column card-wrapper"
        >
          <div class="card-top"> 
            <div class="rarity-badge">
              BASIC
            </div>
            <span class="pokemon-name">
              {{ pokemonData.name }}
            </span>
            <div class="health-points">
              <span class="hp-label">
                HP
              </span>
              <span class="hp-value">
                {{ pokemonData.stats[0].base_stat }}
              </span>
            </div>
          
            <div class="type-icons">
              <img
                :src="getTypeIcon(0)"
                :class="{ 'active': activeIndex === 0 && pokemonData.types.length > 1}"
                @click="toggleTypes"
              >
              <img
                v-if="pokemonData.types.length > 1"
                :src="getTypeIcon(1)"
                class="secondary"
                :class="{ 'active': activeIndex === 1 }"
                @click="toggleTypes"
              >
            </div>
          </div>
          <div class="card-sprite">
            <img :src="pokemonData.sprites.other['official-artwork'].front_default">
          </div>
          <div class="card-ability">
            <div class="ability-label">
              Ability
            </div>
            <span class="ability-name">
              {{ pokemonData.abilities[0].ability.name }}
            </span>
          </div>
          <div class="card-moves">
            <div class="move-icon">
              <img
                :src="getTypeIcon(0)"
                class="secondary"
              >
            </div>
            <span class="move-name">
              {{ pokemonData.moves[0].move.name }}
            </span>
            <span class="move-power">
              10
              <!-- Não possui essa informação, portanto deixa deixa o valor fixo :( -->
            </span>
          </div>
          <div class="card-details">
            <div class="details-weakness">
              <label class="weakness-label">weakness</label>
              <img
                v-for="(type, i) in pokemonTypeWeaknesses[pokemonType]"
                :key="`${pokemonData.name}-weakness-${i}`"
                :src="getTypeUrl(type)"
                class="weakness-icon"
              >
            </div>
            <div class="details-retreat">
              <label class="retreat-label">retreat</label>
              <img
                src="@/assets/img/energy.png"
                class="retreat-icon"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, type PropType, onMounted, inject  } from 'vue'

import { pokemonTypeColors, pokemonTypeWeaknesses } from '@/utils/PokemonTypes'
import type { PokemonData } from '@/utils/PokemonData'

import CriarApi from '../api/index'

interface pokemonMin {
  name: string;
  url: string;
}

interface ShowSnackbar {
  (message: string, color?: string, timeout?: number): void;
}

export default {
  name: 'PlayingCard',

  props: {
    pokemon: {
      type: Object as PropType<pokemonMin>,
      required: true,
      validator(value: pokemonMin) {
        return (
          value.name.trim().length > 0 &&
          value.url.trim().length > 0 
        )
      }
    }
  },

  emits: ['selecionarPokemon'],
  setup(props) {
    const showSnackbar = inject<ShowSnackbar>('showSnackbar')

    const cardFront = ref()

    const api = CriarApi()
    const pokemonData = ref<PokemonData>()

    const loaded = ref<boolean>(false)
    const pokemonType = ref<string>('normal')
    const activeIndex = ref<number>(0)

    const tiltX = ref<number>(0)
    const tiltY = ref<number>(0)
    const glareX = ref<number>(50)
    const glareY = ref<number>(50)
    const glareVisible = ref<number>(0)


    onMounted(() => {
      if (!props.pokemon?.name) return

      getPokemonData()
    })

    const getPokemonData = async () => {
      try {
        const resp: pokemonData = await api.get(`/pokemon/${[props.pokemon.name]}`)

        pokemonData.value = resp.data
        loaded.value = true
        pokemonType.value = pokemonData.value?.types[0]?.type?.name

        getTypeBackground()

        setTimeout(() => {
          getSpriteBGColor()
        }, 200)
      } catch (err) {
        if (showSnackbar) {
          showSnackbar('Não foi possível carregar as informações do pokemon', 'red', 2000)
        }
        console.error('Não foi possível carregar as informações do pokemon', err)
      }
    }

    const getTypeBackground = () => {
      const type = pokemonType.value
      const url = new URL(`../assets/img/${type}.png`, import.meta.url).href
      
      cardFront.value.style['background-image'] = `url(${url})`
    }

    const getTypeIcon = (index: number) => {
      const type = pokemonData.value.types[index]?.type?.name
      return getTypeUrl(type)
    }

    const getTypeUrl = (type: string) => {
      const url = new URL(`../assets/img/icon-${type}.png`, import.meta.url).href
      return url
    }

    const toggleTypes = () => {
      activeIndex.value = activeIndex.value === 0 ? 1 : 0
    }

    const getSpriteBGColor = () => {
      const colors = pokemonTypeColors[pokemonType.value]
      cardFront.value.children[0].children[1].style['background'] = `radial-gradient(circle, ${colors.accent} 0%, ${colors.primary} 100%)`
    }

    const handleMouseMove = (e) => {
      const card = e.currentTarget
      const rect = card.getBoundingClientRect()
      const cardCenterX = rect.left + rect.width / 2
      const cardCenterY = rect.top + rect.height / 2

      // sensibilidade do tilt, quanto menor o valor mais sensível
      const sensiModifier = 10
      tiltX.value = (e.clientY - cardCenterY) / sensiModifier
      tiltY.value = (e.clientX - cardCenterX) / sensiModifier

      const relativeX = ((e.clientX - rect.left) / rect.width) * 100
      const relativeY = ((e.clientY - rect.top) / rect.height) * 100
      glareX.value = relativeX
      glareY.value = relativeY

      glareVisible.value = 1
    }

    const resetTilt = () => {
      glareVisible.value = 0

      tiltX.value = 0
      tiltY.value = 0
      glareX.value = -100
      glareY.value = -100
    }

    const cardStyle = computed(() => ({
      transform: `rotateX(${tiltX.value}deg) rotateY(${tiltY.value}deg)`,
    }))

    const glareStyle = computed(() => ({
      opacity: glareVisible.value,
      background: `radial-gradient(circle at ${glareX.value}% ${glareY.value}%, rgba(255, 255, 255, 0.4), transparent 60%)`,
    }))

    return {
      cardFront,
      pokemonTypeWeaknesses,
      pokemonData,
      activeIndex,
      pokemonType,
      loaded,
      handleMouseMove,
      resetTilt,
      cardStyle,
      glareStyle,
      getTypeIcon,
      getTypeUrl,
      toggleTypes
    }
  },
}
</script>

<style lang="sass" scoped>

.rarity-badge
  font-size: 0.7rem
  background: linear-gradient(0deg, rgba(214,214,214,1) 0%, rgba(255,255,255,1) 50%, rgba(209,209,209,1) 100%)
  border-radius: 5px
  width: fit-content
  padding-left: 5px
  padding-right: 5px
  position: absolute
  top: 5px
  left: -5px

.type-icons
  position: absolute
  right: 5px
  top: 5px
  display: flex
  img
    width: 25px
    transition: transform 0.2s ease

  img.active
    transform: scale(1.15)
    box-shadow: -2px 2px 4px 0px rgb(106, 106, 106)
    border-radius: 50%
    &:hover
      cursor: pointer

  img.secondary
    margin-left: -33px

.health-points
  position: absolute
  right: 35px
  top: 2px
  .hp-label
    font-size: 0.8rem
    font-weight: bold
    letter-spacing: -1px

  .hp-value
    font-weight: bold
    letter-spacing: 0.2px

.poke-card
  width: 250px
  height: 350px
  perspective: 1000px
  user-select: none
  cursor: pointer

  .card-inner 
    width: 100%
    height: 100%
    position: relative
    transform-style: preserve-3d
    transition: transform 0.3s ease, box-shadow 0.3s ease
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3)
    border-radius: 10px
    overflow: hidden
    &.dark-card span
      color: white !important
    
    &:hover 
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4)

    .glare 
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      pointer-events: none
      z-index: 2
      transition: opacity 0.3s ease, background 0.1s ease
      opacity: 0

    .card-front,
    .card-back 
      width: 100%
      height: 100%
      position: absolute
      backface-visibility: hidden
      display: flex
      justify-content: center
      align-items: center
      font-size: 24px
      border-radius: 10px
    .card-front
      background-color: rgb(202, 202, 202)
      color: #000
      z-index: 1
      border: #FFE163 6px solid

    .card-back 
      background-color: #ff4d4d
      color: #fff
      transform: rotateY(180deg)
      z-index: 1

  .card
    &-wrapper
      height: 100%
      width: 100%
    &-top
      height: 12%
      .pokemon-name
        font-size: 1.1rem
        font-weight: 510
        text-transform: capitalize
        padding-left: 44px

    &-sprite
      heigh: 50%
      display: flex
      outline: 3px solid white
      margin-left: 15px
      margin-right: 15px
      background: #fefefe
      img
        width: 110px
        margin-left: auto
        margin-right: auto

    &-ability
      margin: 10px
      font-weight: bold
      display: flex
      .ability-label
        background: linear-gradient(0deg, rgba(156,18,18,1) 0%, rgba(212,58,58,1) 50%, rgba(191,25,25,1) 100%)
        color: white
        font-size: 1rem
        height: 23px
        padding-left: 15px
        padding-right: 18px
        margin-bottom: auto
        margin-top: auto
        border-top-left-radius: 75px
        border-bottom-left-radius: 29px
        border-top-right-radius: 27px
        border-bottom-right-radius: 75px
        box-shadow: -5px 0px 0px 0px white, 5px 0px 0px 0px white
      .ability-name
        color: #ce1313
        margin-left: 8px
        margin-bottom: auto
        margin-top: auto
        font-size: 1.2rem

    &-moves
      display: flex
      justify-content: space-around
      font-size: 1rem
      font-weight: bold
      height: 30%
      .move-icon img
        width: 25px
    &-details
      background: linear-gradient(0deg, rgba(214,214,214,1) 0%, rgba(255,255,255,1) 50%, rgba(209,209,209,1) 100%)
      border-top-left-radius: 75px
      border-bottom-left-radius: 29px
      padding-left: 7px
      display: flex
      justify-content: space-between 
      .details-weakness
        display: flex
      .details-retreat
        display: flex
        margin-right: 20px
      .weakness-label, .retreat-label
        font-size: 0.8rem
        font-weight: 510
        margin-right: 2px
      .weakness-icon, .retreat-icon
        width: 15px
        height: 15px
        margin-top: auto
        margin-bottom: auto
        margin-right: 2px
</style>
