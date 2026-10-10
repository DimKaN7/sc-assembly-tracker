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
  <section class="scroll-y h-full w-full py-[32px]">
    <div
      v-if="assemblies.length"
      class="grid w-full flex-[1_0_0] grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-[24px] pl-[32px] pr-[27px]">
      <CardAssembly
        v-for="assembly in assemblies"
        :key="assembly.id"
        :assembly />
    </div>
    <div
      v-else
      class="flex h-full w-full items-center justify-center">
      <span class="text-[28px] uppercase text-white">Сборки не найдены</span>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
