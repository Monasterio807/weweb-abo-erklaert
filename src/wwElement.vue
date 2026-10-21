<template>
  <div class="hrk-root abe-root">
    <main class="abe-main">

      <!-- Kopf: Archivo-Label, grosser Gloock-Titel, Einleitung -->
      <header class="abe-top">
        <div class="abe-wrap">
          <p class="abe-lab">Abo erklärt</p>
          <h1 class="abe-h1">Was steckt in imploya?</h1>
          <p class="abe-intro">Alle Services im Überblick und was sie mit oder ohne Abo kosten. Du entscheidest, was zu deinem Betrieb passt.</p>
        </div>
      </header>

      <section class="abe-band abe-band--weiss">
        <div class="abe-wrap abe-grp">
          <div class="abe-grp__lab">
            <span class="abe-nr" aria-hidden="true">01</span>
            <h2 class="abe-gt">Alle Services auf einen Blick</h2>
          </div>
          <div class="abe-grp__body">
            <ul class="abe-list">
              <li class="abe-svc" v-for="s in services" :key="s.titel">
                <h3 class="abe-svc__titel">
                  {{ s.titel }}
                  <span v-if="s.bald" class="abe-badge">Kommt bald</span>
                </h3>
                <p class="abe-svc__text">{{ s.text }}</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section class="abe-band abe-band--grau">
        <div class="abe-wrap abe-grp">
          <div class="abe-grp__lab">
            <span class="abe-nr" aria-hidden="true">02</span>
            <h2 class="abe-gt">Mit oder ohne Abo: der Vergleich</h2>
          </div>
          <div class="abe-grp__body">
            <p class="abe-sub">Du kannst einzelne Leistungen ohne Abo nutzen und pro Stück zahlen. Ab ein paar Dokumenten im Monat lohnt sich ein Abo, und du musst nichts mehr mitzählen.</p>

            <table class="abe-table">
              <thead>
                <tr>
                  <th class="abe-table__lead">Leistung</th>
                  <th>Ohne Abo</th>
                  <th class="abe-col--abo">imploya<span class="abe-price hrk-num">CHF 29/Mt.</span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in vergleich" :key="row.label">
                  <td class="abe-table__lead">{{ row.label }}</td>
                  <td>{{ row.ohne }}</td>
                  <td class="abe-col--abo">{{ row.imploya }}</td>
                </tr>
              </tbody>
            </table>
            <p class="abe-fine">Jährlich zahlst du 11× statt 12×: 1 Monat gratis (CHF 319 im Jahr). Beratung ist nicht im Abo inklusive, aber jederzeit einzeln zubuchbar.</p>
          </div>
        </div>
      </section>

      <section class="abe-band abe-band--weiss">
        <div class="abe-wrap abe-grp">
          <div class="abe-grp__lab">
            <span class="abe-nr" aria-hidden="true">03</span>
            <h2 class="abe-gt">Lohnt sich ein Abo für dich?</h2>
          </div>
          <div class="abe-grp__body">
            <p class="abe-save__text">Ohne Abo zahlst du <strong>CHF 6 pro Dokument</strong> und <strong>CHF 9 pro 10 Emily-Fragen</strong>. Schon 5 Dokumente einzeln kosten CHF 30. Mit imploya sind 15 drin, dazu 30 Emily-Fragen pro Monat, für CHF 29 im Monat. Wer regelmässig HR-Aufgaben erledigt, fährt mit dem Abo günstiger und plant besser.</p>
          </div>
        </div>
      </section>

      <!-- Eine Hauptaktion: Abo wählen. Zurück ist der Zweitweg. -->
      <div class="abe-band abe-band--grau">
        <div class="abe-wrap abe-cta">
          <button class="abe-fw abe-fw--lg" @click="choosePlan">Abo wählen <svg class="abe-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="4" y1="12" x2="19" y2="12"/><polyline points="13,6 19,12 13,18"/></svg></button>
          <button v-if="hasBack" class="abe-bk" @click="goBack">Zurück</button>
        </div>
      </div>

    </main>
  </div>
</template>

<script>
/**
 * WeWeb Coded Component — «Abo erklärt»
 * v1 (03.07.2026): Informationsseite. Beschreibt alle Services, vergleicht
 * Ohne-Abo mit dem Ein-Plan «imploya» und erklaert die Ersparnis. Rein statisch, kein
 * v3 (15.10.2026): Optik Stil A «Editorial» (Entscheid 13.10.2026), Texte, Preise und Logik unveraendert.
 * v2 (24.07.2026): Ein-Plan «imploya» statt Basis/Plus; Emily pro Monat; Dokument ohne Abo CHF 6.
 * Backend-Call. Zahlen = Wahrheit aus subscription_limits + oeffentliche
 * Einzelpreise ohne Abo (CHF 6/Dokument, CHF 9/10 Emily-Fragen). Nichts erfunden.
 * Einzelkauf ist bewusst KEIN Button — dafuer gibt es noch keinen Flow;
 * Einstieg laeuft ueber die Abo-Auswahl.
 */
