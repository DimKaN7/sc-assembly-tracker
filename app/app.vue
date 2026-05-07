<script lang="ts" setup>
useSeoMeta({
  titleTemplate: (titleChunk) =>
    titleChunk ? `AssemblyTracker - ${titleChunk}` : 'AssemblyTracker',
})
</script>

<template>
  <NuxtLayout />
</template>
