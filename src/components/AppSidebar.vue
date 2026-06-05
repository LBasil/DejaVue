<script setup lang="ts">
const navigation = [
  {
    group: 'Démarrage',
    items: [{ path: '/', label: 'Accueil' }],
  },
  {
    group: 'Composants',
    items: [
      { path: '/props', label: 'Props' },
      { path: '/emits', label: 'Emits' },
      { path: '/slots', label: 'Slots' },
    ],
  },
]
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__brand">
      <span class="sidebar__logo">DejaVue</span>
      <span class="sidebar__tagline">Vue 3 · TypeScript</span>
    </div>

    <nav class="sidebar__nav">
      <div v-for="section in navigation" :key="section.group" class="sidebar__group">
        <span class="sidebar__group-label">{{ section.group }}</span>
        <RouterLink
          v-for="item in section.items"
          :key="item.path"
          :to="item.path"
          class="sidebar__link"
          exact-active-class="sidebar__link--active"
        >
          {{ item.label }}
        </RouterLink>
      </div>
    </nav>

    <div class="sidebar__footer">
      <a
        href="https://vuejs.org"
        target="_blank"
        rel="noopener noreferrer"
        class="sidebar__footer-link"
      >
        vuejs.org ↗
      </a>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 220px;
  min-height: 100vh;
  background: var(--sidebar);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

.sidebar__brand {
  padding: 1.5rem 1.25rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.sidebar__logo {
  display: block;
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--vue);
  letter-spacing: -0.03em;
}

.sidebar__tagline {
  display: block;
  font-size: 0.62rem;
  color: rgba(255, 255, 255, 0.28);
  margin-top: 0.25rem;
  font-family: var(--mono);
}

.sidebar__nav {
  flex: 1;
  padding: 1.25rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.sidebar__group-label {
  display: block;
  font-size: 0.58rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.22);
  padding: 0 0.5rem;
  margin-bottom: 0.45rem;
}

.sidebar__link {
  display: flex;
  align-items: center;
  padding: 0.45rem 0.75rem;
  border-radius: 6px;
  font-size: 0.845rem;
  color: var(--sidebar-text);
  transition: background 0.12s, color 0.12s;
  margin-bottom: 0.125rem;
}

.sidebar__link:hover {
  background: var(--sidebar-hover);
  color: #fff;
}

.sidebar__link--active {
  background: rgba(66, 184, 131, 0.15);
  color: var(--vue);
  font-weight: 600;
}

.sidebar__footer {
  padding: 1rem 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.sidebar__footer-link {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.22);
  transition: color 0.12s;
}

.sidebar__footer-link:hover {
  color: var(--vue);
}
</style>