// Schriften (Stil A, Entscheid 13.10.2026): Gloock (Titel), Archivo (Labels), Inter (Text). Der WeWeb-<head>
// laedt sie nicht. Eigener Link-Id, damit das Paket von header-pro/footer (id hrk-fonts) nicht verdraengt
// wird. Gleicher Anbieter wie bisher; ohne Laden gelten Georgia bzw. System-Schrift.
function hrkEnsureBrandFont() {
  try {
    const doc = (typeof wwLib !== 'undefined' && wwLib && typeof wwLib.getFrontDocument === 'function')
      ? wwLib.getFrontDocument()
      : (typeof document !== 'undefined' ? document : null);
    if (!doc || !doc.head || doc.getElementById('hrk-fonts-marke')) return;
    const link = doc.createElement('link');
    link.id = 'hrk-fonts-marke'; link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Archivo:wght@500;600&family=Gloock&family=Inter:wght@400;500;600&display=swap';
    doc.head.appendChild(link);
  } catch (e) { /* Georgia als Rueckfall */ }
}

export default {
  props: {
    content: { type: Object, required: true },
    uid: { type: String, required: false, default: '' },
    /* wwEditor:start */
    wwEditorState: { type: Object, required: false, default: () => ({}) },
    /* wwEditor:end */
  },
  emits: ['trigger-event'],
  data() {
    return {
      services: [
        { titel: 'Arbeitsvertrag', text: 'L-GAV-konformer Vertrag in wenigen Minuten, mit den richtigen Klauseln.' },
        { titel: 'Kündigung', text: 'Kündigungsschreiben mit korrekten Fristen, sauber formuliert.' },
        { titel: 'Krankmeldung', text: 'Krankentaggeld-Meldung (KTG) ohne Papierkram erfasst.' },
        { titel: 'Unfallmeldung', text: 'Unfallmeldung (UVG) schnell und vollständig.' },
        { titel: 'Verwarnung', text: 'Verwarnung Schritt für Schritt.' },
        { titel: 'Arbeitszeugnis', text: 'Zeugnis aus geprüften Bausteinen, fair und wohlwollend.' },
        { titel: 'Ferien & Überstunden', text: 'Saldi im Blick, Übersicht als PDF zum Unterschreiben.' },
        { titel: 'Onboarding', text: 'Eintritte sauber abwickeln, mit Checkliste.' },
        { titel: 'Mitarbeitende', text: 'Alle Unterlagen deiner Mitarbeitenden an einem Ort.' },
        { titel: 'Emily, die HR-Assistentin', text: 'Beantwortet deine HR-Fragen sofort und verständlich, jede Antwort ist geprüft.' },
        { titel: 'Experten-Beratung', text: 'Unsere Profis prüfen deine Dokumente, jederzeit einzeln zubuchbar.' },
      ],
      vergleich: [
        { label: 'Dokumente pro Monat', ohne: 'CHF 6/Stück', imploya: '15 inklusive' },
        { label: 'Emily-Fragen', ohne: 'CHF 9 / 10 Fragen', imploya: '30 pro Monat' },
        { label: 'Vertrag, Kündigung, Krankmeldung', ohne: 'einzeln (CHF 6/Dok.)', imploya: 'inklusive' },
        { label: 'Zeugnis, Verwarnung', ohne: 'einzeln (CHF 6/Dok.)', imploya: 'inklusive' },
        { label: 'Mitarbeitende & Dokumenten-Upload', ohne: '—', imploya: 'inklusive' },
        { label: 'Offboarding-Paket & Saison-Kit', ohne: '—', imploya: 'inklusive' },
        { label: 'Onboarding-Checkliste & Vorlagen', ohne: '—', imploya: 'inklusive' },
        { label: 'Experten-Beratung', ohne: 'zubuchbar', imploya: 'zubuchbar' },
      ],
    };
  },
  computed: {
    aboUrl() { return ((this.content && this.content.aboUrl) || '/abo').toString(); },
    backUrl() { return ((this.content && this.content.backUrl) || '').toString(); },
    hasBack() { return this.backUrl.length > 0; },
  },
  mounted() {
    hrkEnsureBrandFont();
  },
  methods: {
    emitEvent(name, payload) { this.$emit('trigger-event', { name, event: payload || {} }); },
    choosePlan() {
      this.emitEvent('choose-plan', {});
      const win = (typeof window !== 'undefined') ? window : null;
      if (win && win.location && this.aboUrl) win.location.href = this.aboUrl;
    },
    goBack() {
      this.emitEvent('back', {});
      const win = (typeof window !== 'undefined') ? window : null;
      if (win && win.location && this.backUrl) win.location.href = this.backUrl;
    },
  },
};
</script>

