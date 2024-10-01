<template>
  <v-card
    :class="`stylized-card ${cardClasses}`"
    tile
    :height="height"
    :width="width"
  >
    <div
      v-for="n in 4"
      v-show="!noBorders"
      :id="borderDecoId(n)"
      :key="n"
    />
    <div
      v-for="n in 2"
      v-show="!noDeco && isPaper"
      :id="`paper-inner-deco-${n}`"
      :key="`inner-${n}`"
    />
    <slot />
  </v-card>
</template>

<script>
import { computed, toRefs } from 'vue'

export default {
  props: {
    pointer: Boolean,
    black: Boolean,
    brown: Boolean,
    light: Boolean,
    brownLight: Boolean,
    brownDark: Boolean,
    paper: Boolean,
    noBorders: Boolean,
    noDeco: Boolean,
    height: { type: String, default: null },
    width: { type: String, default: null },
    contentClass: { type: String, default: null },
    color: { type: String, default: 'black' }
  },

  setup (props) {
    const {
      black,
      brown,
      light,
      brownLight,
      brownDark,
      paper,
      contentClass,
      color
    } = toRefs(props)

    const cardClasses = computed(() => {
      const baseClass = black.value
        ? 'black white--text'
        : brown.value
          ? 'brown'
          : brownLight.value
            ? 'brownLight'
            : brownDark.value
              ? 'brownDark'
              : light.value
                ? 'light'
                : paper.value
                  ? `paper-${color.value}`
                  : ''

      return `${baseClass} ${contentClass.value || ''}`
    })

    const isPaper = computed(() => paper.value)

    const borderDecoId = (index) => {
      const prefix = black.value
        ? 'black-border-deco'
        : brown.value
          ? 'brown-border-deco'
          : brownLight.value
            ? 'lbrown-border-deco'
            : brownDark.value
              ? 'dbrown-border-deco'
              : light.value
                ? 'light-border-deco'
                : paper.value
                  ? 'paper-border-deco'
                  : ''

      return `${prefix}-${index}`
    }

    return {
      cardClasses,
      isPaper,
      borderDecoId
    }
  }
}
</script>
<style lang="sass" scoped>
@mixin border-color($color)
  border: solid 3px #{$color}

@mixin shadow-color($color)
  box-shadow: 3px 3px 0 0 #{$color}, 6px 3px 0 0 #{$color}, 9px 3px 0 0 #{$color}, 3px 6px 0 0 #{$color}, 9px 6px 0 0 #{$color}, 3px 9px 0 0 #{$color}, 6px 9px 0 0 #{$color}
  height: 3px
  width: 3px

.stylized-card
  position: relative

.paper
  background: #fbf2eb
  border: 3px solid
  $height: -6px
  $width: -6px
  overflow: unset
  #paper-border-deco
    position: absolute
    &-1
      @extend #paper-border-deco
      left: $width
      top: $height
    &-2
      @extend #paper-border-deco
      right: $width
      top: $height
      -webkit-transform: scaleX(-1)
      transform: scaleX(-1)
    &-3
      @extend #paper-border-deco
      left: $width
      bottom: $height
      -webkit-transform: scaleX(-1) rotate(180deg)
      transform: scaleX(-1) rotate(180deg)
    &-4
      @extend #paper-border-deco
      right: $width
      bottom: $height
      -webkit-transform: rotate(180deg)
      transform: rotate(180deg)
  #paper-inner-deco
    background: #fbf2eb
    position: absolute
    height: 75%
    width: 3px
    top: 13%
    &-1
      @extend #paper-inner-deco
      left: -3px
    &-2
      @extend #paper-inner-deco
      right: -3px
  &-blue
    @extend .paper
    @include border-color("#657baa")
    #paper-border-deco
      @include shadow-color("#657baa")
  &-red
    @extend .paper
    @include border-color("#b95f5f")
    #paper-border-deco
      @include shadow-color("#b95f5f")
  &-yellow
    @extend .paper
    @include border-color("#e1b35d")
    #paper-border-deco
      @include shadow-color("#e1b35d")
  &-black
    @extend .paper
    @include border-color("#222034")
    #paper-border-deco
      @include shadow-color("#222034")
  &-green
    @extend .paper
    @include border-color("#37946e")
    #paper-border-deco
      @include shadow-color("#37946e")

