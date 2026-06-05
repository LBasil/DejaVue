<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../components/DemoBlock.vue'
import AppBadge from '../components/demos/props/AppBadge.vue'
import UserCard from '../components/demos/props/UserCard.vue'
import AppBadgeSource from '../components/demos/props/AppBadge.vue?raw'
import UserCardSource from '../components/demos/props/UserCard.vue?raw'

type Variant = 'success' | 'warning' | 'danger' | 'info'
type Size = 'sm' | 'md' | 'lg'
type Status = 'online' | 'away' | 'offline'

const badgeVariant = ref<Variant>('success')
const badgeSize = ref<Size>('md')
const badgeDot = ref(true)

const cardStatus = ref<Status>('online')
const cardVerified = ref(true)
</script>

<template>
  <div>
    <header class="page-header">
      <h1 class="page-title">Props</h1>
      <p class="page-subtitle">
        Communication <strong>parent → enfant</strong>. En Vue 3 avec
        <code>defineProps&lt;T&gt;()</code>, les types sont inférés directement depuis
        TypeScript sans déclaration redondante. <code>withDefaults</code> gère les
        valeurs par défaut tout en conservant la sûreté des types.
      </p>
    </header>

    <!-- AppBadge -->
    <section class="section">
      <h2 class="section-title">Union types + withDefaults</h2>
      <p class="section-text">
        Props typées avec des union types littéraux. <code>withDefaults</code> permet de
        définir des valeurs par défaut sans perdre l'inférence TypeScript.
      </p>

      <DemoBlock
        title="AppBadge.vue"
        description="Variant, size, dot — tout est typé, tout est guidé par l'IDE."
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

    <!-- UserCard -->
    <section class="section">
      <h2 class="section-title">Interface TypeScript + props calculées</h2>
      <p class="section-text">
        Quand les props forment un ensemble cohérent, une <code>interface</code> nommée
        améliore la lisibilité. Les computed peuvent dépendre des props directement dans
        <code>&lt;script setup&gt;</code>.
      </p>

      <DemoBlock
        title="UserCard.vue"
        description="Interface Props, computed initiales, record de couleurs indexé par status."
        :code="UserCardSource"
      >
        <div class="demo-panel">
          <div class="controls">
            <div class="control-item">
              <span class="control-label">status</span>
              <div class="btn-group">
                <button
                  v-for="s in (['online', 'away', 'offline'] as Status[])"
                  :key="s"
                  :class="['btn-xs', { active: cardStatus === s }]"
                  @click="cardStatus = s"
                >{{ s }}</button>
              </div>
            </div>
            <div class="control-item">
              <span class="control-label">verified</span>
              <button class="btn-toggle" @click="cardVerified = !cardVerified">
                {{ cardVerified }}
              </button>
            </div>
          </div>
          <div class="preview">
            <UserCard
              name="Basil Lhote"
              role="Lead Developer"
              :status="cardStatus"
              :verified="cardVerified"
            />
          </div>
        </div>
      </DemoBlock>
    </section>
  </div>
</template>
