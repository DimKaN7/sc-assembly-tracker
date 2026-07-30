<script setup lang="ts">
const route = useRoute()
const assemblyId = route.params['id'][0]

const assembliesStore = useAssembliesStore()
const { assembly, materials, contributions } = storeToRefs(assembliesStore)
const { getAssembly, addMaterial } = assembliesStore

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
    class="assembly">
    <div class="assembly__header">
      <div class="inline">
        <span class="assembly__name">{{ assembly.name }}</span>
        <span class="assembly__progress">{{ progressValue }}</span>
      </div>
      <Progress :progress-value />
    </div>
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
  gap: 10px;

  &__name,
  &__progress {
    @include text-overflow-ellipsis(2);
    color: #fff;
    font-weight: 700;
    font-size: 20px;
  }

  &__header {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 32px 32px 0;

    .inline {
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
