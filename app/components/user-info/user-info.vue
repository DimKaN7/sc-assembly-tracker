<script setup lang="ts"></script>

<template>
  <div class="user">
    <span class="user__name">dimka_n7</span>
    <button class="user__logout">
      <IHeaderLogout />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.user {
  display: flex;
  align-items: center;
  gap: 24px;

  &__name {
    color: #94a3b8;
    font-size: 16px;
  }

  &__logout {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
