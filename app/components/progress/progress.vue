<script setup lang="ts">
defineProps<{
  progressValue: string
}>()
</script>

<template>
  <div
    class="progress"
    :style="{ '--progress': progressValue }" />
</template>

<style lang="scss" scoped>
.progress {
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
</style>
