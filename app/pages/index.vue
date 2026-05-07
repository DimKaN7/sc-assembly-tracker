<script setup lang="ts">
useSeoMeta({
  title: 'Главная страница',
})

const { data } = useCustomFetch<Assembly[]>('/assemblies')
</script>

<template>
  <section class="main">{{ data }}</section>
</template>

<style lang="scss" scoped></style>
