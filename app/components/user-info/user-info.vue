<script setup lang="ts">
import ArrowRightFromSquareIcon from '@gravity-ui/icons/svgs/arrow-right-from-square.svg'

defineProps<{
  user: UserResponse
}>()

defineEmits<{
  logoutClick: []
}>()
</script>

<template>
  <div class="flex items-center gap-[24px]">
    <span class="text-[16px] text-[#94a3b8]">{{ user.username }}</span>
    <button
      class="flex h-[20px] w-[20px] items-center justify-center"
      @click="$emit('logoutClick')">
      <ArrowRightFromSquareIcon class="text-[#94a3b8]" />
    </button>
  </div>
</template>

<style lang="scss" scoped></style>
