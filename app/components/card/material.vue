<script setup lang="ts">
const { material, extended = false } = defineProps<{
  material: MaterialResponse
  extended?: boolean
}>()

const emits = defineEmits<{
  add: [materialId: string, amount: number]
  click: [material: MaterialResponse]
  close: []
}>()

const amount = ref<string>('')

const progressValue = computed<string>(() => `${material.progress}%`)
const actualCount = computed<string>(() => `${material.actualCount} ${material.measure}`)
const requiredCount = computed<string>(() => `${material.requiredCount} ${material.measure}`)

const onAddClick = () => {
  if (amount.value) {
    emits('add', material.id, +amount.value)
  }
  amount.value = ''
}
</script>

<template>
  <li :class="['material', extended && 'extended']">
    <button
      v-if="extended"
      class="material__close"
      @click.stop="$emit('close')">
      <ISharedClose />
    </button>
    <button
      class="material__header"
      @click="$emit('click', material)">
      <div class="material__icon">
        <IMaterial />
      </div>
      <span class="material__name">{{ material.name }}</span>
      <span class="material__percent">{{ progressValue }}</span>
    </button>
    <div class="material__progress">
      <div class="inline">
        <span class="material__actual">{{ actualCount }}</span>
        <span class="material__required">{{ requiredCount }}</span>
      </div>
      <Progress :progress-value />
    </div>
    <div class="material__actions">
      <input
        :id="`${material.id}-amount`"
        v-model="amount"
        :placeholder="`Количество(${material.measure})`"
        type="number" />
      <button
        class="material__add"
        @click.stop="onAddClick">
        +
      </button>
    </div>
    <div
      v-if="extended"
      class="material__contributions scroll-y">
      <ul>
        <li
          v-for="c in material.contributions"
          :key="c.userId">
          <span class="name">{{ c.username }}</span>
          <span class="amount">{{ `${c.amount} ${material.measure}` }}</span>
        </li>
      </ul>
    </div>
  </li>
</template>

<style lang="scss" scoped>
.material {
  display: flex;
  flex-direction: column;
  height: fit-content;
  padding: 24px;
  background-color: #151921;
  border: 1px solid #1e232d;
  gap: 16px;
  position: relative;

  &__contributions {
    width: 100%;
    display: flex;
    max-height: 200px;

    > ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      list-style-type: none;
      gap: 10px;

      > li {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .name,
        .amount {
          font-size: 16px;
          color: #fff;
        }

        .amount {
          font-family: LiberationMono;
        }
      }
    }
  }

  &__close {
    position: absolute;
    width: 32px;
    height: 32px;
    top: 0;
    right: 0;
    transform: translate(100%, -100%);
  }

  &.extended {
    width: min(450px, 90%);
  }

  &__add {
    padding: 10px 16px;
    background-color: #00f2ff;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #0b0e14;
    font-weight: 700;
    flex: 0 0 auto;
  }

  &__actions {
    display: flex;
    gap: 8px;

    > input {
      all: unset;
      padding: 9px 12px;
      border: 1px solid #1e232d;
      background-color: #0b0e14;
      color: #fff;
      font-family: LiberationMono;
      flex: 1 1 auto;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }

  &__actual,
  &__required {
    font-family: LiberationMono;
  }

  &__actual {
    color: #94a3b8;
  }

  &__required {
    color: #fff;
  }

  &__progress {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;

    .inline {
      justify-content: space-between;
    }
  }

  &__percent {
    color: #00f2ff;
    font-family: LiberationMono;
    font-size: 16px;
    margin-left: auto;
  }

  &__name {
    @include text-overflow-ellipsis(2);
    color: #fff;
    font-weight: 700;
  }

  &__icon {
    height: 40px;
    flex: 0 0 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border: 1px solid #1e232d;

    background: #1e232d;

    > svg {
      width: 100%;
      height: 100%;
    }
  }

  &__header {
    width: 100%;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    height: 40px;
  }
}
</style>
