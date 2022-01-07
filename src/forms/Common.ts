import countries from 'country-list';
import countryUnicodeFlags from 'country-flag-icons/unicode';
import cc from 'currency-codes';
import i18n from '@/plugins/i18n';
import config from '@/config';

const API_URL = config.backend_url;

const countryOptions = Object.entries(countries.getCodeList())
  .map((c) => ({
    const: c[0].toUpperCase(),
    title: `${countryUnicodeFlags(c[0])} ${c[1]}`,
  }));

export default {
  userSelectField: {
    type: 'object',
    title: i18n.t('user'),
    'x-fromUrl': `${API_URL}/user/?query={q}&max=10`,
    'x-itemKey': 'id',
    'x-itemTitle': 'username',
    'x-itemIcon': 'avatar',
  },
  serverbundleSelectField: {
    type: 'object',
    title: i18n.t('serverbundle'),
    'x-fromUrl': `${API_URL}/server/bundle/`,
    'x-itemKey': 'id',
    'x-itemTitle': 'name',
  },
  serverbundleSelectFieldByType(dt = 'object', type_key = 'type') {
    return {
      type: dt,
      title: i18n.t('serverbundle'),
      'x-fromUrl': `${API_URL}/server/bundle/?server_type={${type_key}}`,
      'x-itemKey': 'id',
      'x-itemTitle': 'name',
    };
  },
  serverTypeSelectField(disabled = false, selected = 'GMOD') {
    const form = {
      type: 'string',
      title: i18n.t('type'),
      default: selected,
      readOnly: disabled,
      'x-fromUrl': `${API_URL}/server/type/`,
    };
    return form;
  },
  colorPicker(title = 'color', description?: string) {
    const form = {
      type: 'string',
      title: i18n.t(title),
      format: 'hexcolor',
      default: '#000000',
      description: (description != null ? i18n.t(description) : null),
      'x-cols': 6,
      'x-props': {
        showSwatches: true,
        hideCanvas: true,
        hideSliders: true,
      },
    };
    return form;
  },
  packetCategorySelectField: {
    type: 'object',
    title: i18n.t('category'),
    'x-fromUrl': `${API_URL}/packet/category/`,
    'x-itemKey': 'id',
    'x-itemTitle': 'name',
  },
  packetSelectField: {
    type: 'object',
    title: i18n.t('packet'),
    'x-fromUrl': `${API_URL}/packet/`,
    'x-itemKey': 'id',
    'x-itemTitle': 'title',
  },
  packetsSelectField: {
    type: 'array',
    title: i18n.t('packets'),
    'x-fromUrl': `${API_URL}/packet/`,
    'x-itemKey': 'id',
    'x-itemTitle': 'title',
    items: {
      type: 'object',
    },
  },
  rewardsSelectField: {
    type: 'array',
    title: i18n.t('rewards'),
    items: {
      type: 'object',
    },
    'x-fromUrl': `${API_URL}/packet/reward/?query={q}`,
    'x-itemKey': 'id',
    'x-itemTitle': 'name',
  },
  requirementSetSelectField: {
    type: 'object',
    title: i18n.t('requirementSet'),
    'x-fromUrl': `${API_URL}/requirement/set`,
    'x-itemKey': 'id',
    'x-itemTitle': 'name',
  },
  iconPicker: {
    title: i18n.t('icon'),
    type: 'string',
    'x-slots': {
      'append-outer': `<a href="https://materialdesignicons.com/" style="white-space: nowrap;" target="_blank">${i18n.t('forms.iconDescription')}</a>`,
    },
    'x-display': 'icon',
    'x-fromUrl': `${API_URL}/general/icons?query={q}`,
  },
  countryCodeField: {
    type: 'string',
    title: i18n.t('country'),
    oneOf: countryOptions,
  },
  imageURLField: {
    type: 'string',
    title: i18n.t('imageURL'),
    pattern: '^https?://.+$',
  },
  propertiesSelector: {
    type: 'array',
    title: i18n.t('properties'),
    items: {
      type: 'string',
    },
    'x-fromUrl': `${API_URL}/group/property/`,
    'x-itemKey': 'name',
    'x-itemTitle': 'description', // TODO: Replace with translation based on property name,
    'x-display': 'checkbox',
  },
  advancedProperties: {
    type: 'object',
    title: i18n.t('advancedProperties'),
    properties: {
      server_group: {
        type: 'string',
        title: i18n.t('_properties.server_group'),
      },
    },
  },
  groupSelectField: {
    title: i18n.t('group'),
    type: 'object',
    'x-fromUrl': `${API_URL}/group/`,
    'x-itemTitle': 'name',
    'x-itemKey': 'id',
  },
  groupSelectFieldMulti: {
    title: i18n.t('group'),
    type: 'array',
    items: {
      type: 'string',
    },
    'x-fromUrl': `${API_URL}/group/`,
    'x-itemTitle': 'name',
    'x-itemKey': 'id',
  },
  currency_code: {
    type: 'string',
    title: i18n.t('_packet.labels.currency'),
    'x-cols': 4,
    enum: cc.codes(),
  },
  apiURL: API_URL,
};
