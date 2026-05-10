<script setup lang="ts">
const route = useRoute()
const assemblyId = route.params['id'][0]

const assembliesStore = useAssembliesStore()
const { assembly, materials } = storeToRefs(assembliesStore)
const { getAssembly, addMaterial } = assembliesStore

onMounted(async () => {
  await getAssembly(assemblyId)
  if (!assembly.value) {
    await navigateTo('/')
  }
})
</script>

<template>
  <div class="assembly">
    <Materials
      :materials
      @add="addMaterial" />
  </div>
</template>

<style lang="scss" scoped>
.assembly {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-right: 13.5px;
}
</style>
