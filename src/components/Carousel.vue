<template>
  <div
    class="carousel"
    :class="{'hidden' : !show}"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <div
      id="slide-left"
      class="slide"
      :style="getStyle(0)"
      @click="onSlideClick(0)"
    >
      <slot name="left" />
    </div>

    <div
      id="slide-center"
      class="slide"
      :style="getStyle(1)"
      @click="onSlideClick(1)"
    >
      <slot name="center" />
    </div>

    <div
      id="slide-right"
      class="slide"
      :style="getStyle(2)"
      @click="onSlideClick(2)"
    >
      <slot name="right" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType, watch } from 'vue'

export default defineComponent({
  name: 'SlideComponent',
  props: {
    show: {
      type: Boolean as PropType<boolean | null>,
      default: false
    }
  },

  setup (props) {
    const currentSlide = ref<number>(1)
    const touchStartX = ref<number | null>(null)
    const touchEndX = ref<number | null>(null)

    const handleSwipe = () => {
      if (touchStartX.value !== null && touchEndX.value !== null) {
        const deltaX = touchEndX.value - touchStartX.value
        if (deltaX > 50) {
          // Arrastar para a direita (slide anterior)
          currentSlide.value = currentSlide.value === 0 ? 2 : currentSlide.value - 1
        } else if (deltaX < -50) {
          // Arrastar para a esquerda (próximo slide)
          currentSlide.value = currentSlide.value === 2 ? 0 : currentSlide.value + 1
        }
      }
    }

    const onTouchStart = (event: TouchEvent) => {
      touchStartX.value = event.touches[0].clientX
    }

    const onTouchMove = (event: TouchEvent) => {
      touchEndX.value = event.touches[0].clientX
    }

    const onTouchEnd = () => {
      handleSwipe()
      touchStartX.value = null
      touchEndX.value = null
    }

    const getStyle = (index: number): { transform: string } => {
      const screenWidth = window.innerWidth
      const elementWidth = 250 // largura dos cards
      const gutter = 75 // espaço minimio entre os slides

      const positions = {
        0: `translateX(-${(elementWidth / 2) + gutter}px)`, // esquerda
        1: 'translateX(calc(50vw - 50%))', // centro
        2: `translateX(${(screenWidth - (elementWidth / 2)) + gutter}px)`, // direita
        hidden: `translateX(${screenWidth + 200}px)`,
      }

      if (currentSlide.value === 1) {
        return index === 0
          ? { transform: positions[0] }
          : index === 1
            ? { transform: positions[1] }
            : { transform: positions[2] }
      } else if (currentSlide.value === 0) {
        return index === 0
          ? { transform: positions[1] }
          : index === 1
            ? { transform: positions[2] }
            : { transform: positions.hidden }
      } else {
        return index === 0
          ? { transform: positions.hidden }
          : index === 1
            ? { transform: positions[0] }
            : { transform: positions[1] }
      }
    }

    const onSlideClick = (index: number) => {
      currentSlide.value = index
    }

    watch(() => props.show, () => {
      currentSlide.value = 1
    })

    return {
      currentSlide,
      getStyle,
      onSlideClick,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    }
  }
})
</script>

<style scoped lang="sass">
.carousel
  position: absolute
  top: 25%
  height: 370px
  width: 100vw
  overflow: hidden
  z-index: 3
  visibility: visible
  &.hidden
    visibility: hidden !important

.slide 
  position: absolute
  width: 250px
  height: 100%
  display: flex
  justify-content: center
  align-items: center
  transition: transform 0.5s ease
  cursor: pointer

#slide-left, #slide-right
  z-index: 1
#slide-center
  z-index: 2 !important
</style>
