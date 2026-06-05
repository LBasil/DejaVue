<script setup lang="ts">
const model = defineModel<string>({ required: true })

const MAX = 80

const remaining = () => MAX - model.value.length
const isNearLimit = () => remaining() <= 15
const isOverLimit = () => remaining() < 0
</script>

<template>
  <div :class="['custom-input', { 'custom-input--warn': isNearLimit(), 'custom-input--over': isOverLimit() }]">
    <input
      v-model="model"
      class="custom-input__field"
      placeholder="Écris quelque chose…"
      :maxlength="MAX + 20"
    />
    <span :class="['custom-input__count', { warn: isNearLimit(), over: isOverLimit() }]">
      {{ remaining() }}
    </span>
  </div>
</template>

<style scoped>
.custom-input {
  display: flex;
  align-items: center;
  border: 1.5px solid var(--border);
  border-radius: 8px;
  background: var(--surface);
  overflow: hidden;
  transition: border-color 0.15s;
  max-width: 360px;
}

.custom-input:focus-within {
  border-color: var(--vue);
}

.custom-input--warn:focus-within {
  border-color: #f59e0b;
}

.custom-input--over:focus-within {
  border-color: #ef4444;
}

.custom-input__field {
  flex: 1;
  padding: 0.6rem 0.875rem;
  border: none;
  outline: none;
  font-size: 0.875rem;
  background: transparent;
  color: var(--text);
}

.custom-input__count {
  padding: 0 0.75rem;
  font-size: 0.7rem;
  font-family: var(--mono);
  color: var(--text-muted);
  white-space: nowrap;
  border-left: 1px solid var(--border);
  line-height: 2.5;
}

.custom-input__count.warn {
  color: #f59e0b;
}

.custom-input__count.over {
  color: #ef4444;
  font-weight: 700;
}
</style>
