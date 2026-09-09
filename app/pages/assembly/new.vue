<script setup lang="ts">
import PlusIcon from '@gravity-ui/icons/svgs/plus.svg'

useSeoMeta({
  title: 'Новая сборка',
})

const name = ref<string>('')
const description = ref<string>('')
const isPublic = ref<boolean>(false)
const materials = ref<NewAssemblyMaterial[]>([])
const users = ref<NewAssemblyUser[]>([])
const type = ref<'materials' | 'users'>('materials')

const addButtonText = computed<string>(() =>
  type.value === 'materials' ? 'Добавить материал' : 'Добавить участника',
)

const onAddClick = () => {
  if (type.value === 'materials') {
    materials.value = [
      {
        id: `added-${crypto.randomUUID()}`,
        material: {
          title: '',
          value: '',
          data: '',
        },
        amount: 0,
      },
      ...materials.value,
    ]
  } else {
    users.value.push({
      id: `added-${crypto.randomUUID()}`,
      user: {
        title: '',
        value: '',
      },
    })
  }
}
</script>

<template>
  <div class="scroll-y flex size-full flex-col gap-[32px] p-[32px_27px_32px]">
    <div class="flex flex-col gap-[24px]">
      <div class="flex items-center justify-between">
        <span class="text-[16px] font-bold text-white">Основная информация</span>
        <button class="btn-accept-with-paddings self-end">Сохранить</button>
      </div>
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
        <InputToggle
          v-model="isPublic"
          toggle-classes="h-[24px] w-[44px]"
          title="Публичная сборка"
          description="Публичная сборка видна всем пользователям" />
      </div>
    </div>
    <div class="flex flex-col gap-[16px]">
      <div class="flex gap-[8px]">
        <button
          :class="type === 'materials' ? 'btn-accept-with-paddings' : 'btn-cancel-with-paddings'"
          @click="type = 'materials'">
          Материалы
        </button>
        <button
          :class="type === 'users' ? 'btn-accept-with-paddings' : 'btn-cancel-with-paddings'"
          @click="type = 'users'">
          Участники
        </button>
      </div>
      <div class="flex flex-col gap-[24px]">
        <button
          class="btn-accept-with-paddings gap-[8px] self-start"
          @click="onAddClick">
          <PlusIcon class="h-[16px] w-[16px] text-[#0b0e14]" />
          <span>{{ addButtonText }}</span>
        </button>
        <div class="flex flex-col gap-[16px]">
          <MaterialsTable
            v-if="type === 'materials'"
            v-model="materials" />
          <MaterialsUsers
            v-else
            v-model="users" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
