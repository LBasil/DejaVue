<script setup lang="ts">
defineProps<{
  code: string
  language?: string
}>()
</script>

<template>
  <div class="code-block">
    <div class="code-block__bar">
      <span class="code-block__lang">{{ language ?? 'vue' }}</span>
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
  padding: 0.45rem 1rem;
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
