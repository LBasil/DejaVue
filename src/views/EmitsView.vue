<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../components/DemoBlock.vue'
import CounterButton from '../components/demos/emits/CounterButton.vue'
import CustomInput from '../components/demos/emits/CustomInput.vue'
import CounterButtonSource from '../components/demos/emits/CounterButton.vue?raw'
import CustomInputSource from '../components/demos/emits/CustomInput.vue?raw'

const eventLog = ref<string[]>([])
const inputValue = ref('')

function onCounterChange(value: number) {
  eventLog.value.unshift(`emit('change', ${value})`)
  if (eventLog.value.length > 6) eventLog.value.pop()
}

function onCounterReset() {
  eventLog.value.unshift(`emit('reset')`)
  if (eventLog.value.length > 6) eventLog.value.pop()
}
</script>

<template>
  <div>
    <header class="page-header">
      <h1 class="page-title">Emits</h1>
      <p class="page-subtitle">
        Communication <strong>enfant → parent</strong>. <code>defineEmits&lt;T&gt;()</code>
        en Vue 3.3+ accepte une syntaxe de tuples nommés qui documente chaque payload
        directement dans la signature. <code>defineModel</code> (3.4+) simplifie le
        pattern <code>v-model</code> custom en une seule ligne.
      </p>
    </header>

    <!-- CounterButton -->
    <section class="section">
      <h2 class="section-title">defineEmits avec tuples typés</h2>
      <p class="section-text">
        La syntaxe <code>{ eventName: [param: Type] }</code> permet à TypeScript de valider
        les payloads à l'émission ET à la réception dans le parent.
      </p>

      <DemoBlock
        title="CounterButton.vue"
        description="Émet 'change' avec le nombre courant, et 'reset' sans payload."
        :code="CounterButtonSource"
      >
        <div class="demo-panel">
          <div class="preview">
            <CounterButton
              @change="onCounterChange"
              @reset="onCounterReset"
            />
          </div>
          <div class="event-log">
            <div class="event-log__header">Journal des événements</div>
            <div class="event-log__body">
              <span v-if="eventLog.length === 0" class="event-log__empty">
                Interagis avec le compteur…
              </span>
              <span
                v-for="(entry, i) in eventLog"
                :key="i"
                class="event-log__entry"
              >
                {{ entry }}
              </span>
            </div>
          </div>
        </div>
      </DemoBlock>
    </section>

    <!-- CustomInput / v-model -->
    <section class="section">
      <h2 class="section-title">v-model custom avec defineModel</h2>
      <p class="section-text">
        <code>defineModel()</code> crée un ref bidirectionnel bindable via
        <code>v-model</code> depuis le parent — sans écrire manuellement la prop
        <code>modelValue</code> ni l'emit <code>update:modelValue</code>.
      </p>

      <DemoBlock
        title="CustomInput.vue"
        description="Input avec compteur de caractères. Bindé via v-model dans le parent."
        :code="CustomInputSource"
      >
        <div class="demo-panel">
          <CustomInput v-model="inputValue" />
          <div class="model-output">
            <span class="model-output__label">v-model value :</span>
            <span class="model-output__value">{{ inputValue || '—' }}</span>
          </div>
        </div>
      </DemoBlock>
    </section>
  </div>
</template>

<style scoped>
.model-output {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  padding: 0.4rem 0.75rem;
  background: #f8fafc;
  border: 1px solid var(--border);
  border-radius: 6px;
}

.model-output__label {
  font-family: var(--mono);
  color: var(--text-muted);
}

.model-output__value {
  font-family: var(--mono);
  font-weight: 600;
  color: var(--vue-dark);
  word-break: break-all;
}
</style>
