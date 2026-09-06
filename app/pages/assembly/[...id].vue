<script setup lang="ts">
const route = useRoute()
const assemblyId = route.params['id'][0]

const assembliesStore = useAssembliesStore()
const { assembly, contributions } = storeToRefs(assembliesStore)
const { getAssembly } = assembliesStore

useSeoMeta({
  title: () => (assembly.value ? assembly.value.name : ''),
})

const progressValue = computed<string>(() => (assembly.value ? `${assembly.value.progress}%` : ''))

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
    class="flex size-full flex-col gap-[10px] pr-[13.5px]">
    <div class="flex flex-col gap-[10px] p-[32px_32px_0]">
      <div class="flex items-center justify-between">
        <span class="line-clamp-2 text-[20px] font-bold text-white">{{ assembly.name }}</span>
        <span class="line-clamp-2 text-[20px] font-bold text-white">{{ progressValue }}</span>
      </div>
      <Progress :progress-value />
    </div>
    <Materials />
  </div>
</template>

<style lang="scss" scoped></style>
