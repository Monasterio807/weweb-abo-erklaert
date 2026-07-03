export default {
  editor: {
    label: { en: 'Abo erklärt', de: 'Abo erklärt' },
    icon: 'info',
  },
  triggerEvents: [
    { name: 'choose-plan', label: { en: 'Choose plan clicked', de: 'Abo wählen geklickt' }, event: {} },
    { name: 'back', label: { en: 'Back clicked', de: 'Zurück geklickt' }, event: {} },
  ],
  properties: {
    aboUrl: {
      label: { en: 'Plan selection URL', de: 'URL zur Abo-Auswahl' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: '/abo',
    },
    backUrl: {
      label: { en: 'Back URL', de: 'Zurück-URL' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: '',
    },
  },
};
