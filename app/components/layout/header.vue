<script setup lang="ts"></script>

<template>
  <header class="header">
    <h1 class="header__title">трэкер сборки</h1>
    <UserInfo />
  </header>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  padding: 28px 16px;
  border-bottom: 1px solid #1e232d;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__title {
    text-transform: uppercase;
    font-size: 20px;
    color: #fff;
  }
}
</style>
