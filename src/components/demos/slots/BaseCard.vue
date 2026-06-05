<script setup lang="ts">
defineProps<{
  elevated?: boolean
}>()
</script>

<template>
  <div :class="['base-card', { 'base-card--elevated': elevated }]">
    <div v-if="$slots.header" class="base-card__header">
      <slot name="header" />
    </div>
    <div class="base-card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="base-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.base-card {
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
  background: var(--surface);
  width: 240px;
}

.base-card--elevated {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.base-card__header {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border);
  background: #fafbfc;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text);
}

.base-card__body {
  padding: 1rem;
  font-size: 0.825rem;
  color: var(--text-muted);
  line-height: 1.6;
}

.base-card__footer {
  padding: 0.6rem 1rem;
  border-top: 1px solid var(--border);
  background: #fafbfc;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
</style>
