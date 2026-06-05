<script setup lang="ts">
import DemoBlock from '../components/DemoBlock.vue'
import BaseCard from '../components/demos/slots/BaseCard.vue'
import ScopedList from '../components/demos/slots/ScopedList.vue'
import BaseCardSource from '../components/demos/slots/BaseCard.vue?raw'
import ScopedListSource from '../components/demos/slots/ScopedList.vue?raw'

const users = [
  { id: 1, name: 'Alice Martin', role: 'Designer', status: 'online' },
  { id: 2, name: 'Bob Durand', role: 'Dev Backend', status: 'away' },
  { id: 3, name: 'Chloé Roy', role: 'DevOps', status: 'offline' },
]

const statusColors: Record<string, string> = {
  online: '#22c55e',
  away: '#f59e0b',
  offline: '#94a3b8',
}
</script>

<template>
  <div>
    <header class="page-header">
      <h1 class="page-title">Slots</h1>
      <p class="page-subtitle">
        Les slots permettent à un composant parent d'injecter du contenu dans le rendu
        du composant enfant. Les <strong>slots nommés</strong> structurent plusieurs zones,
        les <strong>slots scopés</strong> exposent de la donnée de l'enfant au parent pour
        un rendu personnalisé.
      </p>
    </header>

    <!-- BaseCard — named slots -->
    <section class="section">
      <h2 class="section-title">Slots nommés + guard $slots</h2>
      <p class="section-text">
        <code>$slots.header</code> permet de ne rendre la zone que si le parent fournit
        effectivement du contenu — évite les séparateurs vides indésirables.
      </p>

      <DemoBlock
        title="BaseCard.vue"
        description="Slots #header, default et #footer. Chaque zone est conditionnelle via $slots."
        :code="BaseCardSource"
      >
        <div class="cards-row">
          <!-- Carte complète -->
          <BaseCard :elevated="true">
            <template #header>Profil utilisateur</template>
            Un composant avec header, body et footer renseignés.
            <template #footer>
              <button class="slot-btn slot-btn--ghost">Annuler</button>
              <button class="slot-btn slot-btn--primary">Sauvegarder</button>
            </template>
          </BaseCard>

          <!-- Carte sans footer -->
          <BaseCard>
            <template #header>Note rapide</template>
            Sans slot <code>#footer</code> — la zone footer n'est pas rendue.
          </BaseCard>

          <!-- Carte sans header -->
          <BaseCard>
            Sans header ni footer — seul le slot par défaut est utilisé.
          </BaseCard>
        </div>
      </DemoBlock>
    </section>

    <!-- ScopedList — scoped slots -->
    <section class="section">
      <h2 class="section-title">Slots scopés</h2>
      <p class="section-text">
        L'enfant expose de la donnée (<code>item</code>, <code>index</code>) via
        <code>&lt;slot :item="item" :index="index" /&gt;</code>. Le parent récupère
        ces données avec <code>v-slot="{ item, index }"</code> et décide du rendu.
      </p>

      <DemoBlock
        title="ScopedList.vue"
        description="Le parent contrôle le rendu de chaque ligne tout en laissant la logique de liste à l'enfant."
        :code="ScopedListSource"
      >
        <ScopedList :items="users">
          <template #default="{ item, index }">
            <div class="list-row">
              <span class="list-row__index">{{ index + 1 }}</span>
              <span
                class="list-row__dot"
                :style="{ background: statusColors[item['status'] as string] }"
              />
              <span class="list-row__name">{{ item['name'] }}</span>
              <span class="list-row__role">{{ item['role'] }}</span>
            </div>
          </template>
        </ScopedList>
      </DemoBlock>
    </section>
  </div>
</template>

<style scoped>
.cards-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-start;
}

.slot-btn {
  padding: 0.3rem 0.75rem;
  border-radius: 5px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid var(--border);
  transition: all 0.12s;
}

.slot-btn--ghost {
  background: transparent;
  color: var(--text-muted);
}

.slot-btn--ghost:hover {
  background: var(--bg);
  color: var(--text);
}

.slot-btn--primary {
  background: var(--vue);
  border-color: var(--vue);
  color: #fff;
}

.slot-btn--primary:hover {
  background: #38a374;
}

.list-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 1rem;
  font-size: 0.825rem;
}

.list-row__index {
  font-family: var(--mono);
  font-size: 0.7rem;
  color: var(--text-muted);
  width: 1rem;
  text-align: center;
}

.list-row__dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  flex-shrink: 0;
}

.list-row__name {
  font-weight: 600;
  color: var(--text);
  flex: 1;
}

.list-row__role {
  font-size: 0.75rem;
  color: var(--text-muted);
}
</style>
