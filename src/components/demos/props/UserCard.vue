<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name: string
  role: string
  verified?: boolean
  status?: 'online' | 'away' | 'offline'
}

const props = withDefaults(defineProps<Props>(), {
  verified: false,
  status: 'offline',
})

const initials = computed(() =>
  props.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2),
)

const statusColors: Record<string, string> = {
  online: '#22c55e',
  away:   '#f59e0b',
  offline:'#94a3b8',
}
</script>

<template>
  <div class="user-card">
    <div class="user-card__avatar">
      <span class="user-card__initials">{{ initials }}</span>
      <span
        class="user-card__status-dot"
        :style="{ background: statusColors[status] }"
        :title="status"
      />
    </div>
    <div class="user-card__body">
      <div class="user-card__name">
        {{ name }}
        <svg
          v-if="verified"
          class="user-card__verified"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-label="Compte vérifié"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="user-card__role">{{ role }}</div>
    </div>
  </div>
</template>

<style scoped>
.user-card {
  display: inline-flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.75rem 1rem;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 10px;
  box-shadow: var(--shadow-sm);
}

.user-card__avatar {
  position: relative;
  flex-shrink: 0;
}

.user-card__initials {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #42b883, #35495e);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.user-card__status-dot {
  position: absolute;
  bottom: 1px;
  right: 1px;
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 50%;
  border: 2px solid #fff;
}

.user-card__name {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text);
}

.user-card__verified {
  width: 0.95rem;
  height: 0.95rem;
  color: #3b82f6;
  flex-shrink: 0;
}

.user-card__role {
  font-size: 0.775rem;
  color: var(--text-muted);
  margin-top: 0.1rem;
}
</style>
