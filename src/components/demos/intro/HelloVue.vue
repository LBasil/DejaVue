<script setup lang="ts">
import { ref, computed } from 'vue'

const prenom = ref('')
const salutation = computed(() =>
  prenom.value ? `Bonjour, ${prenom.value} !` : 'Bonjour, monde !'
)
</script>

<template>
  <div class="hello-vue">
    <p class="hello-vue__greeting">{{ salutation }}</p>
    <input
      v-model="prenom"
      class="hello-vue__input"
      placeholder="Ton prénom..."
      maxlength="30"
    />
  </div>
</template>

<style scoped>
.hello-vue {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.75rem;
  text-align: center;
}

.hello-vue__greeting {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text);
  min-height: 1.75rem;
  transition: all 0.15s;
}

.hello-vue__input {
  padding: 0.5rem 0.875rem;
  border: 1.5px solid var(--border);
  border-radius: 8px;
  font-size: 0.875rem;
  background: var(--surface);
  color: var(--text);
  outline: none;
  text-align: center;
  transition: border-color 0.15s;
}

.hello-vue__input:focus { border-color: var(--vue); }
.hello-vue__input::placeholder { color: var(--text-muted); }
</style>
