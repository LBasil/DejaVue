<script setup lang="ts">
import { ref } from 'vue'

interface Reaction {
  emoji: string
  label: string
  count: number
}

const emit = defineEmits<{
  react: [emoji: string, count: number]
}>()

const reactions = ref<Reaction[]>([
  { emoji: '👍', label: 'Like', count: 0 },
  { emoji: '❤️', label: 'Amour', count: 0 },
  { emoji: '🎉', label: 'Bravo', count: 0 },
  { emoji: '🤯', label: 'Waow', count: 0 },
])

interface Float {
  id: number
  emoji: string
}

const floats = ref<Float[]>([])
let nextId = 0

function react(reaction: Reaction) {
  reaction.count++
  emit('react', reaction.emoji, reaction.count)

  const id = nextId++
  floats.value.push({ id, emoji: reaction.emoji })
  setTimeout(() => {
    floats.value = floats.value.filter((f) => f.id !== id)
  }, 750)
}

const total = () => reactions.value.reduce((s, r) => s + r.count, 0)
</script>

<template>
  <div class="reaction-bar">
    <div class="reaction-bar__buttons">
      <button
        v-for="reaction in reactions"
        :key="reaction.emoji"
        class="reaction-btn"
        :class="{ 'reaction-btn--active': reaction.count > 0 }"
        :title="reaction.label"
        @click="react(reaction)"
      >
        <span class="reaction-btn__emoji">{{ reaction.emoji }}</span>
        <span v-if="reaction.count > 0" class="reaction-btn__count">
          {{ reaction.count }}
        </span>
      </button>
    </div>

    <div class="reaction-bar__total" v-if="total() > 0">
      {{ total() }} réaction{{ total() > 1 ? 's' : '' }}
    </div>

    <!-- Floating emojis -->
    <div class="floats" aria-hidden="true">
      <span
        v-for="f in floats"
        :key="f.id"
        class="float-emoji"
      >{{ f.emoji }}</span>
    </div>
  </div>
</template>

<style scoped>
.reaction-bar {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.reaction-bar__buttons {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.reaction-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.45rem 0.75rem;
  border: 1.5px solid var(--border);
  border-radius: 9999px;
  background: var(--surface);
  font-size: 0.875rem;
  transition: all 0.15s;
  position: relative;
}

.reaction-btn:hover {
  border-color: var(--vue);
  background: rgba(66, 184, 131, 0.06);
  transform: scale(1.08);
}

.reaction-btn--active {
  border-color: rgba(66, 184, 131, 0.4);
  background: rgba(66, 184, 131, 0.06);
}

.reaction-btn__emoji {
  font-size: 1.1rem;
  line-height: 1;
  transition: transform 0.15s;
}

.reaction-btn:hover .reaction-btn__emoji {
  transform: scale(1.2);
}

.reaction-btn__count {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--text-muted);
  font-family: var(--mono);
  min-width: 0.8rem;
  text-align: center;
}

.reaction-bar__total {
  font-size: 0.72rem;
  color: var(--text-muted);
  white-space: nowrap;
}

/* ── Floating emojis ────────────────────────────────── */
.floats {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
}

.float-emoji {
  position: absolute;
  bottom: 100%;
  left: 50%;
  font-size: 1.5rem;
  animation: float-up 0.75s ease forwards;
  line-height: 1;
}

@keyframes float-up {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
  60% {
    opacity: 1;
    transform: translateX(-50%) translateY(-30px) scale(1.4);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(-55px) scale(0.8);
  }
}
</style>
