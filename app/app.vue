<script lang="ts" setup>
useSeoMeta({
  titleTemplate: (titleChunk) =>
    titleChunk ? `AssemblyTracker - ${titleChunk}` : 'AssemblyTracker',
})

const { getUserName } = useUserStore()

useAssembliesEvents()

onMounted(getUserName)
</script>

<template>
  <NuxtLayout />
</template>
