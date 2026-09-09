<script setup lang="ts">
import TrashBinIcon from '@gravity-ui/icons/svgs/trash-bin.svg'

const model = defineModel<NewAssemblyMaterial[]>({
  default: () => [],
})

const dropMaterial = (m: NewAssemblyMaterial): void => {
  m.material = {
    data: '',
    title: '',
    value: '',
  }
  m.amount = 0
}

const onMaterialDelete = (material: NewAssemblyMaterial): void => {
  const index = model.value.findIndex((m) => m.id == material.id)
  if (index !== -1) {
    model.value.splice(index, 1)
  }
}
</script>

<template>
  <span
    v-if="!model.length"
    class="text-center text-[#94A3B8]">
    Добавьте материалы
  </span>
  <table
    v-else
    class="w-full">
    <thead>
      <tr class="text-[#94A3B8]">
        <td class="material-cell w-[70%]">Название материала</td>
        <td class="material-cell w-[12%]">Ед. изм.</td>
        <td class="material-cell w-[12%]">Количество</td>
        <td class="material-cell w-[6%]">Действия</td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="m in model"
        :key="m.id"
        class="text-[#94A3B8]">
        <td class="material-cell">
          <InputAutocomplete
            v-model="m.material"
            class="placeholder:text-[rgba(255, 255, 255, 0.5)] no-spinner w-full bg-[#0b0e14] p-[4px_12px] font-[LiberationMono] text-white"
            placeholder="Введите название материала"
            type="text"
            :fetch-func="findMaterials"
            :drop-model-func="() => dropMaterial(m)" />
        </td>
        <td class="material-cell text-white">
          {{ m.material.data }}
        </td>
        <td class="material-cell">
          <InputBase
            v-model="m.amount"
            class="no-spinner input-base border-none p-0"
            placeholder="Введите количество"
            type="number" />
        </td>
        <td class="material-cell">
          <FloatingTooltip text="Удалить">
            <button
              class="mx-[auto] flex h-[28px] w-[28px] items-center justify-center p-[4px]"
              title="Удалить"
              @click="onMaterialDelete(m)">
              <TrashBinIcon class="h-full text-[#EF4444]" />
            </button>
          </FloatingTooltip>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped></style>
