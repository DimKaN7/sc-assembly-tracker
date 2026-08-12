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
        class="autocomplete"
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
        class="variants scroll-y">
        <li
          v-for="v in variants"
          :key="v.value">
          <button
            class="variant"
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

.variants {
  display: flex;
  flex-direction: column;
  list-style-type: none;
  background-color: #1e232d;
  padding-inline: 10px;
  max-height: 200px;
  min-width: 200px;

  .variant {
    width: 100%;
    color: #fff;
    padding-block: 10px;
  }
}

.autocomplete {
  all: unset;
  flex: 1 0 0;
  padding: 9px 12px;
  border: 1px solid #1e232d;
  background-color: #0b0e14;
  color: #fff;
  font-family: LiberationMono;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>
