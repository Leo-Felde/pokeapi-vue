<template>
  <v-select
    v-model="selectValue"
    :density="density"
    :label="label"
    :class="`stylized-tf ${contentClass}`"
    :items="items"
    :clearable="clearable"
    :item-title="itemTitle"
    :item-value="itemValue"
    :prepend-icon="prependIcon"
    :prepend-inner-icon="prependInnerIcon"
    :append-icon="appendIcon"
    :append-outer-icon="appendOuterIcon"
    :placeholder="placeHolder"
    :hide-details="hideDetails"
    :error-messages="errorMessages"
    :return-object="returnObject"
    :rules="rules"
    :counter="counter"
    :type="type"
  >
    <template #prepend-inner>
      <div
        v-for="i in 2"
        :id="`tf-deco-${i}`"
        :key="i"
      />
    </template>
  </v-select>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'TextField',

  props: {
    hideDetails: { type: Boolean, default: true },
    density: { type: String, default: 'comfortable' },
    returnObject: Boolean,
    clearable: Boolean,
    rules: { type: Array, default: () => [] },
    errorMessages: { type: [String, Array], default: () => [] },
    items: { type: Array, default: () => [] },
    type: { type: String, default: 'text' },
    contentClass: { type: String, default: '' },
    prependIcon: { type: String, default: undefined },
    prependInnerIcon: { type: String, default: undefined },
    appendIcon: { type: String, default: undefined },
    appendOuterIcon: { type: String, default: undefined },
    placeHolder: { type: String, default: undefined },
    counter: { type: String, default: undefined },
    label: { type: String, default: undefined },
    itemValue: { type: String, default: undefined },
    itemTitle: { type: String, default: undefined },
    itemProps: Boolean,
    modelValue: { type: [String, Array], default: undefined }
  },

  setup (props, { emit }) {
    const selectValue = ref(props.modelValue)

    watch(() => props.modelValue, (newValue) => {
      selectValue.value = newValue
    })

    watch(selectValue, (newValue) => {
      emit('update:modelValue', newValue)
    })

    return {
      selectValue
    }
  }
}
</script>

<style lang="sass" scoped>
::v-deep
  .v-input__slot
    border-radius: 0px !important
    outline: 3px solid white !important
    background: #86735b !important
    box-shadow: 0px 0px 0px 3px #353540 inset, 0px 7px 0px 0px #7e674c inset !important
    margin-bottom: 0px

#tf-deco
  position: absolute
  box-shadow: 3px 3px 0 0 rgba(53,53,64,255), 6px 3px 0 0 rgba(255,255,255,255), 3px 6px 0 0 rgba(53,53,64,255), 6px 6px 0 0 rgba(53,53,64,255), 9px 6px 0 0 rgba(255,255,255,255), 3px 9px 0 0 rgba(53,53,64,255), 6px 9px 0 0 rgba(53,53,64,255), 9px 9px 0 0 rgba(255,255,255,255), 3px 12px 0 0 rgba(53,53,64,255), 6px 12px 0 0 rgba(255,255,255,255)
  height: 3px
  width: 3px
  &-1
    @extend #tf-deco
    left: 0px
    top: 32%
    -webkit-transform: scaleX(-1)
    transform: scaleX(-1)
  &-2
    @extend #tf-deco
    right: 0px
    top: 32%

.v-input:not(.v-input--dense)
  &:deep(.v-text-field__details)
    padding-top: 4px !important
    margin-bottom: 0px !important

.v-select-list
  outline: 3px solid white !important
  box-shadow: 0px 0px 0px 3px #353540 inset, 0px 0px 0px 6px #937461  inset !important
  background-color: #9d8872 !important
  padding: 4px 4px 4px 4px
</style>
