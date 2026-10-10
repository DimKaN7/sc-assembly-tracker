<script setup lang="ts">
const route = useRoute()
const assemblyId = route.params['id'][0]

const assembliesStore = useAssembliesStore()
const { assembly, contributions } = storeToRefs(assembliesStore)
const { getAssembly } = assembliesStore

useSeoMeta({
  title: () => (assembly.value ? assembly.value.name : ''),
})

onMounted(async () => {
  await getAssembly(assemblyId)
  if (!assembly.value) {
    await navigateTo('/')
  }
})

onBeforeRouteLeave(() => {
  assembly.value = undefined
  contributions.value = undefined
})
</script>

<template>
  <div
    v-if="assembly"
    class="flex size-full">
    <NuxtPage />
  </div>
</template>

<style lang="scss" scoped></style>
