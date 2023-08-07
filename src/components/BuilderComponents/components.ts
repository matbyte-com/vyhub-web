import i18n from '@/plugins/i18n';
import store from '@/store';
import Common from '@/forms/Common';

const API_URL = Common.apiURL;

export default {
  components: [
    {
      title: 'Headline',
      component: 'Headline',
      imageUrl: 'https://picsum.photos/300/200',
      noWrap: true,
      schema: {
        type: 'object',
        properties: {
          title: {
            title: 'title',
            type: 'string',
          },
          subtitle: {
            title: 'subtitle',
            type: 'string',
          },
          height: {
            title: 'height',
            type: 'number',
          },
          imageUrl: {
            title: 'imageUrl',
            type: 'string',
          },
          buttons: {
            type: 'array',
            title: 'Buttons',
            items: {
              type: 'object',
              required: ['btnText', 'link'],
              properties: {
                btnText: {
                  title: 'String',
                  type: 'string',
                },
                link: {
                  title: 'btnUrl',
                  type: 'string',
                },
              },
            },
          },
        },
      },
      defaults: {
        title: store.getters.generalConfig.community_name,
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
      imageUrl: 'https://picsum.photos/301/200',
      noWrap: true,
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
                  title: 'title',
                  type: 'string',
                },
                subtitle: {
                  title: 'subtitle',
                  type: 'string',
                },
                imageUrl: {
                  title: 'imageUrl',
                  type: 'string',
                },
              },
            },
          },
          height: {
            title: 'height',
            type: 'number',
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
      title: 'New Users',
      component: 'NewUsers',
      imageUrl: 'https://picsum.photos/303/200',
      schema: {
        type: 'object',
        properties: {
          limit: {
            title: 'limit',
            type: 'number',
            minimum: 1,
          },
        },
      },
      defaults: {
        title: i18n.t('_user.labels.newUsers'),
        limit: 4,
      },
    },
    {
      title: 'Discord',
      component: 'Discord',
      imageUrl: 'https://picsum.photos/304/200',
      schema: {
        type: 'object',
        properties: {
          headline: {
            title: 'headline',
            type: 'string',
          },
          discordWidget: {
            title: 'discordWidget',
            type: 'string',
          },
          inverted: {
            title: 'mirror',
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
      title: 'Community Stats',
      component: 'CommunityStats',
      imageUrl: 'https://picsum.photos/305/200',
      defaults: {
        title: 'Our Community in Numbers',
      },
    },
    {
      title: 'Shop Stats',
      component: 'ShopInformation',
      imageUrl: 'https://picsum.photos/306/200',
    },
    {
      title: 'Shop Categories',
      component: 'ShopCategories',
      imageUrl: 'https://picsum.photos/307/200',
      schema: {
        type: 'object',
        properties: {
          callToAction: {
            title: 'callToAction',
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
      title: 'Features',
      component: 'ColumnCards',
      imageUrl: 'https://picsum.photos/308/200',
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
                  title: 'title',
                  type: 'string',
                },
                icon: {
                  title: 'icon',
                  type: 'string',
                },
                content: {
                  title: 'content',
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
          },
          {
            icon: 'mdi-face-agent',
            title: 'Support',
            content: 'Our friendly support is here to help you!',
          },
          {
            icon: 'mdi-developer-board',
            title: 'Developer',
            content: 'Our experienced development team is constantly working on new features!',
          },
        ],
      },
    },
    {
      title: 'Join Server',
      imageUrl: 'https://picsum.photos/309/200',
      component: 'JoinServer',
      schema: {
        type: 'object',
        properties: {
          servers: {
            type: 'array',
            title: 'Servers',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  title: 'server',
                  'x-fromUrl': `${API_URL}/server/`,
                  'x-itemKey': 'id',
                  'x-itemTitle': 'name',
                },
              },
            },
          },
          imageUrl: {
            title: 'imageUrl',
            type: 'string',
          },
        },
      },
    },
    {
      title: 'HTML',
      component: 'RawHtml',
      imageUrl: 'https://picsum.photos/302/200',
      noWrap: true,
      schema: {
        type: 'object',
        properties: {
          html: {
            title: 'html',
            type: 'string',
            'x-display': 'textarea',
          },
        },
      },
      defaults: {
        html: '<div class="pa-5" style="width: 100%; text-align: center; background-color: #FFA500">'
          + '<p><h1>Hi 👋, I am an HTML block</h1></p><p class="mb-0">Writing HTML isn\'t that hard. The cool thing is, you can use all of Vuetify\'s css-classes. Since they are already injected.</p><p class="text--disabled">Writing Vue or Vuetify tags doesn\'t work.</p>'
          + '<p>TODO: Explanation on how to call the API</p>'
          + '<div class="d-flex justify-center">'
          + '<div class="text-center grow">⬅️ Left Column</div><div class="text-center grow">Right Column ➡️</div></div></div>',
      },
    },
  ],
};
