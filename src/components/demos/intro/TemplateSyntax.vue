<script setup lang="ts">
import { ref } from 'vue'

const name  = ref('Ada')
const show  = ref(true)

type Color = 'vue' | 'blue' | 'orange'
const activeColor = ref<Color>('vue')

const skills = ['ref()', 'computed()', 'watch()']

const colors: Record<Color, string> = {
  vue:    '#42b883',
  blue:   '#3b82f6',
  orange: '#f59e0b',
}
</script>

<template>
  <div class="tpl">
    <div class="tpl__controls">
      <label class="tpl__control-item">
        <span class="tpl__control-label">v-model</span>
        <input v-model="name" class="tpl__input" maxlength="20" placeholder="Nom..." />
      </label>

      <div class="tpl__control-item">
        <span class="tpl__control-label">:style</span>
        <div class="tpl__color-btns">
          <button
            v-for="(hex, key) in colors"
            :key="key"
            :class="['tpl__color-btn', { active: activeColor === key }]"
            :style="{ background: hex }"
            :title="key"
            @click="activeColor = (key as Color)"
          />
        </div>
      </div>

      <div class="tpl__control-item">
        <span class="tpl__control-label">v-if</span>
        <button class="tpl__toggle-btn" @click="show = !show">
          {{ show ? 'Masquer' : 'Afficher' }}
        </button>
      </div>
    </div>

    <Transition name="tpl-fade">
      <div
        v-if="show"
        class="tpl__card"
        :style="{ borderTopColor: colors[activeColor], '--card-color': colors[activeColor] }"
      >
        <div class="tpl__card-name" :style="{ color: colors[activeColor] }">
          {{ name || 'Anonyme' }}
        </div>
        <div class="tpl__card-skills">
          <span v-for="skill in skills" :key="skill" class="tpl__skill">{{ skill }}</span>
        </div>
        <div class="tpl__card-hint">v-for sur les skills · {{ skills.length }} éléments</div>
      </div>
    </Transition>

    <div v-if="!show" class="tpl__empty">
      <code>v-if="show"</code> est <code>false</code> — carte absente du DOM
    </div>
  </div>
</template>

<style scoped>
.tpl {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.25rem;
}

.tpl__controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
  align-items: center;
}

.tpl__control-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tpl__control-label {
  font-size: 0.65rem;
  font-family: var(--mono);
  color: var(--text-muted);
  background: var(--tag-bg);
  padding: 0.1em 0.4em;
  border-radius: 3px;
}

.tpl__input {
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  border: 1.5px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  color: var(--text);
  outline: none;
  width: 110px;
  transition: border-color 0.15s;
}

.tpl__input:focus { border-color: var(--vue); }

.tpl__color-btns { display: flex; gap: 0.3rem; }

.tpl__color-btn {
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 50%;
  border: 2px solid transparent;
  transition: all 0.12s;
  flex-shrink: 0;
}

.tpl__color-btn.active {
  border-color: var(--text);
  transform: scale(1.25);
}

.tpl__toggle-btn {
  padding: 0.25rem 0.65rem;
  font-size: 0.72rem;
  font-weight: 600;
  border: 1.5px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  color: var(--text-muted);
  transition: all 0.12s;
}

.tpl__toggle-btn:hover { border-color: var(--vue); color: var(--vue); }

.tpl__card {
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-top-width: 3px;
  border-radius: 10px;
  padding: 1rem 1.25rem;
  transition: border-top-color 0.2s;
}

.tpl__card-name {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  transition: color 0.2s;
}

.tpl__card-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-bottom: 0.5rem;
}

.tpl__skill {
  font-size: 0.67rem;
  font-family: var(--mono);
  background: var(--tag-bg);
  color: var(--text-muted);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
}

.tpl__card-hint {
  font-size: 0.67rem;
  color: var(--text-muted);
  font-style: italic;
}

.tpl__empty {
  font-size: 0.78rem;
  color: var(--text-muted);
  padding: 0.75rem 1rem;
  background: var(--surface-alt);
  border: 1px dashed var(--border);
  border-radius: 8px;
  text-align: center;
}

.tpl__empty code {
  font-family: var(--mono);
  font-size: 0.85em;
  color: var(--vue-dark);
}

html.dark .tpl__empty code { color: var(--vue); }

.tpl-fade-enter-active,
.tpl-fade-leave-active { transition: opacity 0.2s, transform 0.2s; }

.tpl-fade-enter-from,
.tpl-fade-leave-to { opacity: 0; transform: scale(0.97); }
</style>
