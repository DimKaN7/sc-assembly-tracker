<script setup lang="ts">
defineProps<{
  progressValue: string
}>()
</script>

<template>
  <div
    class="relative h-[5px] w-full overflow-hidden rounded-[999px] bg-[#1e232d] after:absolute after:left-0 after:top-0 after:h-full after:w-[var(--progress)] after:bg-[#00f2ff] after:transition-[width] after:duration-[0.2s] after:ease-in-out after:content-['']"
    :style="{ '--progress': progressValue }" />
</template>

<style lang="scss" scoped></style>
