<script setup lang="ts" generic="T extends PropertyKey">
const { placeholder = 'Введите значение' } = defineProps<{
  placeholder?: string
  type: string
}>()

const model = defineModel<T>()

const id = useId()
</script>

<template>
  <input
    :id
    v-model="model"
    class="placeholder:text-[rgba(255, 255, 255, 0.5)]"
    :placeholder
    :type />
</template>

<style lang="scss" scoped></style>
