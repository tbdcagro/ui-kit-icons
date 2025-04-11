<p align="center">
  <a href="https://tbdc.com.br/" target="_blank">
    <img width="150" src="docs/assets/logo.svg" alt="Tbdc Logo">
  </a>
</p>

---

A simple icon library

## Usage

To install the package use the following command:

```bash
pnpm add @tbdc-agro-softwares/ui-kit-icons
```

Usage with Vue 3:

```ts
// main.[ts/js]
import "@tbdc-agro-softwares/ui-kit-icons/vue/css";
```

```html
<!-- Example.vue -->
<script>
  import { UIChevronForwardOutline } from "@tbdc-agro-softwares/icons/vue";
</script>

<template>
  <UIChevronForwardOutline />
</template>
```

To use it with unplugin and vite, import our resolver

```ts
import Components from "unplugin-vue-components/vite";
import { UIKitIconVueResolver } from "@tbdc-agro-softwares/ui-kit-icons/resolvers";

// ...
plugins: [
  vue(),
  Components({
    dts: true,
    resolvers: [UIKitIconVueResolver()],
  }),
];
```
