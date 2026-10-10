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
  <section class="scroll-y h-full w-full py-[32px]">
    <div
      v-if="assemblies.length"
      class="grid w-full flex-[1_0_0] grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-[24px] pl-[32px] pr-[27px]">
      <CardAssembly
        v-for="assembly in assemblies"
        :key="assembly.id"
        :assembly />
    </div>
    <span
      v-else
      class="text-[28px] uppercase text-white">
      Сборки не найдены
    </span>
  </section>
</template>

<style lang="scss" scoped></style>
