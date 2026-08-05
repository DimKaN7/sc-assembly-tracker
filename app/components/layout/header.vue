<script setup lang="ts">
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { logout } = userStore
</script>

<template>
  <header class="header">
    <div class="inline">
      <NuxtLink to="/">
        <h1 class="header__title">star citizen assembly tracker</h1>
      </NuxtLink>
      <span class="header__live">live</span>
    </div>
    <UserInfo
      v-if="user"
      :user
      @logout-click="logout" />
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

  .inline {
    gap: 16px;
    align-items: center;
  }

  &__live {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 6px;
    padding-inline: 6px;
    border: 1px solid rgba(1, 242, 255, 0.3);
    border-radius: 999px;
    background-color: rgba(1, 242, 255, 0.1);
    text-transform: uppercase;
    font-weight: 700;
    color: #00f2ff;

    &::before {
      content: '';
      width: 6px;
      height: 6px;
      background-color: #00f2ff;
      border-radius: 50%;
    }
  }

  &__title {
    text-transform: uppercase;
    font-size: 20px;
    color: #fff;
  }
}
</style>
