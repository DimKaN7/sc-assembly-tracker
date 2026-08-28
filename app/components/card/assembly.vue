<script setup lang="ts">
import PersonsIcon from '@gravity-ui/icons/svgs/persons.svg'
import PersonsLockIcon from '@gravity-ui/icons/svgs/persons-lock.svg'

const { assembly } = defineProps<{
  assembly: AssemblyResponse
}>()

const progressValue = computed<string>(() => `${assembly.progress}%`)

const accessIcon = computed(() =>
  assembly.isPublic
    ? {
        icon: PersonsIcon,
        description: 'Публичная сборка',
      }
    : {
        icon: PersonsLockIcon,
        description: 'Приватная сборка',
      },
)
</script>

<template>
  <NuxtLink
    :to="`/${assembly.id}`"
    class="flex h-fit flex-col gap-[16px] border-[1px] border-solid border-[#1e232d] bg-[#151921] p-[24px]">
    <div class="flex flex-col gap-[5px]">
      <div class="flex items-center justify-between">
        <h2 class="text-[16px] font-bold text-white">{{ assembly.name }}</h2>
        <FloatingTooltip :text="accessIcon.description">
          <component
            :is="accessIcon.icon"
            class="h-[24px] text-white" />
        </FloatingTooltip>
      </div>
      <span class="text-[#94a3b8]">{{ assembly.description }}</span>
      <span>
        <span class="font-[LiberationMono] text-white">{{ assembly.contributorsCount }}</span>
        <span class="text-[#94a3b8]">
          &nbsp;{{ getNoun(assembly.contributorsCount, 'участник', 'участника', 'участников') }}
        </span>
      </span>
    </div>
    <div class="flex flex-col gap-[5px]">
      <div class="flex items-end justify-between">
        <span class="font-bold text-[#00f2ff]">Прогресс</span>
        <span class="font-[LiberationMono] text-[16px] font-[20px] text-[#00f2ff]">
          {{ progressValue }}
        </span>
      </div>
      <Progress :progress-value />
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped></style>
