<script setup lang="ts">
const { assembly } = defineProps<{
  assembly: Assembly
}>()

const progressValue = computed<string>(() => `${assembly.progress}%`)
</script>

<template>
  <NuxtLink
    :to="`/assemblies/${assembly.id}`"
    class="assembly">
    <div class="assembly__header">
      <h2 class="assembly__name">{{ assembly.name }}</h2>
      <span class="assembly__description">{{ assembly.description }}</span>
      <span class="assembly__contributors">
        <span class="count">{{ assembly.contributorsCount }}</span>
        <span class="title">
          &nbsp;{{ getNoun(assembly.contributorsCount, 'участник', 'участника', 'участников') }}
        </span>
      </span>
    </div>
    <div class="assembly__progress">
      <div class="inline">
        <span class="title">Прогресс</span>
        <span class="value">{{ progressValue }}</span>
      </div>
      <div
        class="bar"
        :style="{ '--progress': progressValue }" />
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.assembly {
  display: flex;
  flex-direction: column;
  height: fit-content;
  padding: 24px;
  background-color: #151921;
  border: 1px solid #1e232d;
  gap: 16px;

  &__contributors {
    .count {
      color: #fff;
      font-family: LiberationMono;
    }

    .title {
      color: #94a3b8;
    }
  }

  &__progress {
    display: flex;
    flex-direction: column;
    gap: 5px;

    .bar {
      width: 100%;
      height: 5px;
      background-color: #1e232d;
      border-radius: 999px;
      position: relative;
      overflow: hidden;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: var(--progress);
        background-color: #00f2ff;
        transition: width 0.2s ease-in-out;
      }
    }

    .inline {
      justify-content: space-between;
      align-items: flex-end;

      .title,
      .value {
        color: #00f2ff;
        font-weight: 700;
      }

      .value {
        font-size: 20px;
        font-family: LiberationMono;
      }
    }
  }

  &__header {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__name {
    font-size: 16px;
    font-weight: 700;
    color: #fff;
  }

  &__description {
    color: #94a3b8;
  }
}
</style>
