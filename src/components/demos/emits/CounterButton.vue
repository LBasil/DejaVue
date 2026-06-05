<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  change: [value: number]
  reset: []
}>()

const count = ref(0)
const pulsing = ref(false)

function pulse() {
  pulsing.value = false
  requestAnimationFrame(() => {
    pulsing.value = true
    setTimeout(() => (pulsing.value = false), 300)
  })
}

function increment() {
  count.value++
  emit('change', count.value)
  pulse()
}

function decrement() {
  count.value--
  emit('change', count.value)
  pulse()
}

function reset() {
  count.value = 0
  emit('reset')
  pulse()
}
</script>

<template>
  <div class="counter">
    <button
      class="counter__btn counter__btn--ghost"
      :disabled="count <= 0"
      @click="decrement"
    >
      −
    </button>
    <span :class="['counter__value', { 'counter__value--pulse': pulsing }]">
      {{ count }}
    </span>
    <button class="counter__btn counter__btn--primary" @click="increment">+</button>
    <button class="counter__btn counter__btn--reset" title="Reset" @click="reset">↺</button>
  </div>
</template>

<style scoped>
.counter {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.counter__value {
  min-width: 3rem;
  text-align: center;
  font-size: 2rem;
  font-weight: 800;
  font-family: var(--mono);
  color: var(--text);
  letter-spacing: -0.04em;
  transition: color 0.15s;
}

.counter__value--pulse {
  animation: pop 0.28s ease;
  color: var(--vue);
}

@keyframes pop {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.35); }
}

.counter__btn {
  width: 2.375rem;
  height: 2.375rem;
  border-radius: 9px;
  border: 1.5px solid var(--border);
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
  transform: scale(1.05);
}

.counter__btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.counter__btn--primary {
  background: var(--vue);
  border-color: var(--vue);
  color: #fff;
  font-size: 1.25rem;
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
