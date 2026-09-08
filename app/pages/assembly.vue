<script setup lang="ts"></script>

<template>
  <NuxtLayout
    name="with-activity"
    :with-activity="$route.name !== 'assembly-new'" />
</template>

<style lang="scss" scoped></style>
