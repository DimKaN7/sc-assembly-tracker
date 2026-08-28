<script setup lang="ts">
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
      <IHeaderLogout />
    </button>
  </div>
</template>

<style lang="scss" scoped></style>
