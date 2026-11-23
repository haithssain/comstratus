<<<<<<< HEAD
# Comstratus : site web (étape 1)

Site vitrine bilingue (français / anglais) construit avec [Astro](https://astro.build).

## Prérequis

- [Node.js](https://nodejs.org) version 18.20 ou plus récente (la version LTS convient)
- [Git](https://git-scm.com)

## Lancer le site sur votre PC

```bash
npm install        # une seule fois : installe Astro
npm run dev        # démarre le site sur http://localhost:4321
```

Autres commandes :

```bash
npm run build      # génère le site final dans le dossier dist/
npm run preview    # prévisualise le site généré
```

## Envoyer le code sur GitHub (première fois)

1. Sur github.com, créez un dépôt vide nommé `comstratus` (sans README ni .gitignore).
2. Dans le dossier du projet :

```bash
git init
git add .
git commit -m "Étape 1 : site vitrine bilingue"
git branch -M main
git remote add origin https://github.com/VOTRE-NOM-UTILISATEUR/comstratus.git
git push -u origin main
```

## Au quotidien (après chaque modification)

```bash
git status                       # voir ce qui a changé
git add .                        # préparer les changements
git commit -m "Description courte du changement"
git push                         # envoyer sur GitHub
```

Pour récupérer le code sur un autre ordinateur : `git clone https://github.com/VOTRE-NOM-UTILISATEUR/comstratus.git`

## Structure du projet

```
src/
  i18n/ui.ts          Tous les textes FR et EN (à modifier ici)
  layouts/Base.astro  Gabarit commun à toutes les pages
  components/         En-tête, pied de page, logo texte
  pages/[lang]/       Pages : index, services, about, contact
  styles/global.css   Couleurs et styles
public/               Fichiers statiques (favicon, logo, images)
```

## Modifier le contenu

- **Textes** : `src/i18n/ui.ts`
- **Couleurs** : variables au début de `src/styles/global.css`
- **Courriel de contact** : clé `email` dans `src/i18n/ui.ts`
- **Domaine** : champ `site` dans `astro.config.mjs`

## Ajouter une page

1. Créer `src/pages/[lang]/nouvelle-page.astro` (copier `services.astro` comme modèle).
2. Ajouter ses textes FR et EN dans `src/i18n/ui.ts`.
3. Ajouter le lien dans `src/components/Header.astro`.

## Ajouter une langue

1. Ajouter le code dans `languages` (`src/i18n/ui.ts`).
2. Copier le bloc `fr` ou `en` dans `ui` et le traduire.

## Publication

Le site généré (`dist/`) est statique. Il peut être hébergé gratuitement sur GitHub Pages, Netlify ou Cloudflare Pages en les connectant au dépôt GitHub.

## Prochaines étapes

- Étape 2 : pages supplémentaires (blogue, études de cas, FAQ…)
- Étape 3 : système d'administration (back-end, base de données, authentification)
=======
# comstratus

Generate or create comstratus website with ai, with min manual touches
>>>>>>> 26688fa9eb8e8b7fc188a28cbbe27abb82ee6258
