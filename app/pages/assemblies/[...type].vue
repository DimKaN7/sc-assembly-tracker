<script setup lang="ts">
const route = useRoute()
const type = route.params.type[0] as AssemblyType

useSeoMeta({
  title: `${getAssemblyTypeStr(type)} сборки`,
})

const assembliesStore = useAssembliesStore()
const { assemblies } = storeToRefs(assembliesStore)
const { getAssemblies } = assembliesStore

onMounted(async () => await getAssemblies(type))
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
