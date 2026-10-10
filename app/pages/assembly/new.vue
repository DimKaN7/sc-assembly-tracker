<script setup lang="ts">
useSeoMeta({
  title: 'Новая сборка',
})

const assembliesStore = useAssembliesStore()
const { assembly } = storeToRefs(assembliesStore)

const newAssembly = ref<UpsertAssemblyDTO>({
  id: '',
  name: '',
  description: '',
  isPublic: false,
  materials: [],
  users: [],
})

const onSaveClick = async () => {
  const response = await upsertAssembly(
    undefined,
    newAssembly.value.name,
    newAssembly.value.description,
    newAssembly.value.isPublic,
    newAssembly.value.users.map((u) => u.user.value),
    newAssembly.value.materials.map((m) => ({
      id: m.material.value,
      amount: m.amount,
    })),
  )
  if (response) {
    assembly.value = response
    await navigateTo(`/assembly/${response.id}`)
  }
}
</script>

<template>
  <AssemblyUpsert
    v-model="newAssembly"
    @save="onSaveClick" />
</template>

<style lang="scss" scoped></style>
