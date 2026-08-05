<script setup lang="ts">
defineProps<{
  materials: MaterialResponse[]
}>()

defineEmits<{
  add: [materialId: string, amount: number]
}>()

const selectedMaterial = ref<MaterialResponse>()

const onMaterialClick = (material: MaterialResponse) => {
  selectedMaterial.value = material
}

const onMaterialClose = () => {
  selectedMaterial.value = undefined
}
</script>

<template>
  <ul class="materials scroll-y">
    <CardMaterial
      v-for="material in materials"
      :key="material.id"
      :material
      @add="(id, amount) => $emit('add', id, amount)"
      @click="onMaterialClick" />
  </ul>
  <Teleport to="#teleports">
    <div
      v-if="selectedMaterial"
      class="backdrop">
      <CardMaterial
        extended
        :material="selectedMaterial"
        @add="(id, amount) => $emit('add', id, amount)"
        @close="onMaterialClose" />
    </div>
  </Teleport>
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
