# DejaVue

Carnet personnel de patterns Vue 3 + TypeScript. Des composants interactifs, du code réel, et des explications à trois niveaux de profondeur.

Le nom c'est un jeu de mots. Tu l'as compris.

---

## Stack

- **Vue 3** avec `<script setup lang="ts">`
- **TypeScript** strict
- **Vite** pour le dev et le build
- **Vue Router 4** pour la navigation

## Lancer le projet

```bash
npm install
npm run dev
```

Le build de prod (avec vérification TypeScript) :

```bash
npm run build
```

## Ce qu'il y a dedans

| Page | Contenu |
|---|---|
| Introduction | Réactivité, template syntax, modèle de composants |
| Mise en place | Créer un projet Vite, structure, anatomie d'un SFC |
| Props | `defineProps`, `withDefaults`, interfaces TypeScript |
| Emits | `defineEmits`, tuples nommés Vue 3.3+, `defineModel` |
| Slots | Slots nommés, scopés, `$slots` guards |

Chaque section a une démo interactive et affiche le vrai code source du composant via `?raw`.

## Système de niveaux

Un sélecteur en bas de la sidebar filtre le contenu affiché :

- **Débutant** — l'essentiel, sans bruit
- **Intermédiaire** — bonnes pratiques, pièges courants
- **Expérimenté** — compilation, réactivité interne, edge cases

Le choix est persisté dans `localStorage`.

## Dark mode

Basculé depuis la sidebar. Le thème est appliqué via une classe `html.dark` et des variables CSS. Un script inline dans `index.html` évite le flash au chargement.
