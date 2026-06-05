<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../components/DemoBlock.vue'
import ConceptCallout from '../components/ConceptCallout.vue'
import CounterButton from '../components/demos/emits/CounterButton.vue'
import CustomInput from '../components/demos/emits/CustomInput.vue'
import ReactionBar from '../components/demos/emits/ReactionBar.vue'
import CounterButtonSource from '../components/demos/emits/CounterButton.vue?raw'
import CustomInputSource from '../components/demos/emits/CustomInput.vue?raw'
import ReactionBarSource from '../components/demos/emits/ReactionBar.vue?raw'

/* ── Counter log ────────────────────────────────────── */
const counterLog = ref<string[]>([])

function onCounterChange(value: number) {
  counterLog.value.unshift(`← emit('change', ${value})`)
  if (counterLog.value.length > 5) counterLog.value.pop()
}

function onCounterReset() {
  counterLog.value.unshift(`← emit('reset')`)
  if (counterLog.value.length > 5) counterLog.value.pop()
}

/* ── Reactions log ──────────────────────────────────── */
const reactLog = ref<string[]>([])

function onReact(emoji: string, count: number) {
  reactLog.value.unshift(`← emit('react', '${emoji}', ${count})`)
  if (reactLog.value.length > 5) reactLog.value.pop()
}

/* ── v-model ────────────────────────────────────────── */
const inputValue = ref('')
</script>

<template>
  <div>
    <header class="page-header">
      <h1 class="page-title">Emits</h1>
      <p class="page-subtitle">
        Communication <strong>enfant → parent</strong>. L'enfant émet des événements,
        le parent les écoute. Jamais l'inverse — les données ne remontent pas toutes
        seules.
      </p>
    </header>

    <!-- ── Réactions ─────────────────────────────────── -->
    <section class="section">
      <h2 class="section-title">Réactions — emit avec payload</h2>
      <p class="section-text">
        Chaque clic émet un événement avec des données (le type d'emoji et le nouveau
        compteur). Le parent reçoit tout ça et fait ce qu'il veut avec.
      </p>

      <ConceptCallout type="why">
        <strong>Pourquoi des emits ?</strong> Parce qu'un composant ne doit pas
        modifier directement les données du parent. Il dit <em>"quelque chose s'est
        passé"</em> — au parent de décider quoi faire.
      </ConceptCallout>

      <DemoBlock
        title="ReactionBar.vue"
        description="defineEmits typé — chaque événement documente son payload dans la signature."
        :code="ReactionBarSource"
      >
        <div class="demo-panel">
          <div class="preview">
            <ReactionBar @react="onReact" />
          </div>
          <div class="event-log">
            <div class="event-log__header">
              Journal des événements reçus par le parent
            </div>
            <div class="event-log__body">
              <span v-if="reactLog.length === 0" class="event-log__empty">
                Clique sur une réaction…
              </span>
              <span
                v-for="(entry, i) in reactLog"
                :key="i"
                class="event-log__entry"
              >{{ entry }}</span>
            </div>
          </div>
        </div>
      </DemoBlock>
    </section>

    <!-- ── Counter ────────────────────────────────────── -->
    <section class="section">
      <h2 class="section-title">Compteur — tuples typés (Vue 3.3+)</h2>
      <p class="section-text">
        La syntaxe <code>{ eventName: [param: Type] }</code> (tuple nommé) permet à
        TypeScript de valider les payloads à l'émission ET à la réception.
      </p>

      <ConceptCallout type="tip">
        Vue 3.3 a introduit les <strong>tuples nommés</strong> dans
        <code>defineEmits</code>. Le nom du paramètre
        (<code>value: number</code>) apparaît dans l'autocomplétion de l'IDE.
      </ConceptCallout>

      <DemoBlock
        title="CounterButton.vue"
        description="Émet 'change' avec le nombre courant, et 'reset' sans payload."
        :code="CounterButtonSource"
      >
        <div class="demo-panel">
          <div class="preview">
            <CounterButton @change="onCounterChange" @reset="onCounterReset" />
          </div>
          <div class="event-log">
            <div class="event-log__header">Journal</div>
            <div class="event-log__body">
              <span v-if="counterLog.length === 0" class="event-log__empty">
                Interagis avec le compteur…
              </span>
              <span
                v-for="(entry, i) in counterLog"
                :key="i"
                class="event-log__entry"
              >{{ entry }}</span>
            </div>
          </div>
        </div>
      </DemoBlock>
    </section>

    <!-- ── v-model ────────────────────────────────────── -->
    <section class="section">
      <h2 class="section-title">v-model custom — defineModel</h2>
      <p class="section-text">
        <code>defineModel()</code> (Vue 3.4+) crée un ref bidirectionnel en une
        ligne. Plus besoin d'écrire la prop <code>modelValue</code> ni l'emit
        <code>update:modelValue</code> — Vue le génère pour toi.
      </p>

      <ConceptCallout type="info">
        Avant Vue 3.4, il fallait écrire
        <code>defineProps(['modelValue'])</code> + <code>defineEmits(['update:modelValue'])</code>.
        <code>defineModel</code> les remplace les deux.
      </ConceptCallout>

      <DemoBlock
        title="CustomInput.vue"
        description="Input avec compteur de caractères, bindé via v-model depuis le parent."
        :code="CustomInputSource"
      >
        <div class="demo-panel">
          <CustomInput v-model="inputValue" />
          <div class="model-readout">
            <span class="model-readout__key">v-model value</span>
            <span class="model-readout__eq">=</span>
            <span class="model-readout__val">
              "{{ inputValue }}"
            </span>
          </div>
        </div>
      </DemoBlock>
    </section>
  </div>
</template>

<style scoped>
.model-readout {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  font-family: var(--mono);
  font-size: 0.8rem;
  flex-wrap: wrap;
}

.model-readout__key {
  color: #3b82f6;
}

.model-readout__eq {
  color: var(--text-muted);
}

.model-readout__val {
  color: #22c55e;
  word-break: break-all;
  min-height: 1.2em;
}
</style>
