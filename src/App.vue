<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import AppSidebar from './components/AppSidebar.vue'

const route = useRoute()
const sidebarOpen = ref(false)
</script>

<template>
  <div class="layout">
    <Transition name="overlay">
      <div
        v-if="sidebarOpen"
        class="layout__overlay"
        @click="sidebarOpen = false"
      />
    </Transition>

    <AppSidebar :open="sidebarOpen" @close="sidebarOpen = false" />

    <div class="layout__body">
      <header class="mobile-header">
        <button
          :class="['hamburger', { open: sidebarOpen }]"
          aria-label="Menu"
          @click="sidebarOpen = !sidebarOpen"
        >
          <span />
          <span />
          <span />
        </button>
        <span class="mobile-header__logo">DejaVue</span>
      </header>

      <main class="layout__main">
        <div class="layout__content">
          <RouterView v-slot="{ Component }">
            <Transition name="page" mode="out-in">
              <component :is="Component" :key="route.path" />
            </Transition>
          </RouterView>
        </div>
      </main>
    </div>
  </div>
</template>

<style>
.layout {
  display: flex;
  min-height: 100vh;
}

.layout__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.layout__main {
  flex: 1;
  overflow-y: auto;
}

.layout__content {
  max-width: 880px;
  padding: 2.5rem 3rem;
}

.layout__overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 99;
  backdrop-filter: blur(2px);
}

/* ── Page transitions ───────────────────────────────── */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* ── Overlay transition ─────────────────────────────── */
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.2s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

/* ── Mobile header ──────────────────────────────────── */
.mobile-header {
  display: none;
  align-items: center;
  gap: 0.875rem;
  padding: 0 1rem;
  height: 56px;
  background: var(--sidebar);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  position: sticky;
  top: 0;
  z-index: 90;
  flex-shrink: 0;
}

.mobile-header__logo {
  font-size: 1rem;
  font-weight: 800;
  color: var(--vue);
  letter-spacing: -0.03em;
}

/* ── Hamburger ──────────────────────────────────────── */
.hamburger {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 2.25rem;
  height: 2.25rem;
  background: none;
  border: none;
  padding: 0;
  flex-shrink: 0;
}

.hamburger span {
  display: block;
  width: 18px;
  height: 2px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 1px;
  transition: transform 0.22s ease, opacity 0.22s ease;
}

.hamburger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.hamburger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 768px) {
  .mobile-header {
    display: flex;
  }

  .layout__content {
    padding: 1.5rem 1.25rem;
  }
}
</style>
