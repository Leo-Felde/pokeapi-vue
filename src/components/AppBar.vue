<template>
  <v-app-bar
    color="black"
    class="py-2 pl-4"
    absolute
  >
    <RouterLink
      to="/"
      class="d-flex"
    >
      <img
        id="app-icon"
        src="/icon.png"
      >
      <label id="app-label">Poke<span id="app-label-2">cards</span></label>
    </RouterLink>
    <slot />
  </v-app-bar>
</template>

<style lang="sass" scoped>
#app-icon
  width: 70px

#app-label
  color: red
  font-weight: 450
  margin-top: auto
  margin-bottom: auto
  cursor: pointer
  span
    color: white
</style>