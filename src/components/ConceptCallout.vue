<script setup lang="ts">
type CalloutType = 'why' | 'tip' | 'info' | 'warning'

withDefaults(
  defineProps<{
    type?: CalloutType
    title?: string
  }>(),
  { type: 'info' },
)

const config: Record<CalloutType, { icon: string; label: string }> = {
  why:     { icon: '🤔', label: 'Pourquoi ?' },
  tip:     { icon: '💡', label: 'Astuce' },
  info:    { icon: 'ℹ️',  label: 'En bref' },
  warning: { icon: '⚠️', label: 'Attention' },
}
</script>

<template>
  <div :class="['callout', `callout--${type}`]">
    <div class="callout__header">
      <span class="callout__icon" aria-hidden="true">{{ config[type].icon }}</span>
      <strong class="callout__label">{{ title ?? config[type].label }}</strong>
    </div>
    <div class="callout__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.callout {
  border-radius: var(--radius);
  border-left: 3px solid;
  padding: 0.875rem 1rem;
  margin-bottom: 1.25rem;
  font-size: 0.875rem;
  line-height: 1.65;
}

.callout__header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.35rem;
}

.callout__icon {
  font-size: 0.9rem;
  line-height: 1;
}

.callout__label {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.callout__body {
  color: var(--text-muted);
}

.callout__body :deep(code) {
  font-family: var(--mono);
  font-size: 0.82em;
  background: rgba(0, 0, 0, 0.06);
  padding: 0.1em 0.3em;
  border-radius: 3px;
}

.callout__body :deep(strong) {
  color: var(--text);
  font-weight: 600;
}

/* ── Variants ───────────────────────────────────────── */
.callout--why {
  background: #f5f3ff;
  border-color: #8b5cf6;
}

.callout--why .callout__label {
  color: #7c3aed;
}

.callout--tip {
  background: #fefce8;
  border-color: #eab308;
}

.callout--tip .callout__label {
  color: #a16207;
}

.callout--info {
  background: #eff6ff;
  border-color: #3b82f6;
}

.callout--info .callout__label {
  color: #1d4ed8;
}

.callout--warning {
  background: #fff7ed;
  border-color: #f97316;
}

.callout--warning .callout__label {
  color: #c2410c;
}
</style>
