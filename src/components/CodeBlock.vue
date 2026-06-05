<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  code: string
  language?: string
}>()

const copied = ref(false)

async function copy() {
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}
</script>

<template>
  <div class="code-block">
    <div class="code-block__bar">
      <span class="code-block__lang">{{ language ?? 'vue' }}</span>
      <button :class="['copy-btn', { 'copy-btn--ok': copied }]" @click="copy">
        <span v-if="copied">✓ Copié !</span>
        <span v-else>Copier</span>
      </button>
    </div>
    <pre class="code-block__pre"><code>{{ code }}</code></pre>
  </div>
</template>

<style scoped>
.code-block {
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--code-bg);
}

.code-block__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.45rem 0.75rem 0.45rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.code-block__lang {
  font-size: 0.62rem;
  font-family: var(--mono);
  color: rgba(255, 255, 255, 0.28);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.copy-btn {
  font-size: 0.68rem;
  padding: 0.2rem 0.6rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  background: transparent;
  color: rgba(255, 255, 255, 0.35);
  transition: all 0.15s;
  white-space: nowrap;
}

.copy-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.7);
}

.copy-btn--ok {
  border-color: var(--vue);
  color: var(--vue);
  background: rgba(66, 184, 131, 0.1);
}

.code-block__pre {
  margin: 0;
  padding: 1.25rem;
  overflow-x: auto;
  max-height: 440px;
  font-family: var(--mono);
  font-size: 0.785rem;
  line-height: 1.75;
  color: #cdd6f4;
  tab-size: 2;
}

code {
  font-family: inherit;
}
</style>
