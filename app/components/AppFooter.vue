<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer">
    <slot>
      <div class="app-footer__content">
        Made with ❤️ by
        <a
          class="app-footer__link"
          href="https://simone98dm.dev"
        >
          simone98dm
        </a>
        <p>&copy; {{ year }}</p>
      </div>
    </slot>
  </footer>
</template>

<style scoped lang="scss">
.app-footer {
  // Consumers can retheme via these custom properties.
  --app-footer-line: currentColor;
  --app-footer-ink: currentColor;
  --app-footer-ink-muted: currentColor;

  &__content {
    border-top: 1px solid var(--app-footer-line);
    padding: 1rem;
    text-align: center;
    font-size: 0.75rem;
    line-height: 1rem;
    color: var(--app-footer-ink-muted);
  }

  &__link {
    display: inline-flex;
    align-items: center;
    min-height: 48px;
    padding-inline: 0.5rem;
    text-decoration: underline;
    text-underline-offset: 2px;

    &:hover,
    &:focus-visible {
      color: var(--app-footer-ink);
    }
  }
}
</style>
