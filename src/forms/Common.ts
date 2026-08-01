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
    title: i18n.global.t('user'),
    layout: {
      getItems: {
        url: `${API_URL}/user/?query={q}&size=10`,
        itemKey: "data.id",
        itemTitle: "data.username",
        itemIcon: "data.avatar",
        itemsResults: "data.items",
      }
    },
  },
  serverbundleSelectField: {
    type: 'object',
    title: i18n.global.t('serverbundle'),
    'x-fromUrl': `${API_URL}/server/bundle/`,
    'x-itemKey': 'id',
    'x-itemTitle': 'name',
  },
  serverTypeSelectField(disabled = false, selected = 'GMOD') {
    return {
      type: 'string',
      title: i18n.global.t('type'),
      default: selected,
      readOnly: disabled,
      layout: {
        getItems: {
          url: {
            type: 'js-tpl',
            expr: `${API_URL}/server/type/?include_icons=true`,
            pure: true
          },
          itemKey: 'data.type',
          itemTitle: 'data.type',
          itemIcon: 'data.icon',// TODO Would be awesome to show game icon
        },
      },
    };
  },
  forumSelectCategory: {
    type: 'object',
    title: i18n.global.t('category'),
    'x-fromUrl': `${API_URL}/forum/topic/category/`,
    'x-itemKey': 'id',
    'x-itemTitle': 'title',
  },
  forumSelectSubforum: {
    type: 'object',
    title: i18n.global.t('_forum.subforum'),
    'x-fromUrl': `${API_URL}/forum/subforum`,
    'x-itemKey': 'id',
    'x-itemTitle': 'title',
  },
  forumSelectTopicLabels: {
    type: 'object',
    title: i18n.global.t('category'),
    'x-fromUrl': `${API_URL}/forum/topic/category/`,
    'x-itemKey': 'id',
    'x-itemTitle': 'title',
  },
  colorPicker(title = 'color', description?: string, colors?: string[][], inputs = true, cols = 6) {
    return {
      type: 'string',
      title: i18n.global.t(title),
      default: '#000000',
      description: (description != null ? i18n.global.t(description) : undefined),
      layout: {
        comp: 'color-picker',
        cols: cols,
        props: {
          showSwatches: true,
          hideCanvas: true,
          hideSliders: true,
          hideInputs: !inputs,
          swatches: colors,
        }
      },
    };
  },
  packetCategorySelectField: {
    type: 'object',
    title: i18n.global.t('category'),
    'x-fromUrl': `${API_URL}/packet/category/`,
    'x-itemKey': 'id',
    'x-itemTitle': 'name',
  },
  packetSelectField: {
    type: 'object',
    title: i18n.global.t('packet'),
    'x-fromUrl': `${API_URL}/packet/?query={q}`,
    'x-itemKey': 'id',
    'x-itemTitle': 'title',
  },
  rewardSelectField: {
    type: 'object',
    title: i18n.global.t('_purchases.labels.reward'),
    layout: {
      getItems: {
        url: `${API_URL}/packet/reward/?query={q}`,
        itemKey: "item.id",
        itemTitle: "item.name"
      }
    },
  },
  requirementSetSelectField: {
    type: "object",
    title: i18n.global.t('requirementSet'),
    layout: {
      getItems: {
        url: `${API_URL}/requirement/set`,
        itemKey: "item.id",
        itemTitle: "item.name"
      }
    }
  },
  iconPicker: {
    title: i18n.global.t('icon'),
    type: ['string', 'null'],
    layout: {
      getItems: {
        url: {
          type: 'js-tpl',
          expr: `${API_URL}/general/icons?query={q}`,
          pure: true
        },
        itemKey: 'item',
        itemTitle: 'item',
        itemIcon: 'item',
      },
      slots: {
        append: {
          markdown: `<a href="https://materialdesignicons.com/" style="white-space: nowrap;" target="_blank">${i18n.global.t('_forms.labels.iconDescription')}</a>`
        }
      }
    }
  },
  countryCodeField: {
    type: 'string',
    title: i18n.global.t('country'),
    oneOf: countryOptions,
  },
  imageURLField: {
    type: ['string', 'null'],
    title: i18n.global.t('imageURL'),
    pattern: '^https?://.+$',
    'x-props': {
      clearable: true,
    },
  },
  propertiesSelector: {
    type: 'array',
    title: i18n.global.t('properties'),
    default: [],
    layout: {
      slots: {
        component: 'custom-properties'
      }
    },
    items: {
      type: 'string',
    },
  },
  groupSelectField: {
    title: i18n.global.t('group'),
    type: 'object',
    'x-fromUrl': `${API_URL}/group/`,
    'x-itemTitle': 'name',
    'x-itemKey': 'id',
  },
  propertySelectField: {
    type: 'string',
    title: i18n.global.t('_requirement.propertyName'),
    layout: {
      getItems: {
        // /group/property/ returns properties grouped by category:
        // [{ categoryName: [{ name, ... }] }, ...] -> flatten to a single list.
        url: `${API_URL}/group/property/`,
        itemsResults: 'data.flatMap((category) => Object.values(category).flat())',
        itemValue: 'item.name',
        itemKey: 'item.name',
        itemTitle: 'item.name',
      },
    },
  },
  currency_code: {
    type: 'string',
    title: i18n.global.t('_packet.labels.currency'),
    enum: cc.codes(),
  },
  userAttributeSelectField: {
    type: 'string',
    title: i18n.global.t('_requirement.attributeName'),
    layout: {
      getItems: {
        url: `${API_URL}/user/attribute/definition`,
        itemValue: 'item.name',
        itemKey: 'item.name',
        itemTitle: 'item.title',
      },
    },
  },
  apiURL: API_URL,
};
