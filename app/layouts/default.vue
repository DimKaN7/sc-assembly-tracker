<script setup lang="ts"></script>

<template>
  <main class="app">
    <LayoutHeader />
    <section class="app__pages">
      <NuxtPage />
    </section>
  </main>
</template>

<style lang="scss" scoped>
.app {
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background-color: #0b0e14;
  overflow: hidden;

  &__pages {
    flex: 1 0 0;
    position: relative;
    display: flex;
    overflow: hidden;
  }
}
</style>
