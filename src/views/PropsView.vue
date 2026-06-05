<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../components/DemoBlock.vue'
import ConceptCallout from '../components/ConceptCallout.vue'
import AppBadge from '../components/demos/props/AppBadge.vue'
import UserCard from '../components/demos/props/UserCard.vue'
import AppBadgeSource from '../components/demos/props/AppBadge.vue?raw'
import UserCardSource from '../components/demos/props/UserCard.vue?raw'

type Variant = 'success' | 'warning' | 'danger' | 'info'
type Size = 'sm' | 'md' | 'lg'
type Status = 'online' | 'away' | 'offline'

/* ── AppBadge controls ──────────────────────────────── */
const badgeVariant = ref<Variant>('success')
const badgeSize = ref<Size>('md')
const badgeDot = ref(true)

/* ── Profile builder ────────────────────────────────── */
const cardName = ref('Basil Lhote')
const cardRole = ref('Lead Developer')
const cardStatus = ref<Status>('online')
const cardVerified = ref(true)

const statuses: { value: Status; label: string; color: string }[] = [
  { value: 'online', label: 'En ligne', color: '#22c55e' },
  { value: 'away', label: 'Absent', color: '#f59e0b' },
  { value: 'offline', label: 'Hors ligne', color: '#94a3b8' },
]
</script>

<template>
  <div>
    <header class="page-header">
      <h1 class="page-title">Props</h1>
      <p class="page-subtitle">
        Communication <strong>parent → enfant</strong>. Le parent passe des données,
        l'enfant les affiche — jamais l'inverse. C'est le flux de données à sens unique
        de Vue.
      </p>
    </header>

    <!-- ── AppBadge ──────────────────────────────────── -->
    <section class="section">
      <h2 class="section-title">Union types + withDefaults</h2>
      <p class="section-text">
        Avec <code>defineProps&lt;T&gt;()</code>, TypeScript sait exactement ce que
        le composant accepte. <code>withDefaults</code> définit les valeurs par défaut
        sans sacrifier la sûreté de type.
      </p>

      <ConceptCallout type="tip">
        <code>withDefaults</code> est équivalent à <code>default:</code> dans l'Options
        API, mais en TypeScript pur — pas besoin de répéter les types dans un objet
        séparé.
      </ConceptCallout>

      <DemoBlock
        title="AppBadge.vue"
        description="Variant, size, dot — props typées avec union types littéraux."
        :code="AppBadgeSource"
      >
        <div class="demo-panel">
          <div class="controls">
            <div class="control-item">
              <span class="control-label">variant</span>
              <div class="btn-group">
                <button
                  v-for="v in (['success', 'warning', 'danger', 'info'] as Variant[])"
                  :key="v"
                  :class="['btn-xs', { active: badgeVariant === v }]"
                  @click="badgeVariant = v"
                >{{ v }}</button>
              </div>
            </div>
            <div class="control-item">
              <span class="control-label">size</span>
              <div class="btn-group">
                <button
                  v-for="s in (['sm', 'md', 'lg'] as Size[])"
                  :key="s"
                  :class="['btn-xs', { active: badgeSize === s }]"
                  @click="badgeSize = s"
                >{{ s }}</button>
              </div>
            </div>
            <div class="control-item">
              <span class="control-label">dot</span>
              <button class="btn-toggle" @click="badgeDot = !badgeDot">
                {{ badgeDot }}
              </button>
            </div>
          </div>
          <div class="preview">
            <AppBadge
              label="Statut actif"
              :variant="badgeVariant"
              :size="badgeSize"
              :dot="badgeDot"
            />
          </div>
        </div>
      </DemoBlock>
    </section>

    <!-- ── Profile Builder ───────────────────────────── -->
    <section class="section">
      <h2 class="section-title">Constructeur de profil</h2>
      <p class="section-text">
        Modifie les champs ci-dessous et observe la carte se mettre à jour en temps
        réel. C'est exactement ça, les props : le parent contrôle, l'enfant affiche.
      </p>

      <ConceptCallout type="why">
        <strong>Pourquoi des props ?</strong> Parce que les composants doivent rester
        <em>bêtes</em> — ils affichent ce qu'on leur donne, sans décider eux-mêmes
        d'où vient la donnée. Ça les rend réutilisables et testables.
      </ConceptCallout>

      <DemoBlock
        title="UserCard.vue"
        description="Interface Props, computed initiales, record de couleurs de statut."
        :code="UserCardSource"
      >
        <div class="builder">
          <form class="builder__form" @submit.prevent>
            <div class="field">
              <label class="field__label" for="name">name</label>
              <input
                id="name"
                v-model="cardName"
                class="field__input"
                placeholder="Votre prénom et nom"
              />
            </div>
            <div class="field">
              <label class="field__label" for="role">role</label>
              <input
                id="role"
                v-model="cardRole"
                class="field__input"
                placeholder="Votre rôle"
              />
            </div>
            <div class="field">
              <label class="field__label">status</label>
              <div class="status-group">
                <button
                  v-for="s in statuses"
                  :key="s.value"
                  :class="['status-btn', { active: cardStatus === s.value }]"
                  @click="cardStatus = s.value"
                >
                  <span class="status-dot" :style="{ background: s.color }" />
                  {{ s.label }}
                </button>
              </div>
            </div>
            <div class="field field--inline">
              <label class="field__label">verified</label>
              <button
                :class="['verify-toggle', { on: cardVerified }]"
                @click="cardVerified = !cardVerified"
              >
                <span class="verify-toggle__knob" />
              </button>
              <span class="field__hint">{{ cardVerified ? '✓ Compte vérifié' : 'Non vérifié' }}</span>
            </div>
          </form>

          <div class="builder__arrow" aria-hidden="true">
            <div class="arrow__label">props</div>
            <div class="arrow__track">
              <div class="arrow__line" />
              <div class="arrow__head">›</div>
            </div>
          </div>

          <div class="builder__preview">
            <UserCard
              :name="cardName || 'Votre Nom'"
              :role="cardRole || 'Votre Rôle'"
              :status="cardStatus"
              :verified="cardVerified"
            />
          </div>
        </div>
      </DemoBlock>
    </section>
  </div>
