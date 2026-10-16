import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const css = readFileSync(new URL("../prototypes/docusaurus/src/css/custom.css", import.meta.url), "utf8");

function declarationsFor(selector) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = css.match(new RegExp(`${escapedSelector}\\s*\\{(?<body>[^}]+)\\}`));

  assert.ok(match, `Expected ${selector} to exist`);

  return Object.fromEntries(
    match.groups.body
      .split(";")
      .map((declaration) => declaration.trim())
      .filter(Boolean)
      .map((declaration) => {
        const [property, ...value] = declaration.split(":");
        return [property.trim(), value.join(":").trim()];
      })
  );
}

// Docusaurus renders the mobile menu (.navbar-sidebar, position: fixed) inside the
// navbar. Any of these properties on the navbar or its ancestors makes that element
// the menu's containing block, which clips the open menu to the navbar's height.
const CONTAINING_BLOCK_PROPERTIES = new Set([
  "backdrop-filter",
  "-webkit-backdrop-filter",
  "filter",
  "transform",
  "translate",
  "rotate",
  "scale",
  "perspective",
  "contain",
  "container-type",
  "will-change"
]);
const NAVBAR_CLASSES = /^(navbar|navbar--[\w-]+|navbar-sidebar--show|theme-layout-navbar)$/;
const ANCESTOR_SELECTORS = new Set(["html", "body", ":root", "#__docusaurus"]);

function rules(source) {
  const withoutComments = source.replace(/\/\*[\s\S]*?\*\//g, "");

  return [...withoutComments.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(([, selector, body]) => ({
    selectors: selector.split(",").map((part) => part.trim()),
    declarations: body
      .split(";")
      .map((declaration) => declaration.trim())
      .filter(Boolean)
      .map((declaration) => {
        const [property, ...value] = declaration.split(":");
        return [property.trim(), value.join(":").trim()];
      })
  }));
}

function targetsNavbarOrAncestor(selector) {
  const subject = selector.split(/\s+|>|~|\+/).filter(Boolean).at(-1);

  if (subject.includes("::")) return false;
  if (ANCESTOR_SELECTORS.has(subject.replace(/\[[^\]]*\]/g, "")) || /^\[data-theme/.test(subject)) return true;

  return (subject.match(/\.([\w-]+)/g) ?? []).some((name) => NAVBAR_CLASSES.test(name.slice(1)));
}

test("the navbar never traps the fixed-position mobile menu", () => {
  const navbarRules = rules(css).filter(({ selectors }) => selectors.some(targetsNavbarOrAncestor));
  assert.ok(navbarRules.some(({ selectors }) => selectors.includes(".navbar")), "Expected a .navbar rule");

  const offenders = navbarRules.flatMap(({ selectors, declarations }) =>
    declarations
      .filter(([property, value]) => CONTAINING_BLOCK_PROPERTIES.has(property) && !/^(none|auto)$/.test(value))
      .map(([property, value]) => `${selectors.join(", ")} { ${property}: ${value} }`)
  );

  assert.deepEqual(offenders, []);
});

test("markdown h4 and h5 are styled as visible changelog section headings", () => {
  assert.deepEqual(declarationsFor(".markdown h4"), {
    "margin-top": "1.35rem",
    "margin-bottom": "0.55rem",
    "font-size": "1.12rem",
    "font-weight": "700",
    "line-height": "1.35",
    color: "var(--ifm-color-content)"
  });

  assert.deepEqual(declarationsFor(".markdown h5"), {
    "margin-top": "1.1rem",
    "margin-bottom": "0.45rem",
    "font-size": "1.02rem",
    "font-weight": "700",
    "line-height": "1.35",
    color: "var(--ifm-color-content)"
  });
});

test("markdown inline code uses a subtle borderless chip style", () => {
  const declarations = declarationsFor(".markdown code");

  assert.equal(declarations.background, "var(--site-surface-1)");
  assert.equal(declarations.border, "0");
  assert.equal(declarations["border-radius"], "4px");
  assert.equal(declarations.padding, "0.12em 0.28em");
  assert.equal(declarations["font-family"], "var(--ifm-font-family-monospace)");
  assert.equal(declarations.color, "var(--ifm-color-content)");
});
