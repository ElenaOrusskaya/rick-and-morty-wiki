# Rick & Morty Wiki

A React app for browsing characters, episodes, and locations from the [Rick and Morty API](https://rickandmortyapi.com/).

## Live demo

[Open the app](https://elenaorowsski.github.io/rick-and-morty-wiki/)

## Features

- Browse characters by page and search by name. The character page number is saved in `localStorage` and restored on reload; submitting a search returns to page 1.
- Choose an episode or location to see its characters or residents. Long lists are split into pages.
- Use the app on phones, tablets, and desktop screens.

## Built with

React 19, TypeScript, React Router 7, Vite, and SCSS. Component-specific styles use CSS Modules; shared styles live in `App.scss` and `index.css`.

## Run locally

You need Node.js 20 or newer and npm. React Router 7 requires Node.js 20 or newer.

```bash
git clone https://github.com/ElenaOrusskaya/rick-and-morty-wiki.git
cd rick-and-morty-wiki
npm ci
npm run dev
```

Open the URL printed by Vite, typically `http://localhost:5173/rick-and-morty-wiki/`.

## Check the project

```bash
npm run lint
npm run build
```

The app needs a network connection to load data from the Rick and Morty API.

## Publish to GitHub Pages

`npm run deploy` builds the app and publishes `dist` through `gh-pages`. The Vite base path matches the GitHub repository name: `/rick-and-morty-wiki/`.
