<script setup lang="ts">
import type { NuxtLinkProps } from '#app'

interface Props extends Omit<NuxtLinkProps, 'prefetch'> {
  selectedRoutesNames?: string[]
  selectedRoutesPaths?: string[]
}

const { selectedRoutesNames = [], selectedRoutesPaths = [] } = defineProps<Props>()

const route = useRoute()

const isLinkActive = computed<boolean>(
  () =>
    selectedRoutesNames.includes(route.name as string) || selectedRoutesPaths.includes(route.path),
)
</script>

<template>
  <NuxtLink
    v-bind="$props"
    :class="[isLinkActive && 'router-link-active']">
    <slot />
  </NuxtLink>
</template>

<style lang="scss" scoped></style>
