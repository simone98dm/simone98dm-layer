# @simone98dm/layer

Shared [Nuxt layer](https://nuxt.com/docs/getting-started/layers) with components common to all my projects.

Published as a **private package on GitHub Packages**.

## Install

The package is private, so the consuming project needs a `.npmrc` pointing the scope at GitHub
Packages and a GitHub token with the `read:packages` scope:

```ini
# .npmrc  (do not commit the token — read it from the environment)
@simone98dm:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

```bash
npm install @simone98dm/layer
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  extends: ['@simone98dm/layer'],
})
```

Pulling straight from git also works and needs no registry or token setup:

```ts
extends: ['github:simone98dm/simone98dm-layer']
```

## Components

Auto-imported, no import statement needed.

### `<AppFooter>`

Credit line + current year. The default slot replaces the whole content.

```vue
<AppFooter />

<!-- or replace the content entirely -->
<AppFooter>
  <nav>...</nav>
</AppFooter>
```

Styles are scoped SCSS (no Tailwind dependency). `sass` ships as a runtime dependency of the
layer, since the consuming project compiles the raw `.vue` sources. Retheme from the consuming
project:

```css
.app-footer {
  --app-footer-line: #e5e5e5;
  --app-footer-ink: #111;
  --app-footer-ink-muted: #666;
}
```

## Development

```bash
npm install
npm run dev      # runs playground/
npm run test
npm run lint
```

Add a new shared component as `app/components/<Name>.vue` — it is picked up automatically.

## Release

CI publishes on tag push, authenticating with the built-in `GITHUB_TOKEN` — no secrets to set up.

```bash
npm run release   # lint + test, then changelogen bumps, tags and pushes
```

The `release` workflow re-runs lint, typecheck, tests and the playground build, checks the tag
matches `package.json`, then publishes. To publish by hand instead, tag with `vX.Y.Z` and push.
