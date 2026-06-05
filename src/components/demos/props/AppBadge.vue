<script setup lang="ts">
type Variant = 'success' | 'warning' | 'danger' | 'info'
type Size = 'sm' | 'md' | 'lg'

withDefaults(
  defineProps<{
    label: string
    variant?: Variant
    size?: Size
    dot?: boolean
  }>(),
  {
    variant: 'info',
    size: 'md',
    dot: false,
  },
)
</script>

<template>
  <span :class="['badge', `badge--${variant}`, `badge--${size}`]">
    <span v-if="dot" class="badge__dot" aria-hidden="true" />
    {{ label }}
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  border-radius: 9999px;
  font-weight: 600;
  white-space: nowrap;
  line-height: 1;
}

.badge--sm { font-size: 0.65rem; padding: 0.225rem 0.6rem; }
.badge--md { font-size: 0.75rem; padding: 0.3rem 0.8rem; }
.badge--lg { font-size: 0.875rem; padding: 0.4rem 1rem; }

.badge--success { background: #dcfce7; color: #166534; }
.badge--warning { background: #fef9c3; color: #854d0e; }
.badge--danger  { background: #fee2e2; color: #991b1b; }
.badge--info    { background: #dbeafe; color: #1e40af; }

.badge__dot {
  width: 0.45em;
  height: 0.45em;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
}
</style>
