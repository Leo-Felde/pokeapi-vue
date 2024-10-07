<template>
  <v-text-field
    id="searchInput"
    :model-value="textValue"
    variant="outlined"
    placeholder="filtrar por nome ou id"
    density="compact"
    hide-details
    clearable
    @update:model-value="updateTextValue"
  >
    <template #prepend-inner>
      <v-menu>
        <template #activator="{ props: menu }">
          <v-tooltip location="bottom">
            <template #activator="{ props: tooltip }">
              <v-btn
                color="primary"
                variant="flat"
                icon
                size="x-small"
                v-bind="mergeProps(menu, tooltip)"
              >
                <img
                  v-if="typeValue"
                  style="width: 32px"
                  :src="getTypeUrl(typeValue)"
                >

                <v-icon v-else>
                  mdi-all-inclusive
                </v-icon>
              </v-btn>
            </template>
            <span>Filtrar por tipo</span>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item
            v-for="(type, index) in types"
            :key="index"
            :active="type === typeValue"
            :color="pokemonTypeColors[type].list"
            @click="selectType(type)"
          >
            <template #prepend>
              <v-avatar
                color="grey-lighten-1"
                size="25"
              >
                <v-img :src="getTypeUrl(type)" />
              </v-avatar>
            </template>
            <v-list-item-title>{{ type }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-text-field>
</template>

<script lang="ts">
import { computed, mergeProps, ref, defineComponent, type PropType } from 'vue'
import { pokemonTypeColors } from @/utils/PokemonTypes.ts'
import { getTypeUrl } from '@/utils/Functions'

export default defineComponent({
  props: {
    modelValue: {
      type: String as PropType<string | null>,
      default: ''
    },
    selectedType: {
      type: String as  PropType<string | null>,
      default: null
    }
  },
  emits: ['update:modelValue', 'update:selectedType', 'input'],
  setup(props, { emit }) {
    const typeValue = ref(props.selectedType)
    const textValue = ref(props.modelValue)

    const types = computed(() => {
      return Object.keys(pokemonTypeColors)
    })
    
    const selectType = (type: string) => {
      typeValue.value = type === typeValue.value ? null : type
      emit('update:selectedType', typeValue.value)
      emit('input')
    }

    const updateTextValue = (newValue: string) => {
      textValue.value = newValue
      emit('update:modelValue', newValue)
      emit('input')
    }

    return {
      mergeProps,
      getTypeUrl,
      pokemonTypeColors,
      typeValue,
      textValue,
      types,
      selectType,
      updateTextValue
    }
  }
})
</script>

<style lang="sass" scoped>
.v-list
  max-height: 300px
</style>
