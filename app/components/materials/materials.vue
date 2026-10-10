<script setup lang="ts">
const assembliesStore = useAssembliesStore()
const { assembly, materials } = storeToRefs(assembliesStore)
const { addMaterial, deleteContribution, editContribution } = assembliesStore

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const selectedMaterial = ref<MaterialResponse>()

const onMaterialClick = (material: MaterialResponse) => {
  if (assembly.value && !assembly.value.isArchived) {
    selectedMaterial.value = material
  }
}

const onMaterialClose = () => {
  selectedMaterial.value = undefined
}
</script>

<template>
  <ul
    v-if="user"
    class="scroll-y grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-[24px] p-[32px_13.5px_32px_32px]">
    <CardMaterial
      v-for="material in materials"
      :key="material.id"
      :archived="assembly!.isArchived"
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
        :archived="assembly!.isArchived"
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
