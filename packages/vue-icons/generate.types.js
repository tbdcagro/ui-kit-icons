import { readdirSync, writeFileSync } from "fs";

const componentsDir = "./src/components";
const outputIndexTs = "./src/index.ts";

const files = readdirSync(componentsDir).filter((f) => f.endsWith(".vue"));

const indexTsContent = files
  .map((file) => {
    const name = file.replace(".vue", "");
    return `export { default as ${name} } from './components/${name}.vue';`;
  })
  .join("\n");

writeFileSync(outputIndexTs, indexTsContent);
