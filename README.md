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

Releases are automatic. Merge a PR into `main` and the `release` workflow bumps the version from
the commits since the last tag, writes `CHANGELOG.md`, tags, and publishes to GitHub Packages. It
authenticates with the built-in `GITHUB_TOKEN` — no secrets to set up.

The bump comes from the conventional-commit type of the squashed PR title:

| PR title            | Bump  | 1.0.0 becomes |
| ------------------- | ----- | ------------- |
| `feat: …`           | minor | 1.1.0         |
| `fix: …`            | patch | 1.0.1         |
| `perf: …`           | patch | 1.0.1         |
| `refactor: …`       | patch | 1.0.1         |
| `docs: …`           | patch | 1.0.1         |
| `chore: …`          | patch | 1.0.1         |
| `test:`/`ci:`/`style:` | patch | 1.0.1      |
| `feat!: …` or `BREAKING CHANGE:` | major | 2.0.0 |

A PR containing several types takes the highest bump. CI rejects a PR whose title is not a
conventional commit, since that title is what the bump is read from.

Bump, tag and publish all run in one job on purpose: GitHub does not trigger workflows for pushes
made with `GITHUB_TOKEN`, so a tag pushed by CI would never start a separate publish workflow.

Need a release without a PR? Run the `release` workflow manually from the Actions tab.
