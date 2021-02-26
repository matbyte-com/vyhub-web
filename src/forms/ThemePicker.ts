import common from '@/forms/Common';

export default {
  type: 'object',
  required: [
    'dark',
  ],
  properties: {
    primary: common.colorPicker('settings.labels.primaryColor'),
    dark: {
      type: 'boolean',
      titleK: 'settings.labels.darkmode',
      'x-display': 'switch',
    },
    image: {
      type: 'string',
      titleK: 'settings.labels.backgroundUrl',
    },
    background: common.colorPicker('settings.labels.backgroundColor', 'settings.backgroundColorDescription'),
  },
};
