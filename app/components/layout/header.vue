<script setup lang="ts">
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { logout } = userStore
</script>

<template>
  <header
    class="flex w-full items-center justify-between border-b-[1px] border-solid border-b-[#1e232d] p-[28px_16px]">
    <div class="flex items-center gap-[16px]">
      <NuxtLink to="/">
        <h1 class="text-[20px] uppercase text-white">star citizen assembly tracker</h1>
      </NuxtLink>
      <span
        class="flex h-full items-center gap-[6px] rounded-[999px] border-[1px] border-solid border-[rgba(1,242,255,0.3)] bg-[rgba(1,242,255,0.1)] px-[6px] font-bold uppercase text-[#00f2ff] before:h-[6px] before:w-[6px] before:rounded-[50%] before:bg-[#00f2ff] before:content-['']">
        live
      </span>
    </div>
    <UserInfo
      v-if="user"
      :user
      @logout-click="logout" />
  </header>
</template>

<style lang="scss" scoped></style>
