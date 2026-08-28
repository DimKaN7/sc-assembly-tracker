<script setup lang="ts">
const assembliesStore = useAssembliesStore()
const { materials } = storeToRefs(assembliesStore)
const { addMaterial, deleteContribution, editContribution } = assembliesStore

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
    class="scroll-y grid list-none grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-[24px] p-[32px_13.5px_32px_32px]">
    <CardMaterial
      v-for="material in materials"
      :key="material.id"
      :material
      :user-id="user.id"
      @add="addMaterial"
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
        @add="addMaterial"
        @edit="editContribution"
        @close="onMaterialClose"
        @delete="deleteContribution" />
    </div>
  </Teleport>
</template>

<style lang="scss" scoped></style>
