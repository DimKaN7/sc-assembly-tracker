<script setup lang="ts">
import TrashBinIcon from '@gravity-ui/icons/svgs/trash-bin.svg'

defineProps<{
  user: NewAssemblyUser
}>()

defineEmits<{
  update: [newUser: TitleValue<string> | undefined]
  delete: [id: string]
}>()
</script>

<template>
  <div class="flex items-center gap-[12px] border-[1px] border-solid border-[#1E232D] p-[12px]">
    <InputAutocomplete
      class="placeholder:text-[rgba(255, 255, 255, 0.5)] w-full bg-[#0b0e14] p-[4px_12px] font-[LiberationMono] text-white"
      :model-value="user.user"
      :popper-style="{ flex: '1 0 0' }"
      placeholder="Discord пользователя"
      type="text"
      :fetch-func="findUsers"
      @update:model-value="$emit('update', $event)" />
    <FloatingTooltip
      :style="{
        flex: '0 0 28px',
      }"
      text="Удалить">
      <button
        class="flex h-[28px] w-[28] items-center justify-center p-[4px]"
        title="Удалить"
        @click="$emit('delete', user.id)">
        <TrashBinIcon class="h-full text-[#EF4444]" />
      </button>
    </FloatingTooltip>
  </div>
</template>

<style lang="scss" scoped></style>
