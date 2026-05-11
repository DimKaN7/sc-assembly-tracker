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
  <div class="login">
    <div class="login__container">
      <span>
        Для работы приложения необходимо авторизоваться в Discord(понадобится включенный запрет/впн)
      </span>
      <button @click="onAuthClick">Авторизоваться</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background-color: #0b0e14;
  overflow: hidden;
  align-items: center;
  justify-content: center;

  &__container {
    width: min(460px, 90%);
    display: flex;
    flex-direction: column;
    padding: 24px;
    background-color: #151921;
    border: 1px solid #1e232d;
    gap: 16px;

    > span {
      color: #fff;
      font-weight: 700;
      text-align: center;
      text-wrap: balance;
    }

    > button {
      align-self: center;
      padding: 10px 16px;
      background-color: #00f2ff;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #0b0e14;
      font-weight: 700;
    }
  }
}
</style>
