<script setup lang="ts"></script>

<template>
  <header class="header">
    <NuxtLink to="/">
      <h1 class="header__title">star citizen assembly tracker</h1>
    </NuxtLink>
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
