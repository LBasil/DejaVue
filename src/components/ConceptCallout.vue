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
  background: rgba(0, 0, 0, 0.07);
  padding: 0.1em 0.3em;
  border-radius: 3px;
}

html.dark .callout__body :deep(code) {
  background: rgba(255, 255, 255, 0.08);
}

.callout__body :deep(strong) {
  color: var(--text);
  font-weight: 600;
}

/* ── Variants ───────────────────────────────────────── */
.callout--why {
  background: var(--callout-why-bg);
  border-color: #8b5cf6;
}
.callout--why .callout__label { color: var(--callout-why-fg); }

.callout--tip {
  background: var(--callout-tip-bg);
  border-color: #eab308;
}
.callout--tip .callout__label { color: var(--callout-tip-fg); }

.callout--info {
  background: var(--callout-info-bg);
  border-color: #3b82f6;
}
.callout--info .callout__label { color: var(--callout-info-fg); }

.callout--warning {
  background: var(--callout-warning-bg);
  border-color: #f97316;
}
.callout--warning .callout__label { color: var(--callout-warning-fg); }
</style>
