<script setup lang="ts">
import { Tooltip } from 'floating-vue'
import 'floating-vue/dist/style.css'

defineProps<{
  text: string
}>()
</script>

<template>
  <Tooltip>
    <template #default>
      <slot />
    </template>
    <template #popper>
      {{ text }}
    </template>
  </Tooltip>
</template>

<style lang="scss" scoped>
.v-popper__inner {
  border: none !important;
}
</style>