.v-card.black
  background: #353540 !important
  outline: 3px solid white !important
  $height: 0px
  $width: 16px
  #black-border-deco
    position: absolute
    box-shadow: 3px 3px 0 0 rgba(99,97,103,255), 6px 3px 0 0 rgba(99,97,103,255), 9px 3px 0 0 rgba(99,97,103,255), 12px 6px 0 0 rgba(99,97,103,255), 12px 9px 0 0 rgba(99,97,103,255), 12px 12px 0 0 rgba(99,97,103,255)
    height: 3px
    width: 3px
    &-1
      @extend #black-border-deco
      left: $width
      top: $height
      -webkit-transform: scaleX(-1)
      transform: scaleX(-1)
    &-2
      @extend #black-border-deco
      right: $width
      top: $height
    &-3
      @extend #black-border-deco
      left: $width
      bottom: $height
      -webkit-transform: rotate(180deg)
      transform: rotate(180deg)
    &-4
      @extend #black-border-deco
      right: $width
      bottom: $height
      -webkit-transform: scaleX(-1) rotate(180deg)
      transform: scaleX(-1) rotate(180deg)

.v-card.brown
  outline: 3px solid white !important
  box-shadow: 0px 0px 0px 3px #353540 inset, 0px 0px 0px 6px #a88b79 inset !important
  background-color: #bdaa97 !important
  padding: 4px 4px 4px 4px
  $height: -6px
  $width: 24px
  #brown-border-deco
    position: absolute
    box-shadow: 3px 3px 0 0 rgba(255,255,255,255), 6px 3px 0 0 rgba(255,255,255,255), 9px 3px 0 0 rgba(255,255,255,255), 12px 3px 0 0 rgba(255,255,255,255), 15px 3px 0 0 rgba(255,255,255,255), 18px 3px 0 0 rgba(255,255,255,255), 21px 3px 0 0 rgba(255,255,255,255), 24px 3px 0 0 rgba(255,255,255,255), 3px 6px 0 0 rgba(53,53,64,255), 6px 6px 0 0 rgba(53,53,64,255), 9px 6px 0 0 rgba(53,53,64,255), 12px 6px 0 0 rgba(53,53,64,255), 15px 6px 0 0 rgba(53,53,64,255), 18px 6px 0 0 rgba(53,53,64,255), 21px 6px 0 0 rgba(53,53,64,255), 24px 6px 0 0 rgba(53,53,64,255), 27px 6px 0 0 rgba(255,255,255,255), 3px 9px 0 0 rgba(168,139,121,1), 6px 9px 0 0 rgba(53,53,64,255), 9px 9px 0 0 rgba(53,53,64,255), 12px 9px 0 0 rgba(53,53,64,255), 15px 9px 0 0 rgba(53,53,64,255), 18px 9px 0 0 rgba(191,184,180,255), 21px 9px 0 0 rgba(53,53,64,255), 24px 9px 0 0 rgba(53,53,64,255), 27px 9px 0 0 rgba(255,255,255,255), 3px 12px 0 0 rgba(168,139,121,1), 6px 12px 0 0 rgba(53,53,64,255), 9px 12px 0 0 rgba(53,53,64,255), 12px 12px 0 0 rgba(53,53,64,255), 15px 12px 0 0 rgba(145,141,141,255), 18px 12px 0 0 rgba(99,97,103,255), 21px 12px 0 0 rgba(145,141,141,255), 24px 12px 0 0 rgba(53,53,64,255), 27px 12px 0 0 rgba(255,255,255,255), 6px 15px 0 0 rgba(168,139,121,1), 9px 15px 0 0 rgba(53,53,64,255), 12px 15px 0 0 rgba(53,53,64,255), 15px 15px 0 0 rgba(53,53,64,255), 18px 15px 0 0 rgba(145,141,141,255), 21px 15px 0 0 rgba(53,53,64,255), 24px 15px 0 0 rgba(53,53,64,255), 27px 15px 0 0 rgba(255,255,255,255), 6px 18px 0 0 rgba(168,139,121,1), 9px 18px 0 0 rgba(53,53,64,255), 12px 18px 0 0 rgba(53,53,64,255), 15px 18px 0 0 rgba(53,53,64,255), 18px 18px 0 0 rgba(53,53,64,255), 21px 18px 0 0 rgba(53,53,64,255), 24px 18px 0 0 rgba(53,53,64,255), 27px 18px 0 0 rgba(255,255,255,255), 9px 21px 0 0 rgba(168,139,121,1), 12px 21px 0 0 rgba(53,53,64,255), 15px 21px 0 0 rgba(53,53,64,255), 18px 21px 0 0 rgba(53,53,64,255), 21px 21px 0 0 rgba(53,53,64,255), 24px 21px 0 0 rgba(53,53,64,255), 27px 21px 0 0 rgba(255,255,255,255), 12px 24px 0 0 rgba(168,139,121,1), 15px 24px 0 0 rgba(168,139,121,1), 18px 24px 0 0 rgba(53,53,64,255), 21px 24px 0 0 rgba(53,53,64,255), 24px 24px 0 0 rgba(53,53,64,255), 27px 24px 0 0 rgba(255,255,255,255), 18px 27px 0 0 rgba(168,139,121,1), 21px 27px 0 0 rgba(168,139,121,1), 24px 27px 0 0 rgba(53,53,64,255), 27px 27px 0 0 rgba(255,255,255,255)
    height: 3px
    width: 3px
    z-index: 2
    &-1
      @extend #brown-border-deco
      left: $width
      top: $height
      -webkit-transform: scaleX(-1)
      transform: scaleX(-1)
    &-2
      @extend #brown-border-deco
      right: $width
      top: $height
    &-3
      @extend #brown-border-deco
      left: $width
      bottom: $height
      -webkit-transform: rotate(180deg)
      transform: rotate(180deg)
    &-4
      @extend #brown-border-deco
      right: $width
      bottom: $height
      -webkit-transform: scaleX(-1) rotate(180deg)
      transform: scaleX(-1) rotate(180deg)

