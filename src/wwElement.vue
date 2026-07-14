<template>
  <div class="hrk-root abe-root">
    <main class="abe-page hrk-page">

      <div class="abe-header">
        <h1 class="hrk-h1">Was steckt in Imploya?</h1>
        <p class="hrk-muted">Alle Services im Überblick — und was sie mit oder ohne Abo kosten. Du entscheidest, was zu deinem Betrieb passt.</p>
      </div>

      <section class="abe-section">
        <h2 class="abe-h2">Alle Services auf einen Blick</h2>
        <div class="abe-grid">
          <div class="hrk-card abe-svc" v-for="s in services" :key="s.titel">
            <h3 class="abe-svc__titel">
              {{ s.titel }}
              <span v-if="s.bald" class="abe-badge">Kommt bald</span>
            </h3>
            <p class="abe-svc__text">{{ s.text }}</p>
          </div>
        </div>
      </section>

      <section class="abe-section">
        <h2 class="abe-h2">Mit oder ohne Abo — der Vergleich</h2>
        <p class="hrk-muted abe-sub">Du kannst einzelne Leistungen ohne Abo nutzen und pro Stück zahlen. Ab ein paar Dokumenten im Monat lohnt sich ein Abo — und du musst nichts mehr mitzählen.</p>

        <div class="abe-table-wrap">
          <table class="abe-table">
            <thead>
              <tr>
                <th class="abe-table__lead">Leistung</th>
                <th>Ohne Abo</th>
                <th>Basis<span class="abe-price">CHF 29/Mt.</span></th>
                <th class="abe-col--plus">Plus<span class="abe-price">CHF 59/Mt.</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in vergleich" :key="row.label">
                <td class="abe-table__lead">{{ row.label }}</td>
                <td>{{ row.ohne }}</td>
                <td>{{ row.basis }}</td>
                <td class="abe-col--plus">{{ row.plus }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="abe-fine">Jährlich zahlst du 10× statt 12× — 2 Monate geschenkt (Basis CHF 290/Jahr, Plus CHF 590/Jahr). Beratung ist bei keinem Abo inklusive, aber jederzeit einzeln zubuchbar — mit Plus zu vergünstigtem Tarif.</p>
      </section>

      <section class="abe-section abe-save">
        <h2 class="abe-h2">Lohnt sich ein Abo für dich?</h2>
        <p class="abe-save__text">Ohne Abo zahlst du <strong>CHF 3 pro Dokument</strong> und <strong>CHF 9 pro 10 Emily-Fragen</strong>. Schon 5 Dokumente einzeln kosten CHF 15 — mit Basis sind sie drin, dazu 20 Emily-Fragen pro Woche, für CHF 29 im Monat. Wer regelmässig HR-Aufgaben erledigt, fährt mit einem Abo günstiger und plant besser.</p>
      </section>

      <div class="abe-cta">
        <button class="hrk-btn hrk-btn--primary" @click="choosePlan">Abo wählen</button>
        <button v-if="hasBack" class="hrk-btn hrk-btn--ghost" @click="goBack">Zurück</button>
      </div>

    </main>
  </div>
</template>

<script>
/**
 * WeWeb Coded Component — «Abo erklärt»
 * v1 (03.07.2026): Informationsseite. Beschreibt alle Services, vergleicht
 * Ohne-Abo / Basis / Plus und erklaert die Ersparnis. Rein statisch, kein
 * Backend-Call. Zahlen = Wahrheit aus subscription_limits + oeffentliche
 * Einzelpreise (CHF 3/Dokument, CHF 9/10 Emily-Fragen). Nichts erfunden.
 * Einzelkauf ist bewusst KEIN Button — dafuer gibt es noch keinen Flow;
 * Einstieg laeuft ueber die Abo-Auswahl.
 */
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
        { titel: 'Arbeitsvertrag', text: 'L-GAV-konformer Vertrag in wenigen Minuten — mit den richtigen Klauseln.' },
        { titel: 'Kündigung', text: 'Kündigungsschreiben mit korrekten Fristen, sauber formuliert.' },
        { titel: 'Krankmeldung', text: 'Krankentaggeld-Meldung (KTG) ohne Papierkram erfasst.' },
        { titel: 'Unfallmeldung', text: 'Unfallmeldung (UVG) schnell und vollständig.' },
        { titel: 'Verwarnung', text: 'Rechtssichere Verwarnung Schritt für Schritt.' },
        { titel: 'Arbeitszeugnis', text: 'Zeugnis aus geprüften Bausteinen, fair und wohlwollend.' },
        { titel: 'Ferien & Überstunden', text: 'Saldi im Blick, Übersicht als PDF zum Unterschreiben.' },
        { titel: 'Onboarding', text: 'Eintritte sauber abwickeln, mit Checkliste (Plus).' },
        { titel: 'Personaldossier', text: 'Alle Unterlagen deiner Mitarbeitenden an einem Ort.' },
        { titel: 'Stelleninserat', text: 'Ansprechende Inserate in Minuten getextet.' },
        { titel: 'Emily — HR-Assistentin', text: 'Beantwortet deine HR-Fragen sofort und verständlich — jede Antwort ist geprüft.' },
        { titel: 'Experten-Beratung', text: 'Unsere Profis prüfen deine Dokumente — einzeln zubuchbar, mit Plus günstiger.' },
      ],
      vergleich: [
        { label: 'Dokumente pro Monat', ohne: 'CHF 3/Stück', basis: '5 inklusive', plus: '25 inklusive' },
        { label: 'Emily-Fragen', ohne: 'CHF 9 / 10 Fragen', basis: '20 pro Woche', plus: '30 pro Woche' },
        { label: 'Vertrag, Kündigung, Krankmeldung', ohne: 'einzeln (CHF 3/Dok.)', basis: 'inklusive', plus: 'inklusive' },
        { label: 'Zeugnis, Verwarnung, Stelleninserat', ohne: 'einzeln (CHF 3/Dok.)', basis: 'inklusive', plus: 'inklusive' },
        { label: 'Personaldossier & Dokumenten-Upload', ohne: '—', basis: 'inklusive', plus: 'inklusive' },
        { label: 'Offboarding-Paket & Saison-Kit', ohne: '—', basis: '—', plus: 'inklusive' },
        { label: 'Onboarding-Checkliste & Vorlagen', ohne: '—', basis: '—', plus: 'inklusive' },
        { label: 'Experten-Beratung', ohne: 'zubuchbar', basis: 'zubuchbar', plus: 'zubuchbar, günstiger' },
      ],
    };
  },
  computed: {
    aboUrl() { return ((this.content && this.content.aboUrl) || '/abo').toString(); },
    backUrl() { return ((this.content && this.content.backUrl) || '').toString(); },
    hasBack() { return this.backUrl.length > 0; },
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
   Imploya — Design-Tokens (1:1-Kopie aus Coded-Components-Vorlage/
   design-tokens.css). Nur --hrk-*-Tokens/.hrk-*-Bausteine nutzen.
   ============================================================ */
:root, .hrk-root {
  --hrk-bordeaux:        #7B2D3B;
  --hrk-bordeaux-dark:   #5E2129;
  --hrk-bordeaux-soft:   #F3E7E9;
  --hrk-creme:           #FBF8F3;
  --hrk-anthrazit:       #2B2B2B;
  --hrk-gold:            #C9A24B;
  --hrk-gold-dark:       #B8902F;
  --hrk-on-dark:         #FFFFFF;
  --hrk-on-primary:     #FFFFFF;
  --hrk-on-dark-strong:  rgba(255,255,255,.92);
  --hrk-on-dark-soft:    rgba(255,255,255,.82);
  --hrk-on-dark-muted:   rgba(255,255,255,.40);
  --hrk-on-dark-faint:   rgba(255,255,255,.12);
  --hrk-surface:         #FFFFFF;
  --hrk-surface-muted:   #F5F1EB;
  --hrk-border:          #ECE5D9;
  --hrk-border-strong:   #DAD2C6;
  --hrk-text:            #2B2B2B;
  --hrk-text-muted:      #6B6357;
  --hrk-success:         #2E7D5B;  --hrk-success-bg: #E5F1EB;
  --hrk-warning:         #B7791F;  --hrk-warning-bg: #FBF1DD;
  --hrk-danger:          #B23A48;  --hrk-danger-bg:  #F8E7E9;
  --hrk-info:            #2F6F9F;  --hrk-info-bg:    #E6F0F7;
  --hrk-neutral:         #6B6357;  --hrk-neutral-bg: #EFEAE2;
  --hrk-font-head: "Fraunces", "Lora", Georgia, serif;
  --hrk-font-body: "Inter", "Source Sans 3", system-ui, sans-serif;
  --hrk-fs-h1: 1.9375rem;
  --hrk-fs-h2: 1.375rem;
  --hrk-fs-h3: 1.125rem;
  --hrk-fs-body: 1.0625rem;
  --hrk-fs-small: 0.9375rem;
  --hrk-lh-body: 1.55;
  --hrk-fw-regular: 400; --hrk-fw-medium: 500; --hrk-fw-semibold: 600;
  --hrk-space-1: 4px;  --hrk-space-2: 8px;  --hrk-space-3: 12px;
  --hrk-space-4: 16px; --hrk-space-5: 24px; --hrk-space-6: 32px;
  --hrk-space-7: 48px;
  --hrk-radius-sm: 8px; --hrk-radius-md: 12px; --hrk-radius-lg: 14px;
  --hrk-radius-pill: 999px;
  --hrk-shadow-card: 0 1px 2px rgba(40,35,30,.05);
  --hrk-shadow-pop:  0 8px 28px rgba(40,35,30,.12);
  --hrk-focus-ring:  0 0 0 3px rgba(123,45,59,.30);
  --hrk-tap-min: 44px;
  --hrk-page-max: 880px;
  --hrk-overlay: rgba(0,0,0,.55);
  --hrk-icon-size-sm: 16px;
  --hrk-icon-size-md: 20px;
  --hrk-icon-size-lg: 28px;
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
.hrk-page { width: 100%; max-width: var(--hrk-page-max); margin: 0 auto; padding: var(--hrk-space-6) var(--hrk-space-4); }
.hrk-h1 { font-family: var(--hrk-font-head); font-size: var(--hrk-fs-h1); font-weight: var(--hrk-fw-semibold); line-height: 1.12; letter-spacing: -.02em; color: var(--hrk-bordeaux); margin: 0 0 var(--hrk-space-3); }
.hrk-muted { color: var(--hrk-text-muted); }

.hrk-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: var(--hrk-space-2);
  min-height: var(--hrk-tap-min); padding: 0 var(--hrk-space-5);
  font: inherit; font-weight: var(--hrk-fw-semibold);
  border-radius: var(--hrk-radius-md); border: 1px solid transparent;
  cursor: pointer; text-decoration: none; transition: background .15s, border-color .15s, transform .05s;
}
.hrk-btn:active { transform: translateY(1px); }
.hrk-btn:focus-visible { outline: none; box-shadow: var(--hrk-focus-ring); }
.hrk-btn--primary   { background: var(--hrk-bordeaux); color: var(--hrk-on-primary); }
.hrk-btn--primary:hover { background: var(--hrk-bordeaux-dark); }
.hrk-btn--ghost     { background: transparent; color: var(--hrk-bordeaux); }
.hrk-btn--ghost:hover { background: var(--hrk-bordeaux-soft); }
.hrk-btn[disabled] { opacity: .5; cursor: not-allowed; }

.hrk-card { background: var(--hrk-surface); border: 1px solid var(--hrk-border);
  border-radius: var(--hrk-radius-lg); box-shadow: var(--hrk-shadow-card);
  padding: var(--hrk-space-5); }

@media (max-width: 600px) {
  :root, .hrk-root { --hrk-fs-h1: 1.625rem; }
  .hrk-page { padding: var(--hrk-space-4) var(--hrk-space-3); }
}

/* ============================================================
   Abo erklärt — komponentenspezifisch, nur --hrk-*-Tokens.
   ============================================================ */
.abe-root { font-family: inherit; color: inherit; }
.abe-page { max-width: 820px; }
.abe-header { text-align: center; margin-bottom: var(--hrk-space-6); }
.abe-section { margin-bottom: var(--hrk-space-7); }
.abe-h2 { font-family: var(--hrk-font-head); font-size: var(--hrk-fs-h2); font-weight: var(--hrk-fw-semibold); color: var(--hrk-bordeaux); margin: 0 0 var(--hrk-space-4); }
.abe-sub { margin: 0 0 var(--hrk-space-4); }

/* Service-Grid */
.abe-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--hrk-space-3); }
@media (max-width: 760px) { .abe-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .abe-grid { grid-template-columns: 1fr; } }
.abe-svc { padding: var(--hrk-space-4); display: flex; flex-direction: column; gap: var(--hrk-space-1); }
.abe-svc__titel { font-size: var(--hrk-fs-body); font-weight: var(--hrk-fw-semibold); color: var(--hrk-text); margin: 0; display: flex; align-items: center; gap: var(--hrk-space-2); flex-wrap: wrap; }
.abe-badge { display: inline-block; font-size: 0.72rem; font-weight: var(--hrk-fw-medium); line-height: 1.2; color: var(--hrk-warning); background: var(--hrk-warning-bg); border-radius: var(--hrk-radius-pill); padding: 2px var(--hrk-space-2); white-space: nowrap; }
.abe-svc__text { font-size: var(--hrk-fs-small); color: var(--hrk-text-muted); margin: 0; line-height: 1.45; }

