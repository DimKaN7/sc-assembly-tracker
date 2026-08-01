<script setup lang="ts">
const assembliesStore = useAssembliesStore()
const { contributions, assembly } = storeToRefs(assembliesStore)
const { loadContributions } = assembliesStore

const sentinel = useTemplateRef('sentinel')

useIntersectionObserver(sentinel, async ([entry]) => {
  if (entry?.isIntersecting && contributions.value?.data.length) {
    await loadContributions(assembly.value?.id, contributions.value.data.at(-1)!.id)
  }
})
</script>

<template>
  <aside class="activity">
    <div class="activity__header">
      <IActivity />
      <span>Лента активности</span>
    </div>
    <div class="activity__content">
      <ul
        v-if="contributions?.data.length"
        class="activity__list scroll-y">
        <li
          v-for="contribution in contributions.data"
          :key="contribution.id">
          <ActivityContribution :contribution />
        </li>
        <li
          ref="sentinel"
          class="sentinel" />
      </ul>
      <span
        v-else
        class="activity__empty">
        Нет взносов
      </span>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.activity {
  flex: 0 0 320px;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #1e232d;

  .sentinel {
    width: 100%;
    height: 0px;
  }

  &__list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    list-style-type: none;
  }

  &__empty {
    margin: auto;
    color: #94a3b8;
    font-weight: 700;
    font-size: 20px;
  }

  &__content {
    flex: 1 1 0;
    display: flex;
    overflow: hidden;
    padding: 0 19px 24px 24px;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 24px;

    > span {
      font-weight: 700;
      color: #fff;
      text-transform: uppercase;
    }

    > svg {
      width: 16px;
      height: 16px;
    }
  }
}
</style>