<style scoped>
/* ============================================================
   imploya — Design-Tokens (1:1-Kopie aus Coded-Components-Vorlage/
   design-tokens.css). Nur --hrk-*-Tokens/.hrk-*-Bausteine nutzen.
   ============================================================ */
:root, .hrk-root {
  --hrk-bordeaux:        #72323C;
  --hrk-bordeaux-dark:   #5A2630;
  --hrk-bordeaux-soft:   #F1E7E9;
  --hrk-creme: #F7F5F1;
  --hrk-anthrazit: #241F1C;
  --hrk-gold:            #C3A359;
  --hrk-gold-dark:       #A98A45;
  --hrk-on-dark:         #FFFFFF;
  --hrk-on-primary:     #FFFFFF;
  --hrk-on-dark-strong:  rgba(255,255,255,.92);
  --hrk-on-dark-soft:    rgba(255,255,255,.82);
  --hrk-on-dark-muted:   rgba(255,255,255,.40);
  --hrk-on-dark-faint:   rgba(255,255,255,.12);
  --hrk-surface:         #FFFFFF;
  --hrk-surface-muted: #F2EFEA;
  --hrk-border: #E2DDD5;
  --hrk-border-strong: #CFC8BD;
  --hrk-text: #241F1C;
  --hrk-text-muted:      #6B6357;
  --hrk-success: #2A7254;  --hrk-success-bg: #E5F1EB;
  --hrk-warning: #946010;  --hrk-warning-bg: #FBF1DD;
  --hrk-danger:          #B23A48;  --hrk-danger-bg:  #F8E7E9;
  --hrk-info:            #2F6F9F;  --hrk-info-bg:    #E6F0F7;
  --hrk-neutral:         #6B6357;  --hrk-neutral-bg: #EFEAE2;
  --hrk-font-head: "Archivo", "Inter", system-ui, sans-serif;
  --hrk-font-body: "Inter", "Source Sans 3", system-ui, sans-serif;
  --hrk-fs-h1: 1.875rem;
  --hrk-fs-h2: 1.375rem;
  --hrk-fs-h3: 1.125rem;
  --hrk-fs-body: 1.0625rem;
  --hrk-fs-small: 0.9375rem;
  --hrk-lh-body: 1.55;
  --hrk-fw-regular: 400; --hrk-fw-medium: 500; --hrk-fw-semibold: 600;
  --hrk-space-1: 4px;  --hrk-space-2: 8px;  --hrk-space-3: 12px;
  --hrk-space-4: 16px; --hrk-space-5: 24px; --hrk-space-6: 32px;
  --hrk-space-7: 48px;
  --hrk-radius-sm: 6px; --hrk-radius-md: 6px; --hrk-radius-lg: 10px;
  --hrk-radius-pill: 6px;
  --hrk-shadow-card: 0 1px 2px rgba(40,35,30,.05);
  --hrk-shadow-pop: 0 1px 2px rgba(40,35,30,.05);
  --hrk-focus-ring: 0 0 0 2px var(--hrk-surface), 0 0 0 4px var(--hrk-bordeaux);
  --hrk-tap-min: 44px;
  --hrk-page-max: 880px;
  --hrk-overlay: rgba(20,24,28,.55);
  --hrk-icon-size-sm: 16px;
  --hrk-icon-size-md: 20px;
  --hrk-icon-size-lg: 28px;
  /* Design-Umsetzung 23.09.2026 (Phase 1): Schiefer, Schriften, zwei Radien, ein Schatten */
  --hrk-schiefer: #33475B;
  --hrk-schiefer-dark: #243444;
  --hrk-schiefer-soft: #EBEEF1;
  --hrk-font-mono: "IBM Plex Mono", ui-monospace, "SFMono-Regular", Menlo, monospace;
  --hrk-font-brand: "Gloock", Georgia, serif;
  --hrk-fs-xs: 0.8125rem;
  --hrk-ls-caps: .06em;
  --hrk-radius-field: 6px;
  --hrk-radius-card: 10px;
  --hrk-shadow: 0 1px 2px rgba(40,35,30,.05);
  --hrk-page-wide: 1200px;
  /* Stil A «Editorial» (Entscheid 13.10.2026): Linien, Warmgrau, Hauchfarben, Archivo-Labels */
  --hrk-linie: #D6D0CA;
  --hrk-warmgrau: #EFEBE7;
  --hrk-gold-hauch: #FAF6EC;
  --hrk-schiefer-hauch: #F2F5F8;
  --hrk-font-label: "Archivo", "Inter", system-ui, sans-serif;
}

