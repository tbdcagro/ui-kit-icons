import {
  readdirSync,
  readFileSync,
  writeFileSync,
  rmSync,
  mkdirSync,
  existsSync,
} from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

function toPascalCase(str) {
  return str
    .replace(/[-_]+/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

function sanitizeSvg(svg) {
  let modified = svg;

  modified = modified.replace(
    /fill=["'](#000000|#000|black)["']/gi,
    'fill="currentColor"'
  );

  modified = modified.replace(
    /stroke=["'](#000000|#000|black)["']/gi,
    'stroke="currentColor"'
  );

  modified = modified.replace(
    /<(\w+)([^>]*?)\sstroke=["'][^"']+["']([^>]*?)\/?>/g,
    (match, tagName, beforeStroke, afterStroke) => {
      const hasFill = /fill=["'].*?["']/.test(match);
      const isSelfClosing = match.endsWith("/>");

      if (!hasFill) {
        const newAttributes = `${beforeStroke} stroke="currentColor"${afterStroke} fill="none"`;
        return isSelfClosing
          ? `<${tagName}${newAttributes}/>`
          : `<${tagName}${newAttributes}>`;
      }

      return match;
    }
  );

  return modified;
}

(async function () {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const componentsDir = join(__dirname, "src", "components");

  if (existsSync(componentsDir)) {
    rmSync(componentsDir, { recursive: true, force: true });
  }
  mkdirSync(componentsDir, { recursive: true });

  const files = readdirSync(join(__dirname, "..", "..", "icons"));

  await Promise.all(
    files.map(async (fileName) => {
      const fileNameWithoutExtension = fileName.split(".")[0];
      const template = readFileSync(
        join(__dirname, "src", "sample", "TbdcIcon.vue")
      );
      const svgBuffer = readFileSync(
        join(__dirname, "..", "..", "icons", fileName)
      );
      const svgAsString = svgBuffer.toString().trim();

      const sanitizedSvg = sanitizeSvg(svgAsString).replace(
        /<svg([^>]*)>/,
        '<svg :class="className"$1>'
      );

      const vueComponent = template
        .toString()
        .replace("<IconComponent />", sanitizedSvg);

      const componentName = `UI${toPascalCase(fileNameWithoutExtension)}`;

      writeFileSync(join(componentsDir, `${componentName}.vue`), vueComponent);
    })
  );
})();
