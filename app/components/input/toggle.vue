<script setup lang="ts">
const { toggleClasses = '' } = defineProps<{
  title: string
  toggleClasses?: string
  description?: string
}>()

const model = defineModel<boolean>({
  required: true,
})
</script>

<template>
  <div class="flex items-center gap-[12px]">
    <button
      :class="[
        toggleClasses,
        'group flex rounded-[12px] p-[2px] transition-[background-color] duration-300',
        model ? 'selected bg-[#00F2FF]' : 'bg-[#94A3B8]',
      ]"
      @click="model = !model">
      <div
        class="h-full flex-grow-0 transition-[flex-grow] duration-300 group-[.selected]:flex-grow" />
      <div class="aspect-square h-full rounded-[50%] bg-[#0B0E14]" />
    </button>
    <div class="flex flex-col gap-[2px]">
      <span class="text-[13px] font-[600] text-white">{{ title }}</span>
      <span
        v-if="description"
        class="text-[12px] text-[#94A3B8]">
        {{ description }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
