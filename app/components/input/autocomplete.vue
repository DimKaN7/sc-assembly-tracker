<script setup lang="ts" generic="T extends PropertyKey">
defineOptions({
  inheritAttrs: false,
})

const { id, fetchFunc, dropModelFunc } = defineProps<{
  id?: string
  placeholder: string
  type: string
  min?: number
  max?: number
  fetchFunc: (p: string) => Promise<TitleValue<T>[]>
  dropModelFunc?: () => void
}>()

const model = defineModel<TitleValue<T>>()
const variantsShown = ref<boolean>(false)
const variants = ref<TitleValue<T>[]>([])
const searchValue = ref<string>()
const variantsCont = useTemplateRef('variants')
const inputId = id ?? useId()

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
      if (dropModelFunc) {
        dropModelFunc()
      } else {
        model.value = undefined
      }
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
  searchValue.value = v.title
}
</script>

<template>
  <FloatingElement
    :shown="variantsShown"
    :distance="5">
    <template #default>
      <input
        :id="inputId"
        v-model="searchValue"
        v-bind="$attrs"
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
