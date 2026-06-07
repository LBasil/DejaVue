<script setup lang="ts">
import DemoBlock from '../components/DemoBlock.vue'
import ConceptCallout from '../components/ConceptCallout.vue'
import ReactiveCounter from '../components/demos/intro/ReactiveCounter.vue'
import TemplateSyntax from '../components/demos/intro/TemplateSyntax.vue'
import ReactiveCounterSource from '../components/demos/intro/ReactiveCounter.vue?raw'
import TemplateSyntaxSource from '../components/demos/intro/TemplateSyntax.vue?raw'
import { useLevel } from '../composables/useLevel'

const { level } = useLevel()
</script>

<template>
  <div>
    <header class="page-header">
      <h1 class="page-title">Introduction</h1>
      <p class="page-subtitle">
        Ce que Vue fait, comment il le fait, et pourquoi ça marche comme ça.
        Pas de théorie pour la théorie - du concret.
      </p>
    </header>

    <!-- ── Section 1 : Vue et la réactivité ──────────── -->
    <section class="section">
      <h2 class="section-title">Vue et la réactivité</h2>
      <p class="section-text">
        Vue est un framework JavaScript pour construire des interfaces utilisateur.
        Son principe central : tu déclares des données réactives, et Vue maintient
        ton interface synchronisée avec elles automatiquement. Quand les données
        changent, l'écran se met à jour - sans que tu aies besoin de toucher le DOM.
      </p>

      <ConceptCallout type="why">
        Tu décris <em>quoi</em> afficher, pas <em>comment</em> mettre à jour le DOM.
        Vue s'occupe de la synchronisation. Moins de code impératif, moins de bugs
        liés à l'état désynchronisé.
      </ConceptCallout>

      <ConceptCallout v-if="level !== 'beginner'" type="tip" title="Dépendances automatiques">
        Vue construit un graphe de dépendances à l'exécution. Quand tu lis
        <code>count.value</code> dans un template ou un <code>computed</code>, Vue
        enregistre cette lecture. Quand <code>count</code> change, Vue sait exactement
        quels composants et quels computeds en dépendent - et ne re-rend que ceux-là.
        Pas de virtualDOM diff complet à chaque changement.
      </ConceptCallout>

      <ConceptCallout v-if="level === 'experienced'" type="info" title="Sous le capot">
        Vue 3 implémente la réactivité via <code>Proxy</code> JavaScript. Chaque
        <code>ref()</code> ou <code>reactive()</code> crée un proxy qui intercepte les
        accès (<code>get</code>) et modifications (<code>set</code>). L'effet actif
        (template, computed, watch) est stocké dans une variable globale. Les dépendances
        sont indexées dans une <code>WeakMap</code> : objet → clé → Set d'effets abonnés.
        Contrairement au <code>Object.defineProperty</code> de Vue 2, <code>Proxy</code>
        intercepte les ajouts de propriétés et les accès de tableau sans patcher les
        méthodes natives.
      </ConceptCallout>

      <DemoBlock
        title="ReactiveCounter.vue"
        description="ref() + computed() en action - modifie le compteur et observe la mise à jour."
        :code="ReactiveCounterSource"
      >
        <ReactiveCounter />
      </DemoBlock>
    </section>

    <!-- ── Section 2 : Le template ───────────────────── -->
    <section class="section">
      <h2 class="section-title">Le template</h2>
      <p class="section-text">
        Le <code>&lt;template&gt;</code> d'un composant Vue décrit sa structure HTML.
        Vue étend le HTML standard avec des directives - des attributs spéciaux préfixés
        <code>v-</code> - qui relient le balisage à l'état réactif.
      </p>

      <ConceptCallout type="tip">
        Les cinq directives essentielles :<br />
        <code>{{ }}</code> - interpoler une valeur dans le texte<br />
        <code>:attr</code> - binder un attribut HTML à une expression (<code>v-bind</code>)<br />
        <code>@event</code> - écouter un événement DOM (<code>v-on</code>)<br />
        <code>v-if / v-else</code> - rendu conditionnel<br />
        <code>v-for="item in list"</code> - rendu de liste
      </ConceptCallout>

      <ConceptCallout v-if="level !== 'beginner'" type="tip" title="Shorthands">
        <code>v-bind:href="url"</code> s'abrège <code>:href="url"</code> - le
        <code>:</code> est le shorthand de <code>v-bind</code>.<br />
        <code>v-on:click="fn"</code> s'abrège <code>@click="fn"</code>.<br />
        Ces shorthands sont la norme dans tout le code Vue moderne. La forme longue
        n'apparaît pratiquement que dans la documentation officielle.
      </ConceptCallout>

      <ConceptCallout v-if="level === 'experienced'" type="info" title="Compilation du template">
        Le template n'est pas interprété à runtime - il est compilé en render function
        JavaScript par <code>@vue/compiler-dom</code> (via Vite en dev, offline en build).
        L'analyse statique génère des <code>patchFlags</code> sur les nœuds dynamiques.
        Un <code v-pre>&lt;div&gt;{{ name }}&lt;/div&gt;</code> reçoit le flag <code>TEXT (1)</code>
        : le runtime sait qu'il ne doit comparer que le contenu texte, pas les attributs.
        Les nœuds entièrement statiques sont hoistés hors de la render function et ne
        participent pas du tout au diff.
      </ConceptCallout>

      <DemoBlock
        title="TemplateSyntax.vue"
        description="v-model, v-if, v-for, :style, @click - les directives essentielles en un seul composant."
        :code="TemplateSyntaxSource"
      >
        <TemplateSyntax />
      </DemoBlock>
    </section>

    <!-- ── Section 3 : Les composants ───────────────── -->
    <section class="section">
      <h2 class="section-title">Les composants</h2>
      <p class="section-text">
        En Vue, tout est composant. Chaque fichier <code>.vue</code> est une brique
        réutilisable avec sa propre logique, son template et ses styles. Tu assembles
        ces briques pour construire des pages, et tu connectes les pages avec un routeur.
      </p>

      <ConceptCallout type="why">
        Deux instances du même composant ont deux états distincts. Tu peux réutiliser
        <code>&lt;Counter /&gt;</code> cinquante fois sur la même page - chacune a son
        propre compteur, ses propres refs, son propre cycle de vie. C'est ce qui rend
        les composants vraiment réutilisables.
      </ConceptCallout>

      <ConceptCallout v-if="level !== 'beginner'" type="tip" title="Les trois canaux de communication">
        Les composants communiquent entre eux par trois mécanismes :<br />
        <strong>Props</strong> - le parent envoie des données vers l'enfant.<br />
        <strong>Emits</strong> - l'enfant signale des événements vers le parent.<br />
        <strong>Slots</strong> - le parent injecte du contenu dans l'enfant.<br />
        La suite de ce carnet couvre chacun de ces canaux avec des démos interactives.
      </ConceptCallout>

      <ConceptCallout v-if="level === 'experienced'" type="info" title="setup() sous le capot">
        En Vue 3, chaque composant instancié exécute <code>setup()</code> une seule fois
        et retourne les refs et fonctions exposées au template. Vue 3 repose sur des
        closures plutôt que sur des classes et <code>this</code> (Vue 2). Cette architecture
        rend les composables naturels : une fonction qui appelle <code>ref()</code>,
        <code>computed()</code> ou <code>watch()</code> dans son scope et retourne
        ces primitives - pas de magie, juste une closure.
      </ConceptCallout>

      <div class="component-tree">
        <div class="ct-root">
          <span class="ct-node ct-node--root">App.vue</span>
          <div class="ct-children">
            <div class="ct-branch">
              <span class="ct-node">Sidebar.vue</span>
            </div>
            <div class="ct-branch">
              <span class="ct-node">MainView.vue</span>
              <div class="ct-children">
                <div class="ct-branch">
                  <span class="ct-node ct-node--highlight">Counter.vue</span>
                  <span class="ct-note">count = 3</span>
                </div>
                <div class="ct-branch">
                  <span class="ct-node ct-node--highlight">Counter.vue</span>
                  <span class="ct-note">count = 0 - état indépendant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ── Component tree diagram ─────────────────────────── */
.component-tree {
  margin-top: 1rem;
  font-family: var(--mono);
  font-size: 0.78rem;
}

.ct-root { display: flex; flex-direction: column; }

.ct-children {
  margin-left: 1.25rem;
  padding-left: 0.875rem;
  border-left: 1.5px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
}

.ct-branch {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.ct-node {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.6rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  color: var(--text-muted);
  transition: border-color 0.12s;
}

.ct-node--root {
  margin-bottom: 0.3rem;
  font-weight: 600;
  color: var(--text);
}

.ct-node--highlight {
  border-color: var(--vue);
  color: var(--vue);
  background: rgba(66, 184, 131, 0.07);
}

.ct-note {
  font-size: 0.65rem;
  color: var(--text-muted);
  font-style: italic;
}
</style>
