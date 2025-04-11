import fs from "fs/promises";
import path from "path";

const rootDir = process.cwd();
const tempDir = path.join(rootDir, "types-temp");
const distDir = path.join(rootDir, "dist");
const componentsDir = path.join(rootDir, "src", "components");
const indexDtsPath = path.join(distDir, "index.d.ts");
const sampleDtsPath = path.join(tempDir, "sample", "TbdcIcon.vue.d.ts");

async function run() {
  try {
    let content = await fs.readFile(sampleDtsPath, "utf-8");

    content = content.replace(/(\.\.\/types\/)/g, "./");

    content = content.replace(
      /export default _default;/,
      "type IconComponent = typeof _default;"
    );

    const files = await fs.readdir(componentsDir);
    const vueFiles = files.filter((f) => f.endsWith(".vue"));

    const exportLines = vueFiles.map((file) => {
      const name = path.basename(file, ".vue");
      return `export const ${name}: IconComponent;`;
    });

    content += "\n" + exportLines.join("\n") + "\n";

    await fs.writeFile(indexDtsPath, content, "utf-8");
    console.log("✅ index.d.ts gerado com tipos e exports");

    const typesDir = path.join(tempDir, "types");
    const typesFiles = await fs.readdir(typesDir);

    await Promise.all(
      typesFiles.map(async (file) => {
        const src = path.join(typesDir, file);
        const dest = path.join(distDir, file);
        await fs.copyFile(src, dest);
        console.log(`✅ Copiado ${file} para dist/`);
      })
    );

    await fs.rm(tempDir, { recursive: true, force: true });
    console.log("🧹 Pasta types-temp removida");
  } catch (err) {
    console.error("❌ Erro ao finalizar tipos:", err);
    process.exit(1);
  }
}

run();
