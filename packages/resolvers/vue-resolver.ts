/**
 * Vue resolver to use with Unplugin.
 * Docs: https://github.com/unplugin/unplugin-vue-components
 */
export function UIKitIconVueResolver() {
  return {
    type: "component" as "component" | "directive",
    resolve: (name: string) => {
      if (name.startsWith("UI")) {
        return { name, from: `@tbdc-agro-softwares/ui-kit-icons/vue` };
      }
    },
  };
}
