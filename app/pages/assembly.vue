<script setup lang="ts">
const route = useRoute()
const withoutActiviryRoutes: string[] = ['assembly-new', 'assembly-id-edit']

const withActivity = computed<boolean>(() => !withoutActiviryRoutes.includes(route.name as string))
</script>

<template>
  <NuxtLayout
    name="with-activity"
    :with-activity />
</template>

<style lang="scss" scoped></style>
