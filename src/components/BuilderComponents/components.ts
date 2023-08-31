import i18n from '@/plugins/i18n';
import store from '@/store';
import Common from '@/forms/Common';

const API_URL = Common.apiURL;

export default {
  components: [
    {
      title: 'Headline',
      keywords: ['headline', 'welcome'],
      component: 'Headline',
      previewImage: 'https://picsum.photos/300/200',
      no_wrap: true,
      schema: {
        type: 'object',
        properties: {
          title: {
            title: i18n.t('title'),
            type: 'string',
            'x-cols': 6,
          },
          subtitle: {
            title: i18n.t('subtitle'),
            type: 'string',
            'x-cols': 6,
          },
          logoUrl: {
            title: i18n.t('_theme.logoURL'),
            type: 'string',
            'x-props': {
              clearable: true,
            },
          },
          buttons: {
            type: 'array',
            title: 'Buttons',
            items: {
              type: 'object',
              required: ['btnText', 'link'],
              properties: {
                btnText: {
                  title: i18n.t('title'),
                  type: 'string',
                },
                link: {
                  title: i18n.t('url'),
                  type: 'string',
                },
              },
            },
          },
          height: {
            title: i18n.t('_component._form.height'),
            type: 'string',
            'x-cols': 6,
          },
          imageUrl: {
            title: i18n.t('_theme.backgroundImageURL'),
            type: 'string',
            'x-cols': 6,
            'x-props': {
              clearable: true,
            },
          },
          whiteText: {
            type: 'boolean',
            title: i18n.t('_component.whiteText'),
            'x-cols': 6,
            'x-display': 'switch',
            'x-props': {
              'hide-details': 'auto',
            },
            default: true,
          },
          backgroundColor: {
            type: 'string',
            title: i18n.t('_theme.backgroundColor'),
            format: 'hexcolor',
            'x-cols': 6,
          },
        },
      },
      defaults: {
        title: store.getters.generalConfig ? store.getters.generalConfig.community_name : 'Communtiy Name',
        subtitle: 'Welcome to our community!',
        buttons: [
          {
            btnText: 'Join Now',
            link: '/',
          },
        ],
      },
    },
    {
      title: 'Carousel',
      component: 'Carousel',
      keywords: ['headline', 'welcome', 'carousel', 'slider', 'slides'],
      previewImage: 'https://picsum.photos/301/200',
      no_wrap: true,
      schema: {
        type: 'object',
        properties: {
          slides: {
            type: 'array',
            title: 'Slides',
            items: {
              type: 'object',
              properties: {
                title: {
                  title: i18n.t('title'),
                  type: 'string',
                },
                subtitle: {
                  title: i18n.t('subtitle'),
                  type: 'string',
                },
                imageUrl: {
                  title: i18n.t('imageURL'),
                  type: 'string',
                  'x-props': {
                    clearable: true,
                  },
                },
              },
            },
          },
          whiteText: {
            type: 'boolean',
            title: i18n.t('whiteText'),
            'x-cols': 6,
            'x-display': 'switch',
            'x-props': {
              'hide-details': 'auto',
            },
            default: true,
          },
          height: {
            title: 'height',
            type: 'number',
            'x-cols': 6,
          },
        },
      },
      defaults: {
        slides: [
          {
            title: 'Slide 1',
            subtitle: 'Slide 1 Subtitle',
            imageUrl: 'https://picsum.photos/600/400',
          },
          {
            title: 'Slide 2',
            subtitle: 'Slide 2 Subtitle',
            imageUrl: 'https://picsum.photos/600/400',
          },
        ],
      },
    },
    {
      title: 'News',
      keywords: ['news', 'announcements'],
      component: 'NewsPreview',
      previewImage: 'https://picsum.photos/303/201',
      schema: {
        type: 'object',
        properties: {
          maxColumnHeight: {
            title: i18n.t('_component._form.maxColumnHeight'),
            type: 'string',
          },
        },
      },
    },
    {
      title: 'Community Stats',
      keywords: ['community', 'stats', 'playtime', 'users', 'players'],
      component: 'CommunityStats',
      previewImage: 'https://picsum.photos/305/200',
      defaults: {
        title: 'Our Community in Numbers',
      },
    },
    {
      title: 'Shop Stats',
      keywords: ['shop', 'stats', 'top donators', 'donation goal', 'store'],
      component: 'ShopInformation',
      previewImage: 'https://picsum.photos/306/200',
    },
    {
      title: 'Shop Categories',
      keywords: ['shop', 'categories', 'store'],
      component: 'ShopCategories',
      previewImage: 'https://picsum.photos/307/200',
      schema: {
        type: 'object',
        properties: {
          callToAction: {
            title: i18n.t('_component._form.btnText'),
            type: 'string',
          },
        },
      },
      defaults: {
        title: 'Store',
        subtitle: 'Get your in-game perks here!',
        callToAction: 'Browse Packages',
      },
    },
    {
      title: 'New Users',
      keywords: ['new users', 'new', 'players', 'users', 'gamer'],
      component: 'NewUsers',
      previewImage: 'https://picsum.photos/303/200',
      schema: {
        type: 'object',
        properties: {
          limit: {
            title: i18n.t('_component._form.limit'),
            type: 'number',
            minimum: 1,
            maximum: 100,
          },
        },
      },
      defaults: {
        title: i18n.t('_user.labels.newUsers'),
        limit: 4,
      },
    },
    {
      title: 'Join Server',
      previewImage: 'https://picsum.photos/309/200',
      keywords: ['server', 'status', 'logo', 'join server'],
      component: 'JoinServer',
      schema: {
        type: 'object',
        properties: {
          servers: {
            type: 'array',
            title: i18n.t('servers'),
            items: {
              type: 'string',
            },
            'x-fromUrl': `${API_URL}/server/`,
            'x-itemKey': 'id',
            'x-itemTitle': 'name',
          },
          imageUrl: {
            title: i18n.t('imageURL'),
            type: 'string',
            'x-props': {
              clearable: true,
            },
          },
        },
      },
    },
    {
      title: 'Server Status',
      previewImage: 'https://picsum.photos/310/200',
      keywords: ['server', 'status', 'logo'],
      component: 'ServerStatus',
    },
    {
      title: 'Discord',
      keywords: ['discord', 'voice', 'join'],
      component: 'Discord',
      previewImage: 'https://picsum.photos/304/200',
      schema: {
        type: 'object',
        properties: {
          headline: {
            title: i18n.t('_component._form.headline'),
            type: 'string',
          },
          discordWidget: {
            title: i18n.t('_component._form.discordWidget'),
            type: 'string',
          },
          inverted: {
            title: i18n.t('_component._form.inverted'),
            type: 'boolean',
          },
        },
      },
      defaults: {
        headline: 'Join our Discord',
        discordWidget: '<iframe src="https://discord.com/widget?id=847059571351486504&theme=dark" width="400" height="400" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>',
      },
    },
    {
      title: 'Forum Activity',
      component: 'ForumLatestActivity',
      keywords: ['forum', 'posts', 'threads', 'reactions', 'activity', 'stats'],
      previewImage: 'https://picsum.photos/311/200',
      defaults: {
        title: 'Forum',
        subtitle: 'Start the discussion in our Forum!',
      },
    },
    {
      title: 'Features',
      keywords: ['features', 'columns', 'icons', 'cards'],
      component: 'ColumnCards',
      previewImage: 'https://picsum.photos/308/200',
      schema: {
        type: 'object',
        properties: {
          cards: {
            type: 'array',
            title: 'Cards',
            items: {
              type: 'object',
              properties: {
                title: {
                  title: i18n.t('title'),
                  type: 'string',
                },
                icon: {
                  title: i18n.t('icon'),
                  type: 'string',
                },
                content: {
                  title: i18n.t('content'),
                  type: 'string',
                },
                btnText: {
                  title: i18n.t('_component._form.btnText'),
                  type: 'string',
                },
                link: {
                  title: i18n.t('link'),
                  type: 'string',
                },
              },
            },
          },
        },
      },
      defaults: {
        cards: [
          {
            icon: 'mdi-star',
            title: 'Features',
            content: 'We offer the best features on the market!',
            btnText: 'View Features',
          },
          {
            icon: 'mdi-face-agent',
            title: 'Support',
            content: 'Our friendly support is here to help you!',
            btnText: 'Contact Us',
          },
          {
            icon: 'mdi-developer-board',
            title: 'Developer',
            content: 'Our experienced development team is constantly working on new features!',
            btnText: 'View Introductions',
          },
        ],
      },
    },
    {
      title: 'Frequently Asked Questions',
      component: 'Faq',
      keywords: ['questions', 'answers', 'help', 'faq'],
      previewImage: 'https://picsum.photos/310/200',
      schema: {
        type: 'object',
        properties: {
          questions: {
            type: 'array',
            title: 'Questions',
            items: {
              type: 'object',
              properties: {
                question: {
                  title: i18n.t('_component._form.question'),
                  type: 'string',
                },
                answer: {
                  title: i18n.t('_component._form.answer'),
                  type: 'string',
                },
                icon: Common.iconPicker,
              },
            },
          },
        },
      },
      defaults: {
        title: 'FAQ',
        subtitle: 'Frequently Asked Questions',
        questions: [
          {
            question: 'What makes us different?',
            answer: 'We are a team of experienced developers and server owners. We know what you need!',
          },
          {
            question: 'How can I contact you?',
            answer: 'The easiest way is to join our Discord server.',
          },
        ],
      },
    },
    {
      title: 'Columns',
      component: 'Columns',
      keywords: ['columns', 'customizable', 'content', 'images'],
      previewImage: 'https://picsum.photos/311/200',
      schema: {
        type: 'object',
        properties: {
          columns: {
            type: 'array',
            title: 'Columns',
            items: {
              type: 'object',
              properties: {
                title: {
                  title: i18n.t('title'),
                  type: 'string',
                },
                content: {
                  title: i18n.t('content'),
                  type: 'string',
                },
                imageUrl: {
                  title: i18n.t('imageURL'),
                  type: 'string',
                  'x-props': {
                    clearable: true,
                  },
                },
              },
            },
          },
          maxContentWidth: {
            title: 'maxContentWidth',
            type: 'string',
          },
          maxImageWidth: {
            title: 'maxImageWidth',
            type: 'string',
          },
        },
      },
      defaults: {
        columns: [
          {
            title: 'Column 1',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl. Sed vitae nisl eget nisl aliquam ultricies. Sed vitae nisl eget nisl aliquam ultricies.',
          },
          {
            imageUrl: 'https://picsum.photos/300/200',
          },
        ],
      },
    },
    {
      title: 'HTML',
      component: 'RawHtml',
      keywords: ['html', 'customizable', 'content'],
      previewImage: 'https://picsum.photos/302/200',
      no_wrap: true,
      schema: {
        type: 'object',
        properties: {
          html: {
            title: 'HTML',
            type: 'string',
            'x-display': 'textarea',
          },
        },
      },
      defaults: {
        html: '<div class="pa-5" style="width: 100%; text-align: center; background-color: #FFA500">'
          + '<p><h1>Hi 👋, I am an HTML block</h1></p><p class="mb-0">Writing HTML isn\'t that hard. The cool thing is, you can use all of Vuetify\'s css-classes. Since they are already injected.</p><p class="text--disabled">(Writing Vue or Vuetify tags doesn\'t work.)</p>'
          + '<p>TODO: Explanation on how to call the API</p>'
          + '<div class="d-flex justify-center">'
          + '<div class="text-center grow">⬅️ Left Column</div><div class="text-center grow">Right Column ➡️</div></div></div>',
      },
    },
  ],
};
