# weweb-abo-erklaert

WeWeb Coded Component — **«Abo erklärt»**. Informationsseite (rein statisch, kein Backend-Call).

## Zweck
Erklärt neuen und bestehenden Kunden, was Imploya kann und was es kostet — mit oder ohne Abo.
Ergänzt die schlanke **Abo-Auswahl** (`weweb-abo-auswahl`), die nur die zwei Plan-Karten + Checkout zeigt.

## Inhalt
1. **Alle Services** — 13 Kurzbeschreibungen (Vertrag, Kündigung, Zeugnis, Emily, Beratung …).
2. **Vergleichstabelle** — Ohne Abo (Einzelbezug) · Basis (CHF 29/Mt.) · Plus (CHF 59/Mt.).
3. **Ersparnis** — ehrliche Rechnung aus den öffentlichen Einzelpreisen (CHF 3/Dokument, CHF 9/10 Emily-Fragen).
4. **CTA** — «Abo wählen» → navigiert zu `aboUrl`.

## Zahlen (Quelle der Wahrheit)
- Limits aus `subscription_limits`: Basis 5 Dok/Monat · 20 Emily/Woche · 0 Beratungsminuten. Plus 25 · 30 · 0.
- Einzelpreise: CHF 3/Dokument, CHF 9/10 Emily-Fragen (wie in `weweb-abo-auswahl` ausgewiesen).
- Beratung ist bei keinem Abo inklusive — nur einzeln zubuchbar, mit Plus günstiger.
- **Nichts erfunden.** Ändern sich die Zahlen im Backend, hier nachziehen.

## Properties
| Property | Typ | Default | Zweck |
|---|---|---|---|
| `aboUrl` | Text | `/abo` | Ziel des «Abo wählen»-Buttons (Abo-Auswahl-Seite). |
| `backUrl` | Text | `` | Optionaler «Zurück»-Link; leer → Button ausgeblendet. |

## Events
- `choose-plan` — «Abo wählen» geklickt.
- `back` — «Zurück» geklickt.

## Build
```
npm install
npm run build -- name=coded-component-abo-erklaert type=wwobject
```
Erfolg = frisches `dist/manager.js` (Timestamp prüfen, nicht Exit-Code).

## Sicherheit / Konventionen
- Kein Backend-Call, keine Keys, keine PII. Nur `--hrk-*`-Design-Tokens.
- **Kein Einzelkauf-Button** — dafür existiert noch kein Backend-Flow; Einstieg läuft über die Abo-Auswahl.
- Schweizer Hochdeutsch, kein ß. Keine mehrzeiligen HTML-Kommentare im Template (brechen den Build still).
