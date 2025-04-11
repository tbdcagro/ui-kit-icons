"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIKitIconVueResolver = UIKitIconVueResolver;
/**
 * Vue resolver to use with Unplugin.
 * Docs: https://github.com/unplugin/unplugin-vue-components
 */
function UIKitIconVueResolver() {
    console.log("installed");
    return {
        type: "component",
        resolve: (name) => {
            if (name.startsWith("UI")) {
                console.log("import from ", name);
                return { name, from: `@tbdc-agro-softwares/ui-kit-icons/vue` };
            }
            return name;
        },
    };
}
