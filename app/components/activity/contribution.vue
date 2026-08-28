<script setup lang="ts">
defineProps<{
  contribution: ContributionResponse
}>()
</script>

<template>
  <div
    class="relative flex before:absolute before:left-0 before:top-0 before:h-full before:w-[4px] before:bg-[#00f2ff] before:content-['']">
    <div class="ml-[20px] flex flex-[1_1_0] flex-col gap-[5px]">
      <span class="font-bold text-white">{{ contribution.assemblyName }}</span>
      <span>
        <span class="font-bold text-white">{{ contribution.username }}</span>
        <span class="font-[LiberationMono] font-bold text-[#00f2ff]">
          {{
            ` ${contribution.amount > 0 ? '+' : ''}${contribution.amount}${contribution.measure} ${contribution.material}`
          }}
        </span>
      </span>
      <span class="font-[LiberationMono] text-[#94a3b8]">
        {{ parseDate(contribution.contributedAt) }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
