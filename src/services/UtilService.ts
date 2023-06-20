import { HumanizeDurationLanguage, HumanizeDuration } from 'humanize-duration-ts';
import Vue from 'vue';
import i18n from '@/plugins/i18n';
import openapi from '@/api/openapi';
import store from '@/store';

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
          return;

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
          if (datetime == null) {
            return '-';
          }

          return (new Date(datetime)).toLocaleString();
        },
        formatTimeForForum(datetime: string) {
          if (datetime == null) {
            return '-';
          }
          if (new Date(datetime).getTime() > new Date().getTime() - unitMeasures.d) {
            return i18n.t('_notification.timeAgo', { time: this.formatElapsedTime(new Date().getTime() - new Date(datetime).getTime()) });
          }
          return new Date(datetime).toLocaleDateString();
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
        async getGeneralConfig() {
          (await openapi).general_getConfig().then((rsp) => {
            store.commit('SET_GENERAL_CONFIG', rsp.data);
          }).catch((err) => {
            console.log('Could not get General Settings');
            throw err;
          });
        },
        async getShopConfig() {
          (await openapi).shop_getConfig().then((rsp) => {
            store.commit('SET_SHOP_CONFIG', rsp.data);
          }).catch((err) => {
            console.log('Could not get Shop Settings');
            throw err;
          });
        },
        setIntervalX(callback: CallableFunction, delay: number, repetitions: number) {
          let x = 0;
          const intervalID = window.setInterval(() => {
            callback();

            x += 1;

            if (x === repetitions) {
              window.clearInterval(intervalID);
            }
          }, delay);

          return intervalID;
        },
        textToClipboard(text: string) {
          navigator.clipboard.writeText(text);
        },
        formatErrorMessage(err: any) {
          let errDet = null;

          const returnObject: { title: string, text: string, type: string } = {
            title: '',
            text: '',
            type: '',
          };

          if (err.response && err.response.data && err.response.data.detail) {
            errDet = err.response.data.detail;
          }

          if (err.response.status === 401) {
            errDet = {
              code: 'unauthorized',
              msg: '',
              detail: {},
            };
          }

          if (errDet != null && i18n.te(`_errors.${errDet.code}`)) {
            returnObject.title = String(i18n.t('error'));
            returnObject.text = String(i18n.t(`_errors.${errDet.code}`, {
              ...errDet.detail,
              msg: errDet.msg,
            }));
            returnObject.type = 'error';
          } else if (err.response) {
            let msg = '';

            if (err.response.data && err.response.data.detail) {
              if (err.response.data.detail.code) {
                msg = `${err.response.data.detail.code} - ${err.response.data.detail.msg}`;
              } else {
                msg = err.response.data.detail;
              }
            } else {
              msg = err.response.data;
            }
            returnObject.title = `${i18n.t('unexpectedError')} ${err.response.status}`;
            returnObject.text = msg;
            returnObject.type = 'error';
          } else {
            returnObject.title = `${i18n.t('unexpectedError')}`;
            returnObject.text = '-';
            returnObject.type = 'error';
          }
          return returnObject;
        },
        getSteamid32(steamid64: string) {
          const v = BigInt('76561197960265728');
          let w = BigInt(steamid64);
          const y = (w % 2n).toString();

          w = w - BigInt(y) - v;
          if (w < 1n) {
            return false;
          }
          return `STEAM_0:${y}:${(w / 2n).toString()}`;
        },
        getSteamid64(steamid32: string) {
          const re = /^\s*STEAM_[0-5]:([01]):(\d+)\s*$/;
          const matches = steamid32.match(re);
          if (!matches) {
            console.log('Invalid SteamID32');
            return steamid32;
          }
          return BigInt(matches[2]) * 2n + BigInt(matches[1])
            + BigInt('76561197960265728');
        },
        customerJourneyActive(step: string | string[]) {
          if (!step) {
            return false;
          }
          if (Array.isArray(step)) {
            if (step.includes(store.getters.activeCustomerJourneyStep)) {
              return true;
            }
            return false;
          }
          if (store.getters.activeCustomerJourneyStep === step) {
            return true;
          }
          return false;
        },
      },
    };
  },
};
