<script lang="ts" setup>
useSeoMeta({
  titleTemplate: (titleChunk) =>
    titleChunk ? `AssemblyTracker - ${titleChunk}` : 'AssemblyTracker',
})

const { getUserName } = useUserStore()

useAssembliesEventsGroup()

onMounted(getUserName)
</script>

<template>
  <NuxtLayout />
</template>
