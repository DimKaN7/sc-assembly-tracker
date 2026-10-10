<script setup lang="ts">
const route = useRoute()
const assemblyId = route.params['id'][0]

const assembliesStore = useAssembliesStore()
const { assembly } = storeToRefs(assembliesStore)
const { toggleAssemblyArchive } = assembliesStore

useSeoMeta({
  title: () => (assembly.value ? assembly.value.name : ''),
})

const progressValue = computed<string>(() => (assembly.value ? `${assembly.value.progress}%` : ''))

const archiveStr = computed<string>(() =>
  assembly.value?.isArchived ? 'Вернуть из архива' : 'В архив',
)
</script>

<template>
  <div
    v-if="assembly"
    class="flex size-full flex-col gap-[10px] pr-[13.5px]">
    <div class="flex flex-col gap-[10px] p-[32px_32px_0]">
      <div
        v-if="assembly.isOwner"
        class="flex gap-[10px]">
        <NuxtLink
          :to="`/assembly/${assemblyId}/edit`"
          class="btn-accept-with-paddings">
          Редактировать
        </NuxtLink>
        <button
          class="btn-cancel-with-paddings"
          @click="toggleAssemblyArchive">
          {{ archiveStr }}
        </button>
        <!-- <button class="btn-cancel-with-paddings">Удалить</button> -->
      </div>
      <div class="flex items-center justify-between">
        <span class="line-clamp-2 text-[20px] font-bold text-white">{{ assembly.name }}</span>
        <span class="line-clamp-2 text-[20px] font-bold text-white">{{ progressValue }}</span>
      </div>
      <span
        v-if="assembly.description"
        class="line-clamp-2 text-[16px] text-white">
        {{ assembly.description }}
      </span>
      <Progress :progress-value />
    </div>
    <Materials />
  </div>
</template>

<style lang="scss" scoped></style>