/* Vergleichstabelle */
.abe-table-wrap { overflow-x: auto; border: 1px solid var(--hrk-border); border-radius: var(--hrk-radius-lg); background: var(--hrk-surface); }
.abe-table { width: 100%; border-collapse: collapse; min-width: 560px; font-size: var(--hrk-fs-small); }
.abe-table th, .abe-table td { padding: var(--hrk-space-3) var(--hrk-space-4); text-align: center; border-bottom: 1px solid var(--hrk-border); }
.abe-table thead th { background: var(--hrk-surface-muted); color: var(--hrk-text); font-weight: var(--hrk-fw-semibold); vertical-align: top; }
.abe-table tbody tr:last-child td { border-bottom: none; }
.abe-table__lead { text-align: left; font-weight: var(--hrk-fw-medium); color: var(--hrk-text); }
.abe-price { display: block; font-size: 0.78rem; font-weight: var(--hrk-fw-regular); color: var(--hrk-text-muted); margin-top: 2px; }
.abe-col--plus { background: var(--hrk-bordeaux-soft); color: var(--hrk-bordeaux); }
.abe-table thead th.abe-col--plus { background: var(--hrk-bordeaux-soft); }
.abe-fine { font-size: 0.82rem; color: var(--hrk-text-muted); margin: var(--hrk-space-3) 0 0; line-height: 1.5; }

/* Ersparnis */
.abe-save { background: var(--hrk-surface-muted); border-radius: var(--hrk-radius-lg); padding: var(--hrk-space-5); }
.abe-save .abe-h2 { margin-top: 0; }
.abe-save__text { margin: 0; font-size: var(--hrk-fs-small); color: var(--hrk-text); line-height: 1.55; }

/* CTA */
.abe-cta { display: flex; justify-content: center; gap: var(--hrk-space-3); flex-wrap: wrap; }
</style>
