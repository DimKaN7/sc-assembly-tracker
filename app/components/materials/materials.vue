<script setup lang="ts">
defineProps<{
  materials: MaterialResponse[]
}>()

defineEmits<{
  add: [materialId: string, amount: number]
}>()
</script>

<template>
  <ul class="materials scroll-y">
    <CardMaterial
      v-for="material in materials"
      :key="material.id"
      :material
      @add="(id, amount) => $emit('add', id, amount)" />
  </ul>
</template>

<style lang="scss" scoped>
.materials {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  padding: 32px 13.5px 32px 32px;
  list-style-type: none;
}
</style>
