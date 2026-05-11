<script setup lang="ts">
useSeoMeta({
  title: 'Главная страница',
})

const assembliesStore = useAssembliesStore()
const { assemblies } = storeToRefs(assembliesStore)
const { getAssemblies } = assembliesStore

onMounted(getAssemblies)
</script>

<template>
  <section class="assemblies">
    <CardAssembly
      v-for="assembly in assemblies"
      :key="assembly.id"
      :assembly />
  </section>
</template>

<style lang="scss" scoped>
.assemblies {
  flex: 1 0 0;
  height: 100%;
  padding: 32px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}
</style>
