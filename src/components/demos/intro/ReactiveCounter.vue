<script setup lang="ts">
import { ref, computed } from 'vue'

const count = ref(0)

const mood = computed(() => {
  if (count.value < 0)  return { emoji: '😬', text: String(count.value) }
  if (count.value === 0) return { emoji: '😴', text: 'zéro' }
  if (count.value <= 5)  return { emoji: '😊', text: String(count.value) }
  if (count.value <= 10) return { emoji: '😎', text: String(count.value) }
  return { emoji: '🤯', text: String(count.value) }
})
</script>

<template>
  <div class="rctr">
    <div class="rctr__display">
      <span class="rctr__emoji">{{ mood.emoji }}</span>
      <span class="rctr__count">{{ mood.text }}</span>
    </div>

    <div class="rctr__trace">
      <div class="rctr__trace-item">
        <span class="rctr__trace-label">ref()</span>
        <span class="rctr__trace-val">{{ count }}</span>
      </div>
      <span class="rctr__trace-arrow">→</span>
      <div class="rctr__trace-item">
        <span class="rctr__trace-label">computed()</span>
        <span class="rctr__trace-val rctr__trace-val--str">"{{ mood.text }}"</span>
      </div>
    </div>

    <div class="rctr__btns">
      <button class="rctr__btn" @click="count--">−</button>
      <button class="rctr__btn rctr__btn--reset" @click="count = 0">Reset</button>
      <button class="rctr__btn rctr__btn--primary" @click="count++">+</button>
    </div>
  </div>
</template>

<style scoped>
.rctr {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  padding: 1.5rem;
}

.rctr__display {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.rctr__emoji {
  font-size: 2.5rem;
  line-height: 1;
  transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.rctr__emoji:hover { transform: scale(1.15); }

.rctr__count {
  font-size: 2rem;
  font-weight: 800;
  font-family: var(--mono);
  color: var(--text);
  min-width: 3ch;
  text-align: center;
}

.rctr__trace {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--mono);
  background: var(--surface-alt);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.5rem 1rem;
}

.rctr__trace-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
}

.rctr__trace-label {
  font-size: 0.6rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.rctr__trace-val        { font-size: 0.8rem; color: #3b82f6; font-weight: 600; }
.rctr__trace-val--str   { color: #22c55e; }
.rctr__trace-arrow      { color: var(--vue); font-size: 1rem; }

.rctr__btns {
  display: flex;
  gap: 0.5rem;
}

.rctr__btn {
  padding: 0.45rem 1.1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  border: 1.5px solid var(--border);
  background: var(--surface);
  color: var(--text);
  transition: all 0.12s;
  min-width: 2.75rem;
}

.rctr__btn:hover          { border-color: var(--vue); color: var(--vue); }
.rctr__btn--reset         { font-size: 0.75rem; }
.rctr__btn--primary       { background: var(--vue); border-color: var(--vue); color: #fff; }
.rctr__btn--primary:hover { background: #38a374; color: #fff; border-color: #38a374; }
</style>
