<script setup lang="ts">
interface Item {
  id: string | number
  [key: string]: unknown
}

withDefaults(
  defineProps<{
    items: Item[]
    loading?: boolean
  }>(),
  { loading: false },
)
</script>

<template>
  <div class="scoped-list">
    <div v-if="loading" class="scoped-list__state">
      <span class="scoped-list__spinner" />
      Chargement…
    </div>
    <div v-else-if="items.length === 0" class="scoped-list__state">
      <slot name="empty">Aucun élément à afficher.</slot>
    </div>
    <ul v-else class="scoped-list__list">
      <li
        v-for="(item, index) in items"
        :key="item.id"
        class="scoped-list__item"
      >
        <slot :item="item" :index="index" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.scoped-list {
  width: 100%;
  max-width: 420px;
}

.scoped-list__state {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.825rem;
  color: var(--text-muted);
  padding: 1rem 0;
}

.scoped-list__spinner {
  display: inline-block;
  width: 0.875rem;
  height: 0.875rem;
  border: 2px solid var(--border);
  border-top-color: var(--vue);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.scoped-list__list {
  list-style: none;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}

.scoped-list__item {
  border-bottom: 1px solid var(--border);
}

.scoped-list__item:last-child {
  border-bottom: none;
}
</style>
