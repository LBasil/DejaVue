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
import { useLevel } from '../composables/useLevel'

const { advanced } = useLevel()

const counterLog = ref<string[]>([])
const reactLog = ref<string[]>([])
const inputValue = ref('')

function onCounterChange(value: number) {
  counterLog.value.unshift(`← emit('change', ${value})`)
  if (counterLog.value.length > 5) counterLog.value.pop()
}

function onCounterReset() {
  counterLog.value.unshift(`← emit('reset')`)
  if (counterLog.value.length > 5) counterLog.value.pop()
}

function onReact(emoji: string, count: number) {
  reactLog.value.unshift(`← emit('react', '${emoji}', ${count})`)
  if (reactLog.value.length > 5) reactLog.value.pop()
}
</script>

<template>
  <div>
    <header class="page-header">
      <h1 class="page-title">Emits</h1>
      <p class="page-subtitle">
        Les emits font remonter des signaux depuis un enfant vers son parent.
        L'enfant dit "quelque chose s'est passé", le parent décide quoi faire.
        Jamais l'inverse.
      </p>
    </header>

    <!-- ── Section 1 : Réactions ─────────────────────── -->
    <section class="section">
      <h2 class="section-title">Émettre avec un payload</h2>
      <p class="section-text">
        Chaque réaction déclenche un <code>emit</code> avec le type d'emoji et son nouveau
        compteur. Le parent reçoit ces données via <code>@react="handler"</code> et fait ce
        qu'il veut avec — ici, les afficher dans un journal.
      </p>

      <ConceptCallout type="why">
        Pourquoi ne pas laisser l'enfant modifier directement une variable du parent ?
        Parce que ça casserait la traçabilité. Avec les emits, tu sais exactement
        ce qui change, quand, et depuis où. C'est aussi ce qui rend les composants
        testables en isolation.
      </ConceptCallout>

      <ConceptCallout v-if="advanced" type="info" title="Sous le capot">
        <code>defineEmits&lt;T&gt;()</code> en TypeScript générique génère des
        validateurs runtime en dev — Vue vérifie que les événements émis
        correspondent aux déclarations. En production, le tree-shaker retire
        ces validateurs. Contrairement aux props, Vue ne génère pas de warning
        si tu émets un événement non déclaré, mais l'IDE et TypeScript te
        l'indiquent.
      </ConceptCallout>

      <DemoBlock
        title="ReactionBar.vue"
        description="defineEmits avec payload typé — le journal montre ce que le parent reçoit."
        :code="ReactionBarSource"
      >
        <div class="demo-panel">
          <div class="preview">
            <ReactionBar @react="onReact" />
          </div>
          <div class="event-log">
            <div class="event-log__header">Événements reçus par le parent</div>
            <div class="event-log__body">
              <span v-if="reactLog.length === 0" class="event-log__empty">Clique sur une réaction...</span>
              <span v-for="(e, i) in reactLog" :key="i" class="event-log__entry">{{ e }}</span>
            </div>
          </div>
        </div>
      </DemoBlock>
    </section>

    <!-- ── Section 2 : Compteur ──────────────────────── -->
    <section class="section">
      <h2 class="section-title">Tuples nommés — Vue 3.3+</h2>
      <p class="section-text">
        La syntaxe <code>{ eventName: [param: Type] }</code> documente le payload
        directement dans la signature. L'IDE autocomplète les paramètres à l'écoute
        et à l'émission.
      </p>

      <ConceptCallout type="tip">
        Les labels dans les tuples (<code>value: number</code>) sont purement
        documentaires — ils disparaissent complètement à la compilation. Aucun
        impact sur le bundle.
      </ConceptCallout>

      <ConceptCallout v-if="advanced" type="info" title="Typage côté parent">
        Quand tu écoutes <code>@change="handler"</code>, TypeScript infère
        automatiquement le type du paramètre de <code>handler</code> depuis les
        déclarations d'emits. Si tu renommes ou changes le type dans
        <code>defineEmits</code>, l'erreur remonte jusqu'au parent. C'est du type-safety
        cross-composant sans aucune configuration supplémentaire.
      </ConceptCallout>

      <DemoBlock
        title="CounterButton.vue"
        description="Émet 'change' avec la valeur courante, 'reset' sans payload."
        :code="CounterButtonSource"
      >
        <div class="demo-panel">
          <div class="preview">
            <CounterButton @change="onCounterChange" @reset="onCounterReset" />
          </div>
          <div class="event-log">
            <div class="event-log__header">Journal</div>
            <div class="event-log__body">
              <span v-if="counterLog.length === 0" class="event-log__empty">Interagis avec le compteur...</span>
              <span v-for="(e, i) in counterLog" :key="i" class="event-log__entry">{{ e }}</span>
            </div>
          </div>
        </div>
      </DemoBlock>
    </section>

    <!-- ── Section 3 : v-model ───────────────────────── -->
    <section class="section">
      <h2 class="section-title">defineModel — v-model en une ligne</h2>
      <p class="section-text">
        <code>defineModel()</code> (Vue 3.4+) crée un ref bidirectionnel bindable
        directement avec <code>v-model</code>. Plus besoin d'écrire la prop
        <code>modelValue</code> et l'emit <code>update:modelValue</code> à la main.
      </p>

      <ConceptCallout type="info">
        Avant Vue 3.4, le pattern v-model custom s'écrivait :
        <code>defineProps(['modelValue'])</code> +
        <code>defineEmits(['update:modelValue'])</code>, puis
        <code>emit('update:modelValue', newVal)</code> à chaque changement.
        <code>defineModel</code> fait exactement ça, mais compilé.
      </ConceptCallout>

      <ConceptCallout v-if="advanced" type="info" title="defineModel sous le capot">
        <code>const model = defineModel&lt;string&gt;()</code> compile vers une prop
        <code>modelValue</code> + un emit <code>update:modelValue</code>. Le ref
        retourné est un <code>WritableComputedRef</code> — lire <code>model.value</code>
        lit la prop, écrire <code>model.value = x</code> émet
        <code>update:modelValue</code>. Vue 3.4 supporte aussi plusieurs
        <code>defineModel</code> par composant, pour des bindings nommés :
        <code>v-model:title</code>, <code>v-model:content</code>, etc.
      </ConceptCallout>

      <DemoBlock
        title="CustomInput.vue"
        description="Input avec compteur de caractères — bindé via v-model depuis le parent."
        :code="CustomInputSource"
      >
        <div class="demo-panel">
          <CustomInput v-model="inputValue" />
          <div class="model-readout">
            <span class="model-readout__key">v-model</span>
            <span class="model-readout__eq">=</span>
            <span class="model-readout__val">"{{ inputValue }}"</span>
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

.model-readout__key  { color: #3b82f6; }
.model-readout__eq   { color: var(--text-muted); }
.model-readout__val  { color: #22c55e; word-break: break-all; min-height: 1.2em; }
</style>
