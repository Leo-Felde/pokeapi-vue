<template>
  <v-app-bar
    color="black"
    class="py-2 pl-4"
    absolute
  >
    <img
      id="app-icon"
      src="@/assets/img/tcg-logo.png"
    >
    <label id="app-label">Poke<span id="app-label-2">cards</span></label>
    <slot />
  </v-app-bar>
</template>

<style lang="sass" scoped>
#app-icon
  width: 70px

#app-label
  color: red
  font-weight: 450
  span
    color: white
</style>