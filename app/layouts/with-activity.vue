<script setup lang="ts">
const { withActivity = false } = defineProps<{
  withActivity?: boolean
}>()
</script>

<template>
  <div class="flex h-full w-full">
    <div class="flex-[1_1_0]">
      <NuxtPage />
    </div>
    <Activity v-if="withActivity" />
  </div>
</template>

<style lang="scss" scoped></style>
