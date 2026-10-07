<script setup lang="ts">
useSeoMeta({
  title: 'Новая сборка',
})

const assembly = ref<UpsertAssemblyDTO>({
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
    assembly.value.name,
    assembly.value.description,
    assembly.value.isPublic,
    assembly.value.users.map((u) => u.user.value),
    assembly.value.materials.map((m) => ({
      id: m.material.value,
      amount: m.amount,
    })),
  )
  if (response) {
    await navigateTo(`/assembly/${response}`)
  }
}
</script>

<template>
  <AssemblyUpsert
    v-model="assembly"
    @save="onSaveClick" />
</template>

<style lang="scss" scoped></style>
