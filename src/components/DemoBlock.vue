<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from './CodeBlock.vue'

defineProps<{
  title: string
  description?: string
  code: string
}>()

const tab = ref<'demo' | 'code'>('demo')
</script>

<template>
  <div class="demo-block">
    <div class="demo-block__header">
      <div class="demo-block__meta">
        <h3 class="demo-block__title">{{ title }}</h3>
        <p v-if="description" class="demo-block__desc">{{ description }}</p>
      </div>
      <div class="demo-block__tabs">
        <button
          :class="['tab', { 'tab--active': tab === 'demo' }]"
          @click="tab = 'demo'"
        >
          Demo
        </button>
        <button
          :class="['tab', { 'tab--active': tab === 'code' }]"
          @click="tab = 'code'"
        >
          Code
        </button>
      </div>
    </div>

    <div v-show="tab === 'demo'" class="demo-block__panel">
      <slot />
    </div>
    <div v-show="tab === 'code'">
      <CodeBlock :code="code" />
    </div>
  </div>
</template>

<style scoped>
.demo-block {
  border: 1px solid var(--border);
  border-radius: calc(var(--radius) + 2px);
  overflow: hidden;
  background: var(--surface);
  box-shadow: var(--shadow);
  margin-bottom: 1.75rem;
}

.demo-block__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0.875rem 1.25rem;
  background: var(--surface-alt);
  border-bottom: 1px solid var(--border);
  gap: 1rem;
}

.demo-block__title {
  font-size: 0.82rem;
  font-weight: 600;
  font-family: var(--mono);
  color: var(--text);
}

.demo-block__desc {
  font-size: 0.775rem;
  color: var(--text-muted);
  margin-top: 0.2rem;
  line-height: 1.5;
}

.demo-block__tabs {
  display: flex;
  gap: 0.25rem;
  flex-shrink: 0;
}

.tab {
  padding: 0.22rem 0.65rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: transparent;
  font-size: 0.72rem;
  color: var(--text-muted);
  transition: all 0.12s;
}

.tab:hover {
  background: var(--bg);
  color: var(--text);
}

.tab--active {
  background: var(--vue);
  border-color: var(--vue);
  color: #fff;
  font-weight: 600;
}

.demo-block__panel {
  padding: 1.5rem 1.25rem;
}
</style>
