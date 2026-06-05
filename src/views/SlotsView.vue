<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../components/DemoBlock.vue'
import ConceptCallout from '../components/ConceptCallout.vue'
import BaseCard from '../components/demos/slots/BaseCard.vue'
import ScopedList from '../components/demos/slots/ScopedList.vue'
import BaseCardSource from '../components/demos/slots/BaseCard.vue?raw'
import ScopedListSource from '../components/demos/slots/ScopedList.vue?raw'
import { useLevel } from '../composables/useLevel'

const { advanced } = useLevel()

const showHeader = ref(true)
const showFooter = ref(true)

type ViewMode = 'compact' | 'detailed'
const viewMode = ref<ViewMode>('compact')

const users = [
  { id: 1, name: 'Alice Martin', role: 'Designer UI', status: 'online', since: '2021' },
  { id: 2, name: 'Bob Durand',   role: 'Dev Backend',  status: 'away',   since: '2019' },
  { id: 3, name: 'Chloé Roy',    role: 'DevOps',        status: 'offline', since: '2022' },
]

const statusColors: Record<string, string> = {
  online: '#22c55e',
  away:   '#f59e0b',
  offline:'#94a3b8',
}

const statusLabels: Record<string, string> = {
  online: 'En ligne',
  away:   'Absent',
  offline:'Hors ligne',
}
</script>

<template>
  <div>
    <header class="page-header">
      <h1 class="page-title">Slots</h1>
      <p class="page-subtitle">
        Les slots permettent d'injecter du contenu HTML depuis le parent dans le rendu
        d'un enfant. C'est ce qui rend les composants vraiment composables plutôt que
        juste paramétrables.
      </p>
    </header>

    <!-- ── Section 1 : Slots nommés ──────────────────── -->
    <section class="section">
      <h2 class="section-title">Slots nommés</h2>
      <p class="section-text">
        Active et désactive les zones avec les toggles. Le composant <code>&lt;BaseCard&gt;</code>
        n'affiche une zone que si le parent y met quelque chose.
      </p>

      <ConceptCallout type="why">
        Sans slots, tu créerais des props <code>title</code>, <code>footer</code>...
        mais de quel type ? <code>string</code> ? <code>VNode</code> ? Les slots résolvent
        ça proprement : le parent injecte ce qu'il veut — texte, composants, HTML arbitraire.
      </ConceptCallout>

      <ConceptCallout v-if="advanced" type="info" title="$slots guard">
        <code>$slots.header</code> est un objet qui contient les fonctions de rendu
        fournies par le parent. Il est <em>truthy</em> si le parent a déclaré un contenu
        pour ce slot, <em>falsy</em> sinon. Le pattern <code>v-if="$slots.header"</code>
        évite de rendre une <code>&lt;div&gt;</code> vide dans le DOM — utile quand
        la zone a du padding ou une bordure qui créerait un artefact visuel.
      </ConceptCallout>

      <DemoBlock
        title="BaseCard.vue"
        description="Active ou désactive les slots — observe comment le composant s'adapte."
        :code="BaseCardSource"
      >
        <div class="slot-builder">
          <div class="slot-toggles">
            <label class="slot-toggle">
              <input v-model="showHeader" type="checkbox" />
              <span class="slot-toggle__track"><span class="slot-toggle__knob" /></span>
              <code>#header</code>
            </label>
            <label class="slot-toggle">
              <input v-model="showFooter" type="checkbox" />
              <span class="slot-toggle__track"><span class="slot-toggle__knob" /></span>
              <code>#footer</code>
            </label>
          </div>

          <div class="slot-arrow" aria-hidden="true">→</div>

          <Transition name="card-update" mode="out-in">
            <BaseCard :key="`${showHeader}-${showFooter}`" :elevated="true">
              <template v-if="showHeader" #header>
                <span>🃏 En-tête de la carte</span>
              </template>
              Le contenu principal est dans le slot par défaut. Toujours là.
              <template v-if="showFooter" #footer>
                <button class="slot-action-btn slot-action-btn--ghost">Annuler</button>
                <button class="slot-action-btn slot-action-btn--primary">Sauvegarder</button>
              </template>
            </BaseCard>
          </Transition>
        </div>

        <p v-if="!showHeader && !showFooter" class="slot-hint">
          Seul le slot par défaut est rendu. Les zones header et footer ont disparu sans
          laisser de div vide — c'est le <code>v-if="$slots.header"</code> qui fait ça.
        </p>
      </DemoBlock>
    </section>

    <!-- ── Section 2 : Slots scopés ──────────────────── -->
    <section class="section">
      <h2 class="section-title">Slots scopés</h2>
      <p class="section-text">
        <code>&lt;ScopedList&gt;</code> gère la logique (itération, états vide et chargement).
        Le parent contrôle uniquement le rendu de chaque ligne — via
        <code>v-slot="{ item, index }"</code>. Même composant, deux présentations.
      </p>

      <ConceptCallout type="tip">
        Tu peux renommer les variables exposées directement dans la déstructuration :
        <code>v-slot="{ item: user, index: i }"</code>. Pratique quand les noms génériques
        comme <code>item</code> nuisent à la lisibilité.
      </ConceptCallout>

      <ConceptCallout v-if="advanced" type="info" title="Compilation des slots scopés">
        Un slot scopé compile vers une fonction dans l'objet <code>slots</code> du composant :
        <code>slots.default?.({ item, index })</code>. L'enfant appelle cette fonction
        avec les données qu'il veut exposer et obtient en retour un tableau de VNodes.
        C'est exactement le même mécanisme que <code>&lt;Transition&gt;</code> ou
        <code>&lt;KeepAlive&gt;</code> — ils passent tous leurs informations internes
        via des slots scopés.
      </ConceptCallout>

      <DemoBlock
        title="ScopedList.vue"
        description="Même composant, deux rendus complètement différents selon le parent."
        :code="ScopedListSource"
      >
        <div class="demo-panel">
          <div class="controls">
            <div class="control-item">
              <span class="control-label">Vue parente</span>
              <div class="btn-group">
                <button :class="['btn-xs', { active: viewMode === 'compact' }]" @click="viewMode = 'compact'">Compacte</button>
                <button :class="['btn-xs', { active: viewMode === 'detailed' }]" @click="viewMode = 'detailed'">Détaillée</button>
              </div>
            </div>
          </div>

          <ScopedList v-if="viewMode === 'compact'" :items="users">
            <template #default="{ item, index }">
              <div class="row-compact">
                <span class="row-compact__num">{{ index + 1 }}</span>
                <span class="row-compact__dot" :style="{ background: statusColors[item['status'] as string] }" />
                <span class="row-compact__name">{{ item['name'] }}</span>
                <span class="row-compact__role">{{ item['role'] }}</span>
              </div>
            </template>
          </ScopedList>

          <ScopedList v-else :items="users">
            <template #default="{ item }">
              <div class="row-detailed">
                <div class="row-detailed__avatar">
                  {{ (item['name'] as string).split(' ').map((n: string) => n[0]).join('') }}
                </div>
                <div class="row-detailed__body">
                  <div class="row-detailed__name">{{ item['name'] }}</div>
                  <div class="row-detailed__meta">{{ item['role'] }} · depuis {{ item['since'] }}</div>
                </div>
                <span class="row-detailed__status" :style="{ color: statusColors[item['status'] as string] }">
                  ● {{ statusLabels[item['status'] as string] }}
                </span>
              </div>
            </template>
          </ScopedList>
        </div>
      </DemoBlock>
    </section>
  </div>
