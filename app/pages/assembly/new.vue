<script setup lang="ts">
import PlusIcon from '@gravity-ui/icons/svgs/plus.svg'

useSeoMeta({
  title: 'Новая сборка',
})

const name = ref<string>('')
const description = ref<string>('')
const materials = ref<NewAssemblyMaterial[]>([])

const onMaterialAddClick = () => {
  materials.value = [
    {
      id: crypto.randomUUID(),
      material: {
        title: '',
        value: '',
        data: '',
      },
      amount: 0,
    },
    ...materials.value,
  ]
}
</script>

<template>
  <div class="scroll-y flex size-full flex-col gap-[32px] p-[32px_27px_32px]">
    <div class="flex flex-col gap-[24px]">
      <span class="text-[16px] font-bold text-white">Основная информация</span>
      <div class="flex flex-col gap-[16px]">
        <InputBase
          v-model="name"
          class="input-base"
          placeholder="Название сборки"
          type="text" />
        <InputBase
          v-model="description"
          class="input-base"
          placeholder="Описание сборки"
          type="text" />
      </div>
    </div>
    <div class="flex flex-col gap-[24px]">
      <div class="flex items-center justify-between">
        <span class="text-[16px] font-bold text-white">Материалы</span>
        <button
          class="btn-accept-with-paddings gap-[8px]"
          @click="onMaterialAddClick">
          <PlusIcon class="h-[16px] w-[16px] text-[#0b0e14]" />
          <span>Добавить материал</span>
        </button>
      </div>
      <div class="flex flex-col gap-[16px]">
        <MaterialsTable v-model="materials" />
      </div>
    </div>
    <button class="btn-accept-with-paddings self-end">Сохранить</button>
  </div>
</template>

<style lang="scss" scoped></style>
