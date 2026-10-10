<script setup lang="ts">
const assembliesStore = useAssembliesStore()
const { assembly } = storeToRefs(assembliesStore)

useSeoMeta({
  title: () => `Редактирование сборки${assembly.value ? ` "${assembly.value.name}"` : ''}`,
})

if (!assembly.value) {
  await navigateTo(`/assemblies`)
} else if (!assembly.value.isOwner) {
  await navigateTo(`/assembly/${assembly.value?.id}`)
}

const assemblyToEdit = ref<UpsertAssemblyDTO>({
  id: assembly.value!.id,
  name: assembly.value!.name,
  description: assembly.value!.description,
  isPublic: assembly.value!.isPublic,
  materials: assembly.value!.materials.map((m) => ({
    id: m.id,
    amount: m.requiredCount,
    material: {
      data: m.measure,
      title: m.name,
      value: m.id,
    },
  })),
  users: assembly.value!.users.map((u) => ({
    id: u.value,
    user: u,
  })),
})

const onSaveClick = async () => {
  const response = await upsertAssembly(
    assemblyToEdit.value.id,
    assemblyToEdit.value.name,
    assemblyToEdit.value.description,
    assemblyToEdit.value.isPublic,
    assemblyToEdit.value.users.map((u) => u.user.value),
    assemblyToEdit.value.materials.map((m) => ({
      id: m.material.value,
      amount: m.amount,
    })),
  )
  if (response) {
    assembly.value = response
  }
}
</script>

<template>
  <AssemblyUpsert
    v-model="assemblyToEdit"
    @save="onSaveClick" />
</template>

<style lang="scss" scoped></style>
