<script setup lang="ts">
import DemoBlock from '../components/DemoBlock.vue'
import ConceptCallout from '../components/ConceptCallout.vue'
import HelloVue from '../components/demos/intro/HelloVue.vue'
import HelloVueSource from '../components/demos/intro/HelloVue.vue?raw'
import { useLevel } from '../composables/useLevel'

const { level } = useLevel()

const createCommand = `npm create vite@latest mon-app -- --template vue-ts
cd mon-app
npm install
npm run dev`

const fileTree = `mon-app/
├── src/
│   ├── main.ts          ← monte l'app Vue dans le DOM
│   ├── App.vue          ← composant racine
│   ├── assets/          ← images, CSS importés
│   └── components/      ← tes composants
├── index.html           ← point d'entrée HTML
├── vite.config.ts       ← config Vite
├── tsconfig.json        ← config TypeScript
└── package.json         ← dépendances`
</script>

<template>
  <div>
    <header class="page-header">
      <h1 class="page-title">Mise en place</h1>
      <p class="page-subtitle">
        De zéro à un projet Vue 3 + TypeScript en local.
        Tout ce dont tu as besoin, rien de plus.
      </p>
    </header>

    <!-- ── Section 1 : Créer un projet ───────────────── -->
    <section class="section">
      <h2 class="section-title">Créer un projet</h2>
      <p class="section-text">
        La commande officielle utilise
        <a href="https://vitejs.dev" target="_blank" rel="noopener" class="inline-link">Vite</a>
        comme bundler. C'est le setup recommandé pour tout nouveau projet Vue 3.
        Prérequis : Node.js 18+.
      </p>

      <div class="terminal-block">
        <div class="terminal-block__header">
          <span class="terminal-dot terminal-dot--red" />
          <span class="terminal-dot terminal-dot--yellow" />
          <span class="terminal-dot terminal-dot--green" />
          <span class="terminal-block__title">Terminal</span>
        </div>
        <pre class="terminal-block__body">{{ createCommand }}</pre>
      </div>

      <ConceptCallout type="tip">
        <code>--template vue-ts</code> configure le projet avec Vue 3 et TypeScript
        d'emblée. Retire <code>-ts</code> si tu veux JavaScript pur. Le <code>npm run dev</code>
        lance un serveur local avec rechargement instantané.
      </ConceptCallout>

      <ConceptCallout v-if="level !== 'beginner'" type="tip" title="Pourquoi Vite ?">
        Vite démarre en millisecondes : en développement, il sert les modules ES directement
        au navigateur sans bundler. Le HMR (Hot Module Replacement) est quasi-instantané.
        En production, il utilise Rollup pour produire un bundle optimisé. Sur les gros
        projets, Vite est plusieurs dizaines de fois plus rapide que Webpack au démarrage.
      </ConceptCallout>

      <ConceptCallout v-if="level === 'experienced'" type="info" title="Le pipeline de compilation">
        <code>vite.config.ts</code> charge <code>@vitejs/plugin-vue</code>, qui appelle
        <code>@vue/compiler-sfc</code> à chaque import de fichier <code>.vue</code>. Le
        SFC est découpé et chaque bloc est transformé séparément. <code>vue-tsc</code>
        (wrapping de <code>tsc</code>) assure la vérification de types sur les SFCs -
        <code>tsconfig.app.json</code> inclut <code>"types": ["vite/client"]</code> pour
        que TypeScript reconnaisse les imports <code>?raw</code>, <code>?url</code>, etc.
        En dev, la transpilation runtime utilise esbuild (rapide, sans vérification de types).
      </ConceptCallout>
    </section>

    <!-- ── Section 2 : Structure du projet ───────────── -->
    <section class="section">
      <h2 class="section-title">Structure du projet</h2>
      <p class="section-text">
        Un projet Vite Vue a une structure prévisible. Voici les fichiers que tu
        toucheras au quotidien.
      </p>

      <div class="file-tree-block">
        <pre class="file-tree-block__pre">{{ fileTree }}</pre>
      </div>

      <ConceptCallout type="info">
        <code>main.ts</code> fait une seule chose : monter l'app Vue sur un élément DOM.
        C'est là que tu ajoutes les plugins (routeur, store, i18n).
        <code>App.vue</code> est le premier composant rendu - la racine de l'arbre.
      </ConceptCallout>

      <ConceptCallout v-if="level !== 'beginner'" type="tip" title="assets/ vs public/">
        <code>src/assets/</code> : fichiers importés dans ton code TypeScript ou CSS.
        Vite les optimise (hash de cache, compression). Accès : <code>import logo from '@/assets/logo.svg'</code>.<br />
        <code>public/</code> : fichiers servis tels quels, accessibles par leur chemin absolu.
        Utile pour <code>favicon.ico</code> ou des ressources référencées dans <code>index.html</code>.
      </ConceptCallout>

      <ConceptCallout v-if="level === 'experienced'" type="info" title="Path aliases et tsconfig">
        <code>vite.config.ts</code> peut définir des aliases :<br />
        <code>resolve: &#123; alias: &#123; '@': '/src' &#125; &#125;</code><br />
        Pour que TypeScript reconnaisse <code>@/</code>, ajoute dans <code>tsconfig.json</code> :<br />
        <code>compilerOptions.paths: &#123; "@/*": ["./src/*"] &#125;</code><br />
        Sans ça, les imports compilent mais TypeScript signale une erreur de module introuvable.
      </ConceptCallout>
    </section>

    <!-- ── Section 3 : Anatomie d'un SFC ─────────────── -->
    <section class="section">
      <h2 class="section-title">Anatomie d'un SFC</h2>
      <p class="section-text">
        Un Single File Component (SFC) est un fichier <code>.vue</code> qui regroupe
        les trois parties d'un composant dans un seul endroit.
        C'est le format central de tout projet Vue.
      </p>

      <ConceptCallout type="tip">
        Les trois blocs :<br />
        <code>&lt;script setup lang="ts"&gt;</code> - logique, réactivité, imports.<br />
        <code>&lt;template&gt;</code> - le HTML du composant avec les directives Vue.<br />
        <code>&lt;style scoped&gt;</code> - les styles, isolés à ce composant.<br />
        Seul <code>&lt;template&gt;</code> est obligatoire.
      </ConceptCallout>

      <ConceptCallout v-if="level !== 'beginner'" type="tip" title="Pourquoi scoped ?">
        Sans <code>scoped</code>, les styles d'un composant s'appliquent globalement et
        peuvent écraser d'autres composants. Avec <code>scoped</code>, Vue génère un
        attribut unique (<code>data-v-xxxxxxxx</code>) sur chaque élément du composant
        et le préfixe dans le sélecteur CSS. Les styles ne fuient pas. Contre-partie :
        tu ne peux pas styler un composant enfant depuis le parent avec des sélecteurs
        scoped - utilise <code>:deep()</code> dans ce cas.
      </ConceptCallout>

      <ConceptCallout v-if="level === 'experienced'" type="info" title="Compilation d'un SFC">
        <code>@vue/compiler-sfc</code> découpe le SFC, compile chaque bloc séparément,
        puis les réassemble en module ES. <code>&lt;script setup&gt;</code> devient un
        appel <code>setup(props, ctx)</code> avec les macros compilées
        (<code>defineProps</code>, <code>defineEmits</code>, etc. disparaissent au profit
        d'options classiques). <code>&lt;template&gt;</code> devient une render function
        avec patchFlags. <code>&lt;style scoped&gt;</code> génère des règles CSS suffixées
        par l'identifiant d'instance.
      </ConceptCallout>

      <DemoBlock
        title="HelloVue.vue"
        description="Les trois blocs d'un SFC dans leur plus simple expression - tape ton prénom."
        :code="HelloVueSource"
      >
        <HelloVue />
      </DemoBlock>
    </section>
  </div>
</template>

<style scoped>
.inline-link {
  color: var(--vue);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.inline-link:hover { color: #38a374; }

/* ── Terminal block ─────────────────────────────────── */
.terminal-block {
  background: #1a1a2e;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1rem;
  box-shadow: var(--shadow);
}

.terminal-block__header {
  background: #252540;
  padding: 0.5rem 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.terminal-dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
}

.terminal-dot--red    { background: #ff5f57; }
.terminal-dot--yellow { background: #febc2e; }
.terminal-dot--green  { background: #28c840; }

.terminal-block__title {
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.3);
  margin-left: 0.25rem;
  font-family: var(--mono);
}

.terminal-block__body {
  padding: 1rem 1.25rem;
  font-family: var(--mono);
  font-size: 0.8rem;
  color: #a8ff78;
  line-height: 2;
  margin: 0;
  overflow-x: auto;
  white-space: pre;
}

/* ── File tree ──────────────────────────────────────── */
.file-tree-block {
  background: var(--surface-alt);
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.file-tree-block__pre {
  padding: 1rem 1.25rem;
  font-family: var(--mono);
  font-size: 0.78rem;
  color: var(--text-muted);
  line-height: 1.85;
  margin: 0;
  overflow-x: auto;
  white-space: pre;
}
</style>
