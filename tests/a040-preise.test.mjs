// A-040 (24.11.2026, Entscheid E65): «Abo erklärt» nennt 42 / 462 und die Einzelpreise 6 / 11
// aus dem Block PREISE-QUELLE. Kein «1 Monat gratis» am Jahr (Ward-Vermerk A-040, F3).
// Lauf: node --test tests/*.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sfc = readFileSync(join(here, "..", "src", "wwElement.vue"), "utf8");
const TEMPLATE = sfc.slice(0, sfc.indexOf("<script>")).replace(/<!--[\s\S]*?-->/g, "");
const SICHTBAR = TEMPLATE.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
const SCRIPT = sfc.slice(sfc.indexOf("<script>") + 8, sfc.indexOf("\n</script>"));
const dir = mkdtempSync(join(tmpdir(), "abe-a040-"));
writeFileSync(join(dir, "m.mjs"), SCRIPT, "utf8");
const opts = (await import(pathToFileURL(join(dir, "m.mjs")).href)).default;
const vm = { ...opts.data.call({}), content: {} };
for (const [k, f] of Object.entries(opts.computed || {})) Object.defineProperty(vm, k, { get: () => f.call(vm) });

test("Block PREISE-QUELLE: Werte wie die Quelle (E65)", () => {
  const m = SCRIPT.match(/\/\/ PREISE-QUELLE:start[^\n]*\n[\s\S]*?Object\.freeze\((\{[\s\S]*?\})\)[\s\S]*?\/\/ PREISE-QUELLE:end/);
  assert.ok(m, "Block fehlt");
  assert.deepEqual(JSON.parse(m[1]), { aboMonat: 42, aboJahr: 462, dokumentOhneAbo: 6, emily10OhneAbo: 11 });
});

test("keine Preiszahl als Festtext, kein «1 Monat gratis», kein Aktionspreis", () => {
  assert.ok(!/CHF\s*[1-9]/.test(TEMPLATE));
  const code = SCRIPT.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  assert.ok(!/CHF\s*[1-9]/.test(code), "CHF <Zahl> im Code");
  assert.ok(!/1 Monat gratis|Aktionspreis|statt CHF/.test(SICHTBAR));
});

test("Werte: Kopf 42, Jahr 462 mit 11 Monaten, Einzelpreise 6 / 11, fünf Dokumente 30", () => {
  assert.ok(SICHTBAR.includes("CHF {{ p.aboMonat }}/Mt."));
  assert.ok(SICHTBAR.includes("Jährlich zahlst du {{ jahresMonate }} Monate und bekommst 12 (CHF {{ p.aboJahr }} im Jahr)."));
  assert.equal(vm.jahresMonate, 11);
  assert.equal(vm.fuenfDokumente, 30);
  assert.equal(vm.vergleich[0].ohne, "CHF 6/Stück");
  assert.equal(vm.vergleich[1].ohne, "CHF 11 / 10 Fragen");
  assert.equal(vm.vergleich[2].ohne, "einzeln (CHF 6/Dok.)");
});
