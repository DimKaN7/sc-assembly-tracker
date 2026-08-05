<script lang="ts" setup>
useSeoMeta({
  titleTemplate: (titleChunk) =>
    titleChunk ? `AssemblyTracker - ${titleChunk}` : 'AssemblyTracker',
})

const { getUser } = useUserStore()

useAssembliesEvents()

onMounted(getUser)
</script>

<template>
  <NuxtLayout />
</template>
