<script setup lang="ts">
import { Dropdown } from 'floating-vue'
import 'floating-vue/dist/style.css'

defineProps<{
  shown: boolean
  distance: number
}>()
</script>

<template>
  <Dropdown
    no-auto-focus
    :shown
    :distance
    :triggers="[]"
    :auto-hide="false">
    <template #popper>
      <slot name="popper" />
    </template>
    <slot />
  </Dropdown>
</template>

<style lang="scss" scoped>
.v-popper__inner {
  border: none !important;
}
</style>
