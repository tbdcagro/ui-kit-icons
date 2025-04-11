"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIKitIconVueResolver = UIKitIconVueResolver;
/**
 * Vue resolver to use with Unplugin.
 * Docs: https://github.com/unplugin/unplugin-vue-components
 */
function UIKitIconVueResolver() {
    return {
        type: "component",
        resolve: (name) => {
            if (name.startsWith("UI")) {
                return { name, from: `@tbdc-agro-softwares/ui-kit-icons/vue` };
            }
        },
    };
}
