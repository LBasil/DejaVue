<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from '../composables/useTheme'
import { useLevel, type Level } from '../composables/useLevel'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const route = useRoute()
const { dark, toggle: toggleTheme } = useTheme()
const { level, setLevel } = useLevel()

watch(() => route.path, () => emit('close'))

const levels: { value: Level; label: string }[] = [
  { value: 'beginner',     label: 'Débutant' },
  { value: 'intermediate', label: 'Intermédiaire' },
  { value: 'experienced',  label: 'Expérimenté' },
]

const navigation = [
  {
    group: 'Démarrage',
    items: [
      { path: '/',             label: 'Accueil',      icon: '⌂' },
      { path: '/introduction', label: 'Introduction',  icon: '▶' },
      { path: '/setup',        label: 'Mise en place', icon: '⚙' },
    ],
  },
  {
    group: 'Composants',
    items: [
      { path: '/props', label: 'Props', icon: '↓' },
      { path: '/emits', label: 'Emits', icon: '↑' },
      { path: '/slots', label: 'Slots', icon: '◈' },
    ],
  },
]
</script>

<template>
  <aside :class="['sidebar', { 'sidebar--open': props.open }]">
    <div class="sidebar__brand">
      <span class="sidebar__logo">DejaVue</span>
      <button class="sidebar__close" aria-label="Fermer" @click="emit('close')">✕</button>
    </div>
    <span class="sidebar__tagline">Vue 3 · TypeScript</span>

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
          <span class="sidebar__link-icon" aria-hidden="true">{{ item.icon }}</span>
          {{ item.label }}
        </RouterLink>
      </div>
    </nav>

    <div class="sidebar__footer">
      <div class="sidebar__controls">
        <!-- Niveau -->
        <div class="control-group">
          <span class="control-group__label">Niveau</span>
          <div class="level-list">
            <button
              v-for="lvl in levels"
              :key="lvl.value"
              :class="['level-btn', { active: level === lvl.value }]"
              @click="setLevel(lvl.value)"
            >
              <span class="level-btn__dot" />
              {{ lvl.label }}
            </button>
          </div>
        </div>

        <!-- Thème -->
        <div class="control-group">
          <span class="control-group__label">Thème</span>
          <button
            class="theme-btn"
            :title="dark ? 'Passer en mode clair' : 'Passer en mode sombre'"
            @click="toggleTheme"
          >
            <span>{{ dark ? '☀️' : '🌙' }}</span>
            <span>{{ dark ? 'Clair' : 'Sombre' }}</span>
          </button>
        </div>
      </div>

      <a
        href="https://vuejs.org"
        target="_blank"
        rel="noopener noreferrer"
        class="sidebar__footer-link"
      >vuejs.org ↗</a>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 230px;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.25rem 0.25rem;
}

.sidebar__logo {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--vue);
  letter-spacing: -0.03em;
}

.sidebar__close {
  display: none;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  font-size: 1rem;
  padding: 0.25rem;
  line-height: 1;
  transition: color 0.12s;
}

.sidebar__close:hover { color: #fff; }

.sidebar__tagline {
  display: block;
  font-size: 0.62rem;
  color: rgba(255, 255, 255, 0.28);
  padding: 0 1.25rem 1.25rem;
  font-family: var(--mono);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
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
  gap: 0.6rem;
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

.sidebar__link-icon {
  font-size: 0.75rem;
  opacity: 0.55;
  width: 1rem;
  text-align: center;
}

/* ── Footer controls ────────────────────────────────── */
.sidebar__footer {
  padding: 1rem 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.sidebar__controls {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.control-group__label {
  font-size: 0.58rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.22);
}

/* ── Level radio buttons ────────────────────────────── */
.level-list {
  display: flex;
  flex-direction: column;
  gap: 0.05rem;
}

.level-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.28rem 0.5rem;
  font-size: 0.725rem;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.35);
  border-radius: 5px;
  text-align: left;
  transition: all 0.12s;
  width: 100%;
}

.level-btn:hover {
  color: rgba(255, 255, 255, 0.65);
  background: rgba(255, 255, 255, 0.04);
}

.level-btn.active {
  color: var(--vue);
  font-weight: 600;
}

.level-btn__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  flex-shrink: 0;
  transition: all 0.12s;
}

.level-btn.active .level-btn__dot {
  background: var(--vue);
  border-color: var(--vue);
}

/* ── Theme button ───────────────────────────────────── */
.theme-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.6rem;
  font-size: 0.72rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.5);
  transition: all 0.12s;
  width: 100%;
}

.theme-btn:hover {
  background: rgba(255, 255, 255, 0.09);
  color: rgba(255, 255, 255, 0.8);
}

.sidebar__footer-link {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.2);
  transition: color 0.12s;
}

.sidebar__footer-link:hover { color: var(--vue); }

/* ── Mobile ─────────────────────────────────────────── */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    z-index: 100;
    transform: translateX(-100%);
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .sidebar--open  { transform: translateX(0); }
  .sidebar__close { display: block; }
}
</style>
