<script setup lang="ts">
const { material, extended = false } = defineProps<{
  material: MaterialResponse
  userId: string
  extended?: boolean
}>()

const emits = defineEmits<{
  add: [materialId: string, amount: number, stationId: string | undefined]
  click: [material: MaterialResponse]
  close: []
  edit: [contributionId: string, newAmount: number, newStationId: string | undefined]
  delete: [contributionId: string]
}>()

const amount = ref<number>()
const station = ref<TitleValue<string>>()
const contributionId = ref<string>()

const progressValue = computed<string>(() => `${material.progress}%`)
const actualCount = computed<string>(() => `${material.actualCount} ${material.measure}`)
const requiredCount = computed<string>(() => `${material.requiredCount} ${material.measure}`)

const onAddClick = () => {
  if (amount.value && amount.value > 0) {
    if (contributionId.value) {
      emits('edit', contributionId.value, amount.value, station.value?.value)
    } else {
      emits('add', material.id, +amount.value, station.value?.value)
      amount.value = undefined
      station.value = undefined
    }
  }
}

const onCancelClick = () => {
  contributionId.value = undefined
  amount.value = undefined
  station.value = undefined
}

const onEditClick = (contribution: MaterialContributionResponse) => {
  contributionId.value = contribution.id
  amount.value = contribution.amount
  station.value = contribution.station
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
      <div class="material__inputs">
        <input
          :id="`${material.id}-amount`"
          v-model="amount"
          :placeholder="`Количество(${material.measure})`"
          :min="0"
          type="number" />
        <InputAutocomplete
          :id="`${material.id}-station`"
          v-model="station"
          placeholder="Станция"
          type="text"
          :fetch-func="findStations" />
      </div>
      <div class="material__buttons">
        <button
          class="material__add"
          title="Сохранить"
          @click.stop="onAddClick">
          <ISharedSave />
        </button>
        <button
          v-if="contributionId"
          class="material__add"
          title="Отмена"
          @click.stop="onCancelClick">
          <ISharedCancel />
        </button>
      </div>
    </div>
    <CardMaterialExtension
      v-if="extended"
      :contributions="material.contributions"
      :measure="material.measure"
      :user-id
      @edit="onEditClick"
      @delete="$emit('delete', $event.id)" />
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

  &__buttons {
    display: flex;
    flex-direction: column;
    flex: 0 0 36px;
    gap: 8px;
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
    width: min(800px, 90%);
  }

  &__add {
    height: 36px;
    background-color: #00f2ff;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #0b0e14;
    font-weight: 700;
    flex: 0 0 36px;
    border-radius: 10px;

    > svg {
      width: 20px;
    }
  }

  &__inputs {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1 1 0;

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

  &__actions {
    display: flex;
    gap: 8px;
    align-items: flex-start;
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
