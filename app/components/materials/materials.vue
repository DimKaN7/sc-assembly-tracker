<script setup lang="ts">
const assembliesStore = useAssembliesStore()
const { materials } = storeToRefs(assembliesStore)
const { addMaterial, deleteContribution } = assembliesStore

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const selectedMaterial = ref<MaterialResponse>()

const onMaterialClick = (material: MaterialResponse) => {
  selectedMaterial.value = material
}

const onMaterialClose = () => {
  selectedMaterial.value = undefined
}
</script>

<template>
  <ul
    v-if="user"
    class="materials scroll-y">
    <CardMaterial
      v-for="material in materials"
      :key="material.id"
      :material
      :user-id="user.id"
      @add="(id, amount) => addMaterial(id, amount)"
      @click="onMaterialClick" />
  </ul>
  <Teleport to="#teleports">
    <div
      v-if="selectedMaterial && user"
      class="backdrop">
      <CardMaterial
        extended
        :material="selectedMaterial"
        :user-id="user.id"
        @add="(id, amount) => addMaterial(id, amount)"
        @close="onMaterialClose"
        @delete="deleteContribution" />
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
