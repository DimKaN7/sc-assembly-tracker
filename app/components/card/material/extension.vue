<script setup lang="ts">
defineProps<{
  contributions: MaterialContributionResponse[]
  measure: string
  userId: string
}>()

defineEmits<{
  edit: [c: MaterialContributionResponse]
  delete: [c: MaterialContributionResponse]
}>()
</script>

<template>
  <div class="extension scroll-y">
    <table>
      <thead>
        <tr>
          <th :style="{ width: '20%' }">Внес</th>
          <th :style="{ width: '10%' }">Количество</th>
          <th :style="{ width: '20%' }">Дата</th>
          <th :style="{ width: '40%' }">Станция</th>
          <th :style="{ width: '10%' }">Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="c in contributions"
          :key="c.id">
          <td>{{ c.username }}</td>
          <td>{{ c.amount }}</td>
          <td>{{ parseDate(c.addedAt) }}</td>
          <td>{{ c.station?.title ?? '-' }}</td>
          <td>
            <div
              v-if="c.userId === userId"
              class="extension__actions">
              <button
                class="extension__action"
                title="Редактировать"
                @click="$emit('edit', c)">
                <ISharedEdit />
              </button>
              <button
                class="extension__action"
                title="Удалить"
                @click="$emit('delete', c)">
                <ISharedDelete />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.extension {
  width: 100%;
  display: flex;
  max-height: 200px;

  &__action {
    display: flex;
    align-items: center;
    justify-content: center;

    > svg {
      height: 100%;
    }
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    height: 100%;
    gap: 10px;
  }

  > table {
    flex: 1 0 0;
    color: #94a3b8;
    border-collapse: collapse;

    thead {
      position: sticky;
      top: 0;
      background-color: #151921;
      color: #fff;

      tr {
        th {
          padding: 5px;
        }
      }
    }

    tbody {
      tr {
        td {
          padding: 10px 5px;
          height: 40px;
        }
      }
    }
  }

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

      .info {
        display: flex;
        align-items: flex-end;
        gap: 10px;

        &__name,
        &__amount {
          font-size: 16px;
          color: #fff;
        }

        &__amount {
          font-family: LiberationMono;
        }
      }
    }
  }
}
</style>
