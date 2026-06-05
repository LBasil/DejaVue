<script setup lang="ts">
import AppSidebar from './components/AppSidebar.vue'
</script>

<template>
  <div class="layout">
    <AppSidebar />
    <main class="layout__main">
      <div class="layout__content">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style>
.layout {
  display: flex;
  min-height: 100vh;
}

.layout__main {
  flex: 1;
  overflow-y: auto;
  min-width: 0;
}

.layout__content {
  max-width: 880px;
  padding: 2.5rem 3rem;
}

@media (max-width: 768px) {
  .layout__content {
    padding: 1.5rem 1.25rem;
  }
}
</style>
