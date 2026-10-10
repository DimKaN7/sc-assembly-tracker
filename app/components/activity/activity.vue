<script setup lang="ts">
import PulseIcon from '@gravity-ui/icons/svgs/pulse.svg'

const assembliesStore = useAssembliesStore()
const { contributions, assembly } = storeToRefs(assembliesStore)
const { loadContributions } = assembliesStore

const sentinel = useTemplateRef('sentinel')

useIntersectionObserver(sentinel, async ([entry]) => {
  if (entry?.isIntersecting && contributions.value?.data.length) {
    await loadContributions(assembly.value?.id, contributions.value.data.at(-1)!.id)
  }
})
</script>

<template>
  <aside class="flex h-full flex-[0_0_320px] flex-col border-[1px] border-solid border-[#1e232d]">
    <div class="flex items-center gap-[10px] p-[24px]">
      <PulseIcon class="h-[16px] w-[16px] text-[#00f2ff]" />
      <span class="font-bold uppercase text-white">Лента активности</span>
    </div>
    <div class="flex flex-[1_1_0] overflow-hidden p-[0_19px_24px_24px]">
      <ul
        v-if="contributions?.data.length"
        class="scroll-y flex w-full list-none flex-col gap-[24px]">
        <li
          v-for="contribution in contributions.data"
          :key="contribution.id">
          <ActivityContribution :contribution />
        </li>
        <li
          ref="sentinel"
          class="h-0 w-full" />
      </ul>
      <span
        v-else
        class="m-auto text-[20px] font-bold text-[#94a3b8]">
        Нет взносов
      </span>
    </div>
  </aside>
</template>

<style lang="scss" scoped></style>
