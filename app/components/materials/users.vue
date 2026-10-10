<script setup lang="ts">
const model = defineModel<NewAssemblyUser[]>({
  required: true,
})

const onUserUpdate = (currentUser: NewAssemblyUser, newUser: TitleValue<string> | undefined) => {
  currentUser.user = {
    value: newUser?.value ?? '',
    title: newUser?.title ?? '',
  }
}

const onUserDelete = (id: string) => {
  const index = model.value.findIndex((u) => u.id === id)
  if (index !== -1) {
    model.value.splice(index, 1)
  }
}
</script>

<template>
  <span
    v-if="!model.length"
    class="text-center text-[#94A3B8]">
    Добавьте участников
  </span>
  <div
    v-else
    class="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-[10px]">
    <AssemblyUser
      v-for="user in model"
      :key="user.id"
      :user
      @update="onUserUpdate(user, $event)"
      @delete="onUserDelete($event)" />
  </div>
</template>

<style lang="scss" scoped></style>
