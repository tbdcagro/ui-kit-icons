const fs = require("fs");
const path = require("path");

const svgDir = path.join(__dirname, "../../icons");
const outputDir = path.join(__dirname, "src");

function toPascalCase(str) {
  return str
    .replace(/[-_]+/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

function ensureDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
  fs.mkdirSync(dirPath, { recursive: true });
}

ensureDir(outputDir);
ensureDir(path.join(outputDir, "components"));

const svgFiles = fs.readdirSync(svgDir).filter((file) => file.endsWith(".svg"));

const typeDefinition = `export const IconSizeOptions = [
  "is-16",
  "is-20",
  "is-24",
  "is-32",
  "is-40",
  "is-48",
  "is-52",
] as const;

export type IconSize = typeof IconSizeOptions[number];

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  clickable?: boolean;
  size?: IconSize;
}
`;

fs.writeFileSync(path.join(outputDir, "types.ts"), typeDefinition);

const convertSVGAttributes = (svgContent) => {
  const attributeMap = {
    "clip-rule": "clipRule",
    "fill-rule": "fillRule",
    "stroke-width": "strokeWidth",
    "stroke-linecap": "strokeLinecap",
    "stroke-linejoin": "strokeLinejoin",
    "stroke-opacity": "strokeOpacity",
    "fill-opacity": "fillOpacity",
    "font-family": "fontFamily",
    "font-size": "fontSize",
    "font-weight": "fontWeight",
    "text-anchor": "textAnchor",
    "alignment-baseline": "alignmentBaseline",
    "baseline-shift": "baselineShift",
    "dominant-baseline": "dominantBaseline",
    "letter-spacing": "letterSpacing",
    "word-spacing": "wordSpacing",
    "text-decoration": "textDecoration",
    "xml:space": "xmlSpace",
    "aria-*": "aria*",
    "xlink:*": "xlink*",
  };

  return svgContent.replace(/([a-z-]+)="([^"]*)"/g, (match, attr, value) => {
    // Converte atributos conhecidos
    if (attributeMap[attr]) {
      return `${attributeMap[attr]}="${value}"`;
    }
    // Converte outros atributos com hífen para camelCase
    if (attr.includes("-")) {
      const reactAttr = attr.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      return `${reactAttr}="${value}"`;
    }
    // Mantém atributos que já estão corretos
    return match;
  });
};

svgFiles.forEach((file) => {
  const iconName = path.basename(file, ".svg");
  const componentName = `UI${toPascalCase(iconName)}`;
  const svgContent = fs.readFileSync(path.join(svgDir, file), "utf8");

  const processedSvg = convertSVGAttributes(svgContent).replace(
    /<svg([^>]*)>/,
    `<svg$1 {...rest} className={\`\${clickable ? 'is-clickable ' : ''}\${size ? size + ' ' : ''}\${className || ''}\`} style={{ cursor: clickable ? 'pointer' : 'inherit', ...style }}>`
  );

  const componentContent = `import React from 'react';
import { IconProps } from '../types';

export const ${componentName} = ({ 
  clickable = false, 
  size, 
  className = '', 
  style = {}, 
  ...rest 
}: IconProps) => (
  ${processedSvg}
);
`;

  fs.writeFileSync(
    path.join(outputDir, "components", `${componentName}.tsx`),
    componentContent
  );
});

const barrelContent = svgFiles
  .map((file) => {
    const iconName = path.basename(file, ".svg");
    const componentName = `UI${toPascalCase(iconName)}`;
    return `export * from './components/${componentName}';`;
  })
  .join("\n");

fs.writeFileSync(path.join(outputDir, "index.ts"), barrelContent);