.hrk-root, .hrk-root * { box-sizing: border-box; }
.hrk-root {
  width: 100%;
  font-family: var(--hrk-font-body);
  font-size: var(--hrk-fs-body);
  line-height: var(--hrk-lh-body);
  color: var(--hrk-text);
  background: var(--hrk-creme);
  -webkit-font-smoothing: antialiased;
}
/* Zahlen (Preise) in Mono, richten sich aus */
.hrk-num { font-family: var(--hrk-font-mono); font-variant-numeric: tabular-nums; }

/* ============================================================
   Abo erklärt — Stil A «Editorial» (Entscheid 13.10.2026, Phase 2).
   Linien statt Karten, Text-Knoepfe (Schiefer, Gold-Unterstrich nur fuer die eine Hauptaktion),
   grosse Gloock-Titel, Archivo-Labels, Weiss/Warmgrau im Wechsel, Raster Label-Spalte 220px + Inhalt.
   Farbrollen: Bordeaux = Links/Hover, Schiefer = Knoepfe, Gold = nur Linien.
   ============================================================ */
.hrk-root { background: var(--hrk-surface); }
.abe-root { font-family: var(--hrk-font-body); color: var(--hrk-text); }
.abe-root button:focus-visible { outline: 2px solid var(--hrk-schiefer); outline-offset: 3px; border-radius: 3px; box-shadow: none; }
.abe-main { display: block; width: 100%; }
.abe-wrap { max-width: 1120px; margin: 0 auto; padding: 0 var(--hrk-space-5); }
.abe-top { background: var(--hrk-surface); padding: clamp(40px, 6vw, 64px) 0 clamp(28px, 4vw, 44px); }
.abe-lab { font-family: var(--hrk-font-label); font-size: var(--hrk-fs-xs); font-weight: var(--hrk-fw-semibold); letter-spacing: .14em;
  text-transform: uppercase; color: var(--hrk-text-muted); margin: 0 0 var(--hrk-space-3); }
.abe-h1 { font-family: var(--hrk-font-brand); font-weight: 400; letter-spacing: -.01em; color: var(--hrk-text);
  font-size: clamp(40px, 7.4vw, 88px); line-height: 1.02; margin: 0; overflow-wrap: anywhere; }
.abe-intro { max-width: 40rem; margin: var(--hrk-space-5) 0 0; color: var(--hrk-text-muted); }

/* Gruppen: Weiss/Warmgrau im Wechsel, Label-Spalte links, Inhalt rechts unter Linie */
.abe-band { border-top: 1px solid var(--hrk-linie); }
.abe-band--grau { background: var(--hrk-warmgrau); }
.abe-band--weiss { background: var(--hrk-surface); }
.abe-grp { display: grid; grid-template-columns: 220px minmax(0, 1fr); gap: var(--hrk-space-6); padding-top: 28px; padding-bottom: 28px; }
.abe-grp__lab { min-width: 0; }
.abe-nr { display: block; font-family: var(--hrk-font-label); font-size: var(--hrk-fs-xs); font-weight: var(--hrk-fw-semibold); letter-spacing: .14em; color: var(--hrk-text-muted); margin-bottom: 6px; }
.abe-gt { font-family: var(--hrk-font-brand); font-weight: 400; letter-spacing: -.01em; font-size: 26px; line-height: 1.15; margin: 0; color: var(--hrk-text); overflow-wrap: anywhere; }
.abe-grp__body { min-width: 0; border-top: 1px solid var(--hrk-text); padding-top: var(--hrk-space-3); }
.abe-sub { margin: 0 0 var(--hrk-space-4); color: var(--hrk-text-muted); }

