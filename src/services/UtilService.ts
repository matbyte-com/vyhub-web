import { HumanizeDurationLanguage, HumanizeDuration } from 'humanize-duration-ts';
import Vue from 'vue';
import i18n from '@/plugins/i18n';

const langService: HumanizeDurationLanguage = new HumanizeDurationLanguage();
const humanizeDuration: HumanizeDuration = new HumanizeDuration(langService);

const unitMeasures = {
  y: 31536000000,
  mo: 2592000000,
  w: 604800000,
  d: 86400000,
  h: 3600000,
  m: 60000,
  s: 1000,
};

export default {
  data() {
    return {
      utils: {
        formatLength(seconds: number) {
          return (seconds == null ? '∞' : humanizeDuration.humanize(seconds * 1000, {
            language: 'en', // TODO: Set actual locale
            unitMeasures,
            units: ['y', 'mo', 'd', 'h', 'm'],
          }));
        },
        formatElapsedTime(mseconds: number) {
          return (mseconds == null ? '∞' : humanizeDuration.humanize(mseconds, {
            language: 'en', // TODO: Set actual locale
            unitMeasures,
            units: ['y', 'mo', 'd', 'h', 'm', 's'],
            round: true,
            largest: 1,
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
        formatDecimal(decimal: number) {
          return decimal.toLocaleString(undefined, { minimumFractionDigits: 2 });
        },
        getFullUrl(path: string) {
          return window.location.origin + path;
        },
        formatDate(datetime: string) {
          return (new Date(datetime)).toLocaleString();
        },
        random_string(length: number) {
          let result = '';
          const characters = 'abcdefghijklmnopqrstuvwxyz';
          const charactersLength = characters.length;
          for (let i = 0; i < length; i += 1) {
            result += characters.charAt(Math.floor(Math.random()
              * charactersLength));
          }
          return result;
        },
      },
    };
  },
};
