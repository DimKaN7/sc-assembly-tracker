<script setup lang="ts">
defineProps<{
  contribution: ContributionResponse
}>()
</script>

<template>
  <div class="contribution">
    <div class="contribution__content">
      <span class="contribution__assembly">{{ contribution.assemblyName }}</span>
      <span class="info">
        <span class="info__username">{{ contribution.username }}</span>
        <span class="info__material">
          {{
            ` ${contribution.amount > 0 ? '+' : ''}${contribution.amount}${contribution.measure} ${contribution.material}`
          }}
        </span>
      </span>
      <span class="contribution__date">
        {{ parseDate(contribution.contributedAt) }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.contribution {
  display: flex;
  position: relative;

  &__assembly {
    font-weight: 700;
    color: #fff;
  }

  &__date {
    font-family: LiberationMono;
    color: #94a3b8;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 5px;
    flex: 1 1 0;
    margin-left: 20px;

    .info {
      &__username,
      &__material {
        font-weight: 700;
      }

      &__username {
        color: #fff;
      }

      &__material {
        color: #00f2ff;
        font-family: LiberationMono;
      }
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: #00f2ff;
  }
}
</style>