/* Services: Verzeichnis, zwei Spalten, Haarlinien */
.abe-list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: var(--hrk-space-6); }
.abe-svc { padding: var(--hrk-space-3) 0; border-bottom: 1px solid var(--hrk-linie); min-width: 0; }
.abe-svc__titel { font-family: var(--hrk-font-body); font-size: var(--hrk-fs-body); font-weight: var(--hrk-fw-semibold); color: var(--hrk-text); margin: 0; display: flex; align-items: baseline; gap: var(--hrk-space-2); flex-wrap: wrap; }
.abe-badge { display: inline-flex; align-items: center; gap: 6px; font-size: var(--hrk-fs-small); font-weight: var(--hrk-fw-semibold); line-height: 1.4; color: var(--hrk-warning); white-space: nowrap; }
.abe-badge::before { content: ""; flex: none; width: 7px; height: 7px; border-radius: 50%; background: currentColor; }
.abe-svc__text { font-size: var(--hrk-fs-small); color: var(--hrk-text-muted); margin: var(--hrk-space-1) 0 0; line-height: 1.45; }

/* Vergleich: Tabelle nur mit Linien */
.abe-table { width: 100%; border-collapse: collapse; font-size: var(--hrk-fs-body); }
.abe-table th, .abe-table td { padding: var(--hrk-space-3) var(--hrk-space-3) var(--hrk-space-3) 0; text-align: left; border-bottom: 1px solid var(--hrk-linie); vertical-align: top; overflow-wrap: anywhere; }
.abe-table thead th { font-family: var(--hrk-font-label); font-size: var(--hrk-fs-xs); font-weight: var(--hrk-fw-semibold); letter-spacing: .14em; text-transform: uppercase; color: var(--hrk-text-muted); border-bottom-color: var(--hrk-text); }
.abe-table tbody tr:last-child td { border-bottom: 0; }
.abe-table__lead { font-weight: var(--hrk-fw-medium); color: var(--hrk-text); width: 40%; }
.abe-table thead th.abe-table__lead { font-weight: var(--hrk-fw-semibold); color: var(--hrk-text-muted); }
.abe-col--abo { font-weight: var(--hrk-fw-semibold); color: var(--hrk-schiefer); }
.abe-table thead th.abe-col--abo { color: var(--hrk-schiefer); }
.abe-price { display: block; margin-top: 2px; font-family: var(--hrk-font-mono); font-size: var(--hrk-fs-small); font-weight: var(--hrk-fw-regular); letter-spacing: 0; text-transform: none; color: var(--hrk-text-muted); }
.abe-fine { font-size: var(--hrk-fs-small); color: var(--hrk-text-muted); margin: var(--hrk-space-3) 0 0; line-height: 1.5; }

/* Ersparnis */
.abe-save__text { margin: 0; max-width: 42rem; color: var(--hrk-text); line-height: 1.55; }

/* Text-Knoepfe: vorwaerts = Schiefer-Text mit 2px Gold-Unterstrich (eine Hauptaktion); Zurueck = grauer Text, Haarlinie */
.abe-cta { display: flex; align-items: center; gap: var(--hrk-space-5); flex-wrap: wrap; padding-top: 28px; padding-bottom: 28px; }
.abe-fw { display: inline-flex; align-items: center; gap: 10px; min-height: var(--hrk-tap-min); background: none; border: 0; border-bottom: 2px solid var(--hrk-gold);
  border-radius: 0; padding: 6px 0; font: 600 16px/1.3 var(--hrk-font-body); color: var(--hrk-schiefer); cursor: pointer; }
.abe-fw:hover { color: var(--hrk-schiefer-dark); }
.abe-fw .abe-icon { transition: transform .15s; }
.abe-fw:hover .abe-icon { transform: translateX(3px); }
.abe-fw--lg { font-size: 18px; padding: 8px 0; }
.abe-icon { width: 16px; height: 16px; flex: none; }
.abe-bk { display: inline-flex; align-items: center; min-height: var(--hrk-tap-min); background: none; border: 0; border-bottom: 1px solid var(--hrk-linie);
  border-radius: 0; padding: 6px 0; font: 500 var(--hrk-fs-small)/1.3 var(--hrk-font-body); color: var(--hrk-text-muted); cursor: pointer; }
.abe-bk:hover { color: var(--hrk-text); border-bottom-color: var(--hrk-text-muted); }

@media (max-width: 860px) {
  .abe-grp { grid-template-columns: minmax(0, 1fr); gap: var(--hrk-space-4); }
  .abe-gt { font-size: 24px; }
}
@media (max-width: 600px) {
  .abe-list { grid-template-columns: minmax(0, 1fr); }
  .abe-table { font-size: var(--hrk-fs-small); table-layout: fixed; }
  .abe-table th, .abe-table td { padding-right: var(--hrk-space-2); }
  .abe-table thead th { letter-spacing: .08em; }
  .abe-cta { flex-direction: column; align-items: flex-start; gap: var(--hrk-space-3); }
}
</style>
