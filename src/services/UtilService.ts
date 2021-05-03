import { HumanizeDurationLanguage, HumanizeDuration } from 'humanize-duration-ts';
import i18n from '@/plugins/i18n';
import Vue from 'vue';

const langService: HumanizeDurationLanguage = new HumanizeDurationLanguage();
const humanizeDuration: HumanizeDuration = new HumanizeDuration(langService);

export default {
  formatLength(seconds: number) {
    return (seconds == null ? '∞' : humanizeDuration.humanize(seconds * 1000, {
      language: 'en', // TODO: Set actual locale
      unitMeasures: {
        y: 31536000000,
        mo: 2592000000,
        w: 604800000,
        d: 86400000,
        h: 3600000,
        m: 60000,
        s: 1000,
      },
      units: ['y', 'mo', 'd', 'h', 'm'],
    }));
  },
  notifyUnexpectedError(detail: object) {
    Vue.notify({
      title: i18n.t('unexpectedErrorOccurred').toString(),
      text: JSON.stringify(detail),
      type: 'error',
    });
  },
  showFile(blob: string, name: string, mediaType = 'application/pdf') {
    // It is necessary to create a new blob object with mime-type explicitly set
    // otherwise only Chrome works like it should
    const newBlob = new Blob([blob], { type: mediaType });

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob);
      return;
    }

    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(newBlob);
    const link = document.createElement('a');
    link.href = data;
    link.download = name;
    link.click();
    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
    }, 100);
  },
};
