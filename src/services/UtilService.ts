import { HumanizeDurationLanguage, HumanizeDuration } from 'humanize-duration-ts';

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
};