.v-card.light
  background-color: transparent !important
  padding: 4px 4px 4px 4px
  $height: 0px
  $width: 0px
  box-shadow: none
  z-index: 2
  #light-border-deco
    position: absolute
    box-shadow: 6px 3px 0 0 rgb(219,204,193), 9px 3px 0 0 rgb(219,204,193), 12px 3px 0 0 rgb(219,204,193), 15px 3px 0 0 rgb(219,204,193), 18px 3px 0 0 rgb(219,204,193), 3px 6px 0 0 rgb(219,204,193), 6px 6px 0 0 rgb(219,204,193), 3px 9px 0 0 rgb(219,204,193), 3px 12px 0 0 rgb(219,204,193), 3px 15px 0 0 rgb(219,204,193), 3px 18px 0 0 rgb(219,204,193)
    height: 3px
    width: 3px
    &-1
      @extend #light-border-deco
      left: $width
      top: $height
    &-2
      @extend #light-border-deco
      right: $width
      top: $height
      -webkit-transform: scaleX(-1)
      transform: scaleX(-1)
    &-3
      @extend #light-border-deco
      left: $width
      bottom: $height
      -webkit-transform: scaleX(-1) rotate(180deg)
      transform: scaleX(-1) rotate(180deg)
    &-4
      @extend #light-border-deco
      right: $width
      bottom: $height
      -webkit-transform: rotate(180deg)
      transform: rotate(180deg)

