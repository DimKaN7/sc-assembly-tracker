<script setup lang="ts">
import PencilIcon from '@gravity-ui/icons/svgs/pencil.svg'
import TrashBinIcon from '@gravity-ui/icons/svgs/trash-bin.svg'

defineProps<{
  contributions: MaterialContributionResponse[]
  measure: string
  userId: string
}>()

defineEmits<{
  edit: [c: MaterialContributionResponse]
  delete: [c: MaterialContributionResponse]
}>()
</script>

<template>
  <div class="scroll-y flex max-h-[200px] w-full">
    <table class="flex-[1_0_0] border-collapse text-[#94a3b8]">
      <thead class="sticky top-0 bg-[#151921] text-white">
        <tr>
          <th
            class="p-[5px]"
            :style="{ width: '20%' }">
            Внес
          </th>
          <th
            class="p-[5px]"
            :style="{ width: '10%' }">
            Количество
          </th>
          <th
            class="p-[5px]"
            :style="{ width: '20%' }">
            Дата
          </th>
          <th
            class="p-[5px]"
            :style="{ width: '40%' }">
            Станция
          </th>
          <th
            class="p-[5px]"
            :style="{ width: '10%' }">
            Действия
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="c in contributions"
          :key="c.id">
          <td class="h-[40px] p-[10px_5px] text-center">{{ c.username }}</td>
          <td class="h-[40px] p-[10px_5px] text-center">{{ c.amount }}</td>
          <td class="h-[40px] p-[10px_5px] text-center">{{ parseDate(c.addedAt) }}</td>
          <td class="h-[40px] p-[10px_5px] text-center">{{ c.station?.title ?? '-' }}</td>
          <td class="h-[40px] p-[10px_5px]">
            <div
              v-if="c.userId === userId"
              class="flex h-full justify-end gap-[10px]">
              <button
                class="flex items-center justify-center"
                title="Редактировать"
                @click="$emit('edit', c)">
                <PencilIcon class="h-full text-white" />
              </button>
              <button
                class="flex items-center justify-center"
                title="Удалить"
                @click="$emit('delete', c)">
                <TrashBinIcon class="h-full text-white" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped></style>
