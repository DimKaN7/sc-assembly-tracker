<script setup lang="ts"></script>

<template>
  <main class="flex h-dvh w-full flex-col overflow-hidden bg-[#0b0e14]">
    <LayoutHeader />
    <section class="flex flex-[1_0_0] overflow-hidden">
      <LayoutSidebar />
      <div class="flex-[1_1_0]">
        <NuxtPage />
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped></style>
