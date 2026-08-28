<script setup lang="ts">
import CubeIcon from '@gravity-ui/icons/svgs/cube.svg'
import XmarkIcon from '@gravity-ui/icons/svgs/xmark.svg'
import FloppyDiskIcon from '@gravity-ui/icons/svgs/floppy-disk.svg'
import BanIcon from '@gravity-ui/icons/svgs/ban.svg'

const { material, extended = false } = defineProps<{
  material: MaterialResponse
  userId: string
  extended?: boolean
}>()

const emits = defineEmits<{
  add: [materialId: string, amount: number, stationId: string | undefined]
  click: [material: MaterialResponse]
  close: []
  edit: [contributionId: string, newAmount: number, newStationId: string | undefined]
  delete: [contributionId: string]
}>()

const amount = ref<number>()
const station = ref<TitleValue<string>>()
const contributionId = ref<string>()

const progressValue = computed<string>(() => `${material.progress}%`)
const actualCount = computed<string>(() => `${material.actualCount} ${material.measure}`)
const requiredCount = computed<string>(() => `${material.requiredCount} ${material.measure}`)

const onAddClick = () => {
  if (amount.value && amount.value > 0) {
    if (contributionId.value) {
      emits('edit', contributionId.value, amount.value, station.value?.value)
    } else {
      emits('add', material.id, +amount.value, station.value?.value)
      amount.value = undefined
      station.value = undefined
    }
  }
}

const onCancelClick = () => {
  contributionId.value = undefined
  amount.value = undefined
  station.value = undefined
}

const onEditClick = (contribution: MaterialContributionResponse) => {
  contributionId.value = contribution.id
  amount.value = contribution.amount
  station.value = contribution.station
}
</script>

<template>
  <li
    :class="[
      'relative flex h-fit flex-col gap-[16px] border-[1px] border-solid border-[#1e232d] bg-[#151921] p-[24px]',
      extended && 'w-[90%] max-w-[800px]',
    ]">
    <button
      v-if="extended"
      class="absolute right-0 top-0 h-[32px] w-[32px] -translate-y-full translate-x-full"
      @click.stop="$emit('close')">
      <XmarkIcon class="text-white" />
    </button>
    <button
      class="flex h-[40px] w-full items-start gap-[10px]"
      @click="$emit('click', material)">
      <div
        class="flex h-[40px] flex-[0_0_40px] items-center justify-center border-[1px] border-solid border-[#1e232d] bg-[#1e232d] p-[10px]">
        <CubeIcon class="text-[#00f2ff]" />
      </div>
      <span class="line-clamp-2 font-bold text-white">{{ material.name }}</span>
      <span class="ml-auto font-[LiberationMono] text-[16px] text-[#00f2ff]">
        {{ progressValue }}
      </span>
    </button>
    <div class="flex w-full flex-col gap-[5px]">
      <div class="flex justify-between">
        <span class="font-[LiberationMono] text-[#94a3b8]">{{ actualCount }}</span>
        <span class="font-[LiberationMono] text-white">{{ requiredCount }}</span>
      </div>
      <Progress :progress-value />
    </div>
    <div class="flex items-start gap-[8px]">
      <div class="flex flex-[1_1_0] flex-col gap-[8px]">
        <input
          :id="`${material.id}-amount`"
          v-model="amount"
          class="placeholder:text-[rgba(255, 255, 255, 0.5)] flex-[1_1_auto] border-[1px] border-solid border-[#1e232d] bg-[#0b0e14] p-[9px_12px] font-[LiberationMono] leading-[16px] text-white [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          :placeholder="`Количество(${material.measure})`"
          :min="0"
          type="number" />
        <InputAutocomplete
          :id="`${material.id}-station`"
          v-model="station"
          placeholder="Станция"
          type="text"
          :fetch-func="findStations" />
      </div>
      <div class="flex flex-[0_0_36px] flex-col gap-[8px]">
        <button
          class="flex h-[36px] flex-[0_0_36px] items-center justify-center rounded-[10px] bg-[#00f2ff] font-bold text-[#0b0e14]"
          title="Сохранить"
          @click.stop="onAddClick">
          <FloppyDiskIcon class="w-[20px] text-black" />
        </button>
        <button
          v-if="contributionId"
          class="flex h-[36px] flex-[0_0_36px] items-center justify-center rounded-[10px] bg-[#00f2ff] font-bold text-[#0b0e14]"
          title="Отмена"
          @click.stop="onCancelClick">
          <BanIcon class="w-[20px] text-black" />
        </button>
      </div>
    </div>
    <CardMaterialExtension
      v-if="extended"
      :contributions="material.contributions"
      :measure="material.measure"
      :user-id
      @edit="onEditClick"
      @delete="$emit('delete', $event.id)" />
  </li>
</template>

<style lang="scss" scoped></style>