</template>

<style scoped>
/* ── Slot builder ───────────────────────────────────── */
.slot-builder {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.slot-toggles {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.slot-toggle {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  user-select: none;
}

.slot-toggle input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.slot-toggle__track {
  width: 2.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  background: var(--border);
  position: relative;
  transition: background 0.2s;
  flex-shrink: 0;
}

.slot-toggle input:checked + .slot-toggle__track { background: var(--vue); }

.slot-toggle__knob {
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

.slot-toggle input:checked + .slot-toggle__track .slot-toggle__knob { transform: translateX(1rem); }

.slot-toggle code {
  font-size: 0.78rem;
  font-family: var(--mono);
  color: var(--text-muted);
  background: var(--tag-bg);
  padding: 0.1em 0.4em;
  border-radius: 3px;
}

.slot-arrow {
  font-size: 1.5rem;
  color: var(--vue);
  opacity: 0.5;
}

.slot-hint {
  font-size: 0.8rem;
  color: var(--text-muted);
  padding: 0.6rem 0.875rem;
  background: var(--surface-alt);
  border: 1px dashed var(--border);
  border-radius: var(--radius);
  line-height: 1.6;
}

.slot-hint code {
  font-family: var(--mono);
  font-size: 0.8em;
  color: var(--vue-dark);
}

html.dark .slot-hint code { color: var(--vue); }

/* ── Card transition ────────────────────────────────── */
.card-update-enter-active,
.card-update-leave-active {
  transition: opacity 0.18s, transform 0.18s;
}

.card-update-enter-from,
.card-update-leave-to {
  opacity: 0;
  transform: scale(0.97);
}

/* ── Slot action buttons ────────────────────────────── */
.slot-action-btn {
  padding: 0.3rem 0.75rem;
  border-radius: 5px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid var(--border);
  transition: all 0.12s;
}

.slot-action-btn--ghost {
  background: transparent;
  color: var(--text-muted);
}

.slot-action-btn--ghost:hover { background: var(--bg); color: var(--text); }

.slot-action-btn--primary {
  background: var(--vue);
  border-color: var(--vue);
  color: #fff;
}

.slot-action-btn--primary:hover { background: #38a374; }

/* ── Compact row ────────────────────────────────────── */
.row-compact {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 1rem;
  font-size: 0.825rem;
}

.row-compact__num {
  font-family: var(--mono);
  font-size: 0.7rem;
  color: var(--text-muted);
  width: 1rem;
  text-align: center;
  flex-shrink: 0;
}

.row-compact__dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  flex-shrink: 0;
}

.row-compact__name { font-weight: 600; color: var(--text); flex: 1; }
.row-compact__role { font-size: 0.75rem; color: var(--text-muted); }

/* ── Detailed row ───────────────────────────────────── */
.row-detailed {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.875rem 1rem;
}

.row-detailed__avatar {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #42b883, #35495e);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.row-detailed__body { flex: 1; }
.row-detailed__name { font-size: 0.875rem; font-weight: 600; color: var(--text); }
.row-detailed__meta { font-size: 0.72rem; color: var(--text-muted); margin-top: 0.1rem; }
.row-detailed__status { font-size: 0.72rem; font-weight: 600; white-space: nowrap; }
</style>
