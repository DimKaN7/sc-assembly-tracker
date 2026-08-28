<script setup lang="ts" generic="T extends PropertyKey">
const { fetchFunc } = defineProps<{
  id: string
  placeholder: string
  type: string
  min?: number
  max?: number
  fetchFunc: (p: string) => Promise<TitleValue<T>[]>
}>()

const model = defineModel<TitleValue<T>>()
const variantsShown = ref<boolean>(false)
const variants = ref<TitleValue<T>[]>([])
const searchValue = ref<string>()
const variantsCont = useTemplateRef('variants')

onClickOutside(variantsCont, () => {
  variantsShown.value = false
})

const onInput = useDebounceFn(async () => {
  if (searchValue.value && searchValue.value.length > 2) {
    variantsShown.value = true
    const response = await fetchFunc(searchValue.value)
    if (response) {
      variants.value = response
    }
  } else {
    if (!searchValue.value) {
      model.value = undefined
    }

    variantsShown.value = false
    variants.value = []
  }
}, 500)

const onFocus = () => {
  if (searchValue.value && !variantsShown.value && variants.value.length) {
    variantsShown.value = true
  }
}

const onVariantClick = (v: TitleValue<T>) => {
  variantsShown.value = false
  model.value = v
}

watch(model, () => {
  searchValue.value = model.value?.title
})
</script>

<template>
  <FloatingElement
    :shown="variantsShown"
    :distance="5">
    <template #default>
      <input
        :id
        v-model="searchValue"
        class="placeholder:text-[rgba(255, 255, 255, 0.5)] no-spinner flex-[1_0_0] border-[1px] border-solid border-[#1e232d] bg-[#0b0e14] p-[9px_12px] font-[LiberationMono] text-white"
        :placeholder
        :min
        :max
        :type
        @input="onInput"
        @focus="onFocus" />
    </template>
    <template #popper>
      <ul
        ref="variants"
        class="scroll-y flex max-h-[200px] min-w-[200px] list-none flex-col bg-[#1e232d] p-[0_5px_0_10px]">
        <li
          v-for="v in variants"
          :key="v.value">
          <button
            class="w-full py-[10px] text-white"
            @click="onVariantClick(v as TitleValue<T>)">
            {{ v.title }}
          </button>
        </li>
      </ul>
    </template>
  </FloatingElement>
</template>

<style lang="scss" scoped>
.v-popper {
  display: flex !important;
}
</style>
