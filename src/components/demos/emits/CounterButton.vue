<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  change: [value: number]
  reset: []
}>()

const count = ref(0)

function increment() {
  count.value++
  emit('change', count.value)
}

function decrement() {
  count.value--
  emit('change', count.value)
}

function reset() {
  count.value = 0
  emit('reset')
}
</script>

<template>
  <div class="counter">
    <button class="counter__btn counter__btn--ghost" :disabled="count === 0" @click="decrement">−</button>
    <span class="counter__value">{{ count }}</span>
    <button class="counter__btn counter__btn--primary" @click="increment">+</button>
    <button class="counter__btn counter__btn--reset" @click="reset">↺</button>
  </div>
</template>

<style scoped>
.counter {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.counter__value {
  min-width: 2.5rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  font-family: var(--mono);
  color: var(--text);
}

.counter__btn {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-size: 1.1rem;
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.12s;
  line-height: 1;
}

.counter__btn:hover:not(:disabled) {
  border-color: var(--vue);
  color: var(--vue);
}

.counter__btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.counter__btn--primary {
  background: var(--vue);
  border-color: var(--vue);
  color: #fff;
}

.counter__btn--primary:hover {
  background: #38a374;
  border-color: #38a374;
  color: #fff !important;
}

.counter__btn--reset {
  font-size: 0.9rem;
  color: var(--text-muted);
}
</style>
