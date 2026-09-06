<script setup lang="ts">
useSeoMeta({
  title: 'Все сборки',
})

const assembliesStore = useAssembliesStore()
const { assemblies } = storeToRefs(assembliesStore)
const { getAssemblies } = assembliesStore

onMounted(getAssemblies)
</script>

<template>
  <section
    class="grid h-full flex-[1_0_0] grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-[24px] p-[32px]">
    <CardAssembly
      v-for="assembly in assemblies"
      :key="assembly.id"
      :assembly />
  </section>
</template>

<style lang="scss" scoped></style>