.v-card.brownLight
  box-shadow: 0px 0px 0px 3px #4D3F38 inset, 0px 0px 0px 6px rgb(189, 170, 151) inset !important
  background-color: rgb(212, 194, 182) !important
  padding: 4px 4px 4px 4px
  $height: -9px
  $width: 12px
  z-index: 2
  #lbrown-border-deco
    position: absolute
    box-shadow: 6px 3px 0 0 rgba(77,63,56,255), 9px 3px 0 0 rgba(77,63,56,255), 12px 3px 0 0 rgba(77,63,56,255), 15px 3px 0 0 rgba(77,63,56,255), 18px 3px 0 0 rgba(77,63,56,255), 3px 6px 0 0 rgba(77,63,56,255), 6px 6px 0 0 rgba(169,73,73,255), 9px 6px 0 0 rgba(77,63,56,255), 12px 6px 0 0 rgba(169,73,73,255), 15px 6px 0 0 rgba(209,121,115,255), 18px 6px 0 0 rgba(77,63,56,255), 3px 9px 0 0 rgba(77,63,56,255), 6px 9px 0 0 rgba(77,63,56,255), 9px 9px 0 0 rgba(77,63,56,255), 12px 9px 0 0 rgba(77,63,56,255), 15px 9px 0 0 rgba(169,73,73,255), 18px 9px 0 0 rgba(77,63,56,255), 3px 12px 0 0 rgba(189,170,151,1), 6px 12px 0 0 rgba(77,63,56,255), 9px 12px 0 0 rgba(146,52,70,255), 12px 12px 0 0 rgba(77,63,56,255), 15px 12px 0 0 rgba(77,63,56,255), 18px 12px 0 0 rgba(77,63,56,255), 3px 15px 0 0 rgba(189,170,151,1), 6px 15px 0 0 rgba(77,63,56,255), 9px 15px 0 0 rgba(77,63,56,255), 12px 15px 0 0 rgba(77,63,56,255), 15px 15px 0 0 rgba(169,73,73,255), 18px 15px 0 0 rgba(77,63,56,255), 3px 18px 0 0 rgba(189,170,151,1), 6px 18px 0 0 rgba(189,170,151,1), 9px 18px 0 0 rgba(189,170,151,1), 12px 18px 0 0 rgba(77,63,56,255), 15px 18px 0 0 rgba(77,63,56,255)
    height: 3px
    width: 3px
    &-1
      @extend #lbrown-border-deco
      left: $width
      top: $height
      -webkit-transform: scaleX(-1)
      transform: scaleX(-1)
    &-2
      @extend #lbrown-border-deco
      right: $width
      top: $height
    &-3
      @extend #lbrown-border-deco
      left: $width
      bottom: $height
      -webkit-transform: rotate(180deg)
      transform: rotate(180deg)
    &-4
      @extend #lbrown-border-deco
      right: $width
      bottom: $height
      -webkit-transform: scaleX(-1) rotate(180deg)
      transform: scaleX(-1) rotate(180deg)

.v-card.brownDark
  background-color: rgb(176, 151, 130)
  box-shadow: 0px 3px 0px rgb(170, 144, 122) inset, 0 3px 5px -1px rgba(0,0,0,.2),0 5px 8px 0 rgba(0,0,0,.14),0 1px 14px 0 rgba(0,0,0,.12) !important
  border: 3px solid rgb(157, 128, 103)
#dbrown-border-deco
  position: absolute
  box-shadow: 3px 3px 0 0 rgb(126,103,76), 6px 3px 0 0 rgb(126,103,76), 9px 3px 0 0 rgb(126,103,76), 3px 6px 0 0 rgb(126,103,76), 3px 9px 0 0 rgb(126,103,76)
  height: 3px
  width: 3px
  $position: 6px
  height: 3px
  width: 3px
  z-index: 2
  &-1
    @extend #dbrown-border-deco
    left: -$position
    top: -$position
  &-2
    @extend #dbrown-border-deco
    top: -$position
    right: -$position
    -webkit-transform: scaleX(-1)
    transform: scaleX(-1)
  &-3
    @extend #dbrown-border-deco
    bottom: -$position
    left: -$position
    -webkit-transform: scaleX(-1) rotate(180deg)
    transform: scaleX(-1) rotate(180deg)
  &-4
    @extend #dbrown-border-deco
    bottom: -$position
    right: -$position
    -webkit-transform: rotate(180deg)
    transform: rotate(180deg)
</style>
