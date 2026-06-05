<script setup lang="ts">
const topics = [
  {
    path: '/props',
    label: 'Props',
    icon: '↓',
    color: '#3b82f6',
    tagline: 'Parent → Enfant',
    description:
      'Passer des données typées à un composant. defineProps, withDefaults, interfaces TypeScript.',
    tags: ['defineProps', 'withDefaults', 'interface'],
  },
  {
    path: '/emits',
    label: 'Emits',
    icon: '↑',
    color: '#f59e0b',
    tagline: 'Enfant → Parent',
    description:
      'Remonter des signaux typés depuis un enfant. v-model personnalisé avec defineModel.',
    tags: ['defineEmits', 'defineModel', 'v-model'],
  },
  {
    path: '/slots',
    label: 'Slots',
    icon: '◈',
    color: '#8b5cf6',
    tagline: 'Composition',
    description:
      'Injecter du contenu HTML dans un composant depuis son parent. Slots nommés, scopés, guards.',
    tags: ['#named', 'v-slot', '$slots'],
  },
]
</script>

<template>
  <div class="home">
    <header class="hero">
      <div class="hero__badge">Vue 3 · TypeScript · Vite</div>
      <h1 class="hero__title">DejaVue.</h1>
      <p class="hero__subtitle">
        Un carnet perso de patterns Vue 3 + TypeScript.<br />
        Des composants qui font quelque chose. Du code réel. Rien de fictif.
      </p>
      <RouterLink to="/props" class="hero__cta">
        Commencer <span aria-hidden="true">→</span>
      </RouterLink>
    </header>

    <div class="topics">
      <RouterLink
        v-for="topic in topics"
        :key="topic.path"
        :to="topic.path"
        class="topic-card"
        :style="{ '--accent': topic.color }"
      >
        <div class="topic-card__top">
          <span class="topic-card__icon" aria-hidden="true">{{ topic.icon }}</span>
          <span class="topic-card__tagline">{{ topic.tagline }}</span>
        </div>
        <h2 class="topic-card__label">{{ topic.label }}</h2>
        <p class="topic-card__desc">{{ topic.description }}</p>
        <div class="topic-card__tags">
          <code v-for="tag in topic.tags" :key="tag" class="topic-card__tag">{{ tag }}</code>
        </div>
        <div class="topic-card__footer">
          Explorer <span aria-hidden="true">→</span>
        </div>
      </RouterLink>
    </div>

    <footer class="home-footer">
      <p>Vue = français pour <em>"vue"</em>. Le framework qui rend les choses visibles.</p>
    </footer>
  </div>
</template>

<style scoped>
.home {
  animation: fade-up 0.4s ease both;
}

.hero {
  margin-bottom: 3rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid var(--border);
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  font-size: 0.68rem;
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

.hero__title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  letter-spacing: -0.05em;
  margin-bottom: 0.875rem;
  background: linear-gradient(135deg, var(--text) 30%, var(--vue) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
}

.hero__subtitle {
  font-size: 1rem;
  color: var(--text-muted);
  line-height: 1.75;
  margin-bottom: 1.75rem;
  max-width: 480px;
}

.hero__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--vue);
  color: #fff;
  font-weight: 600;
  font-size: 0.875rem;
  padding: 0.65rem 1.25rem;
  border-radius: 8px;
  transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
}

.hero__cta:hover {
  background: #38a374;
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(66, 184, 131, 0.3);
}

/* ── Cards ──────────────────────────────────────────── */
.topics {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
  margin-bottom: 3rem;
}

.topic-card {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  box-shadow: var(--shadow);
  transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s;
  position: relative;
  overflow: hidden;
}

.topic-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--accent);
  opacity: 0;
  transition: opacity 0.15s;
}

.topic-card:hover {
  border-color: var(--accent);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  transform: translateY(-3px);
}

.topic-card:hover::before {
  opacity: 1;
}

.topic-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.topic-card__icon {
  font-size: 1.5rem;
  color: var(--accent);
}

.topic-card__tagline {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  padding: 0.2rem 0.5rem;
  border-radius: 9999px;
}

.topic-card__label {
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  color: var(--text);
  margin-bottom: 0.5rem;
}

.topic-card__desc {
  font-size: 0.82rem;
  color: var(--text-muted);
  line-height: 1.65;
  flex: 1;
  margin-bottom: 1rem;
}

.topic-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-bottom: 1rem;
}

.topic-card__tag {
  font-size: 0.65rem;
  font-family: var(--mono);
  background: var(--tag-bg);
  color: var(--text-muted);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
}

.topic-card__footer {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent);
  display: flex;
  align-items: center;
  gap: 0.35rem;
  transition: gap 0.12s;
}

.topic-card:hover .topic-card__footer {
  gap: 0.6rem;
}

.home-footer {
  text-align: center;
  font-size: 0.78rem;
  color: var(--text-muted);
  padding: 1.5rem 0;
  border-top: 1px solid var(--border);
}

.home-footer em {
  font-style: italic;
  color: var(--vue);
}

@media (max-width: 640px) {
  .topics { grid-template-columns: 1fr; }
}
</style>
