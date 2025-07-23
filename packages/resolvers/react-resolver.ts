/**
 * React resolver to use with Unplugin.
 * Docs: https://github.com/unplugin/unplugin-react-components
 */
export function UIKitIconReactResolver() {
  return {
    type: "component" as "component" | "directive",
    resolve: (name: string) => {
      if (name.startsWith("UI")) {
        return { name, from: `@tbdc-agro-softwares/ui-kit-icons/react` };
      }
    },
  };
}
