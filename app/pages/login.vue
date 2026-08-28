<script setup lang="ts">
definePageMeta({
  layout: 'empty',
})

useSeoMeta({
  title: 'Авторизация',
})

const { authUrl } = useRuntimeConfig().public

const onAuthClick = () => {
  window.location.href = authUrl
}
</script>

<template>
  <div class="flex h-dvh w-full flex-col items-center justify-center overflow-hidden bg-[#0b0e14]">
    <div
      class="flex w-[90%] max-w-[460px] flex-col gap-[16px] border-[1px] border-solid border-[#1e232d] bg-[#151921] p-[24px]">
      <span class="text-balance text-center font-bold text-white">
        Для работы приложения необходимо авторизоваться в Discord(понадобится включенный запрет/впн)
      </span>
      <button
        class="flex items-center justify-center self-center bg-[#00f2ff] p-[10px_16px] font-bold text-[#0b0e14]"
        @click="onAuthClick">
        Авторизоваться
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
