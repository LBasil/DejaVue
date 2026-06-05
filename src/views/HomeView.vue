<script setup lang="ts">
const topics = [
  {
    path: '/props',
    label: 'Props',
    glyph: '↓',
    description: 'defineProps, withDefaults, interface types, union types',
  },
  {
    path: '/emits',
    label: 'Emits',
    glyph: '↑',
    description: 'defineEmits typés, v-model custom avec defineModel',
  },
  {
    path: '/slots',
    label: 'Slots',
    glyph: '◈',
    description: 'Slots nommés, slots scopés, guard $slots',
  },
]
</script>

<template>
  <div>
    <header class="home-header">
      <div class="home-header__badge">Vue 3 · TypeScript · Vite</div>
      <h1 class="home-header__title">DejaVue</h1>
      <p class="home-header__subtitle">
        Référentiel interactif de patterns Vue 3 — composants, réactivité, composables.
        Chaque section propose des démos en direct et le code source correspondant.
      </p>
    </header>

    <div class="topics-grid">
      <RouterLink
        v-for="topic in topics"
        :key="topic.path"
        :to="topic.path"
        class="topic-card"
      >
        <span class="topic-card__glyph">{{ topic.glyph }}</span>
        <h2 class="topic-card__label">{{ topic.label }}</h2>
        <p class="topic-card__desc">{{ topic.description }}</p>
        <span class="topic-card__arrow">→</span>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.home-header {
  margin-bottom: 3rem;
}

.home-header__badge {
  display: inline-block;
  font-size: 0.7rem;
  font-family: var(--mono);
  font-weight: 600;
  color: var(--vue);
  background: rgba(66, 184, 131, 0.1);
  border: 1px solid rgba(66, 184, 131, 0.25);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  margin-bottom: 1.25rem;
  letter-spacing: 0.04em;
}

.home-header__title {
  font-size: 2.75rem;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: var(--text);
  margin-bottom: 0.875rem;
  background: linear-gradient(135deg, var(--text) 40%, var(--vue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.home-header__subtitle {
  font-size: 0.95rem;
  color: var(--text-muted);
  max-width: 520px;
  line-height: 1.7;
}

.topics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

.topic-card {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: var(--shadow);
  transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s;
  position: relative;
}

.topic-card:hover {
  border-color: var(--vue);
  box-shadow: 0 4px 16px rgba(66, 184, 131, 0.12);
  transform: translateY(-2px);
}

.topic-card__glyph {
  font-size: 1.5rem;
  line-height: 1;
  margin-bottom: 0.875rem;
  color: var(--vue);
}

.topic-card__label {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.4rem;
}

.topic-card__desc {
  font-size: 0.78rem;
  color: var(--text-muted);
  line-height: 1.6;
  flex: 1;
}

.topic-card__arrow {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--vue);
  transition: transform 0.12s;
}

.topic-card:hover .topic-card__arrow {
  transform: translateX(3px);
}
</style>
