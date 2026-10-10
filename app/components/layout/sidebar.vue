<script setup lang="ts"></script>

<template>
  <aside
    class="flex h-full w-[64px] flex-[0_0_64px] flex-row gap-[32px] border-r-[1px] border-solid border-r-[#1E232D] bg-[rgba(21,25,33,0.30)] p-[8px]">
    <ul class="flex w-full list-none flex-col gap-[24px]">
      <li
        v-for="item in sidebarItems"
        :key="item.to">
        <FloatingTooltip :text="item.title">
          <CustomLink
            class="group flex items-center justify-center p-[12px] hover:bg-[#01F2FF1A] [&.router-link-active]:bg-[#01F2FF1A]"
            :to="item.to"
            :selected-routes-names="item.selectedRoutesNames"
            :selected-routes-paths="item.selectedRoutesPaths">
            <component
              :is="item.icon"
              class="text-[#94A3B8] group-hover:text-[#00F2FF] group-[.router-link-active]:text-[#00F2FF]" />
          </CustomLink>
        </FloatingTooltip>
      </li>
    </ul>
  </aside>
</template>

<style lang="scss" scoped></style>