</template>

<style scoped>
/* ── Profile Builder ────────────────────────────────── */
.builder {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.builder__form {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  flex: 1;
  min-width: 200px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.field--inline {
  flex-direction: row;
  align-items: center;
  gap: 0.65rem;
}

.field__label {
  font-size: 0.68rem;
  font-family: var(--mono);
  font-weight: 600;
  color: var(--text-muted);
  text-transform: lowercase;
}

.field__hint {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.field__input {
  padding: 0.5rem 0.75rem;
  border: 1.5px solid var(--border);
  border-radius: 7px;
  font-size: 0.875rem;
  background: var(--surface);
  color: var(--text);
  transition: border-color 0.15s;
  outline: none;
}

.field__input:focus {
  border-color: var(--vue);
}

.status-group {
  display: flex;
  gap: 0.3rem;
  flex-wrap: wrap;
}

.status-btn {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.65rem;
  font-size: 0.75rem;
  border: 1.5px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  color: var(--text-muted);
  transition: all 0.12s;
}

.status-btn:hover,
.status-btn.active {
  border-color: var(--vue);
  color: var(--text);
}

.status-btn.active {
  background: rgba(66, 184, 131, 0.08);
}

.status-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  flex-shrink: 0;
}

/* ── Verify toggle ──────────────────────────────────── */
.verify-toggle {
  width: 2.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  background: var(--border);
  border: none;
  position: relative;
  transition: background 0.2s;
  flex-shrink: 0;
}

.verify-toggle.on {
  background: var(--vue);
}

.verify-toggle__knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: calc(1.25rem - 4px);
  height: calc(1.25rem - 4px);
  border-radius: 50%;
  background: #fff;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: block;
}

.verify-toggle.on .verify-toggle__knob {
  transform: translateX(1rem);
}

/* ── Props arrow ────────────────────────────────────── */
.builder__arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  flex-shrink: 0;
}

.arrow__label {
  font-size: 0.65rem;
  font-family: var(--mono);
  font-weight: 700;
  color: var(--vue);
  text-transform: lowercase;
}

.arrow__track {
  display: flex;
  align-items: center;
  color: var(--vue);
}

.arrow__line {
  width: 2.5rem;
  height: 1.5px;
  background: var(--vue);
  opacity: 0.5;
}

.arrow__head {
  font-size: 1.1rem;
  line-height: 1;
  margin-left: -2px;
}

.builder__preview {
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .builder__arrow {
    transform: rotate(90deg);
    margin: 0.5rem auto;
  }
}
</style>
