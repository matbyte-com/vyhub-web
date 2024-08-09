import i18n from '@/plugins/i18n';
import store from '@/store';
import Common from '@/forms/Common';

const API_URL = Common.apiURL;

export default {
  components: [
    {
      title: 'Default Header',
      keywords: ['header', 'welcome', 'headline', 'navigation'],
      component: 'DefaultHeader',
      previewImage: 'https://cdn.vyhub.net/vyhub/page-builder/Header.png',
      no_wrap: true,
    },
    {
      title: 'Custom Header',
      keywords: ['header', 'welcome', 'headline', 'navigation'],
      component: 'Header',
      previewImage: 'https://cdn.vyhub.net/vyhub/page-builder/Header.png',
      no_wrap: true,
      schema: {
        type: 'object',
        properties: {
          logoUrl: {
            title: i18n.global.t('_theme.logoURL'),
            type: 'string',
            'x-props': {
              clearable: true,
            },
            'x-cols': 6,
          },
          logo_width: {
            type: 'integer',
            minimum: 50,
            maximum: 150,
            title: i18n.global.t('_theme.logoWidth'),
            'x-display': 'slider',
            'x-props': {
              'thumb-label': 'always',
            },
            'x-class': 'pl-3 mt-5',
            'x-cols': 6,
          },
          headline: {
            title: i18n.global.t('_component._form.headline'),
            type: 'string',
          },
          backgroundColor: {
            type: 'string',
            title: i18n.global.t('_theme.backgroundColor'),
            format: 'hexcolor',
            'x-cols': 6,
          },
          whiteText: {
            type: 'boolean',
            title: i18n.global.t('_component.whiteText'),
            'x-cols': 6,
            'x-display': 'switch',
            'x-props': {
              'hide-details': 'auto',
            },
          },
          app: {
            type: 'boolean',
            title: i18n.global.t('_component._form.app'),
            'x-display': 'switch',
            'x-props': {
              'hide-details': 'auto',
            },
          },
          fixed: {
            type: 'boolean',
            title: i18n.global.t('_component._form.fixed'),
            'x-display': 'switch',
            'x-props': {
              'hide-details': 'auto',
            },
          },
          dense: {
            type: 'boolean',
            title: i18n.global.t('_component._form.dense'),
            'x-cols': 6,
            'x-display': 'switch',
            'x-props': {
              'hide-details': 'auto',
            },
          },
          links: {
            type: 'array',
            title: 'Buttons',
            items: {
              type: 'object',
              required: ['link'],
              properties: {
                icon: Common.iconPicker,
                btnText: {
                  title: i18n.global.t('title'),
                  type: 'string',
                },
                link: {
                  title: i18n.global.t('url'),
                  type: 'string',
                },
                targetBlank: {
                  title: i18n.global.t('_component._form.openInNewTab'),
                  type: 'boolean',
                },
              },
            },
          },
        },
      },
      defaults: {
        headline: store.getters.generalConfig ? store.getters.generalConfig.community_name : 'Community Name',
        fixed: true,
        links: [
          {
            icon: 'mdi-newspaper',
            btnText: 'News',
            link: '/news',
          },
          {
            icon: 'mdi-cart',
            btnText: 'Shop',
            link: '/shop',
          },
          {
            icon: 'mdi-forum',
            btnText: 'Forum',
            link: '/forum',
          },
        ],
      },
    },
    {
      title: 'Headline',
      keywords: ['headline', 'welcome'],
      component: 'Headline',
      previewImage: 'https://cdn.vyhub.net/vyhub/page-builder/Headline.png',
      no_wrap: true,
      schema: {
        type: 'object',
        properties: {
          title: {
            title: i18n.global.t('title'),
            type: 'string',
            'x-cols': 6,
          },
          subtitle: {
            title: i18n.global.t('subtitle'),
            type: 'string',
            'x-cols': 6,
            'x-class': 'pl-1',
          },
          logoUrl: {
            title: i18n.global.t('_theme.logoURL'),
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
                  title: i18n.global.t('title'),
                  type: 'string',
                },
                link: {
                  title: i18n.global.t('url'),
                  type: 'string',
                },
              },
            },
          },
          height: {
            title: i18n.global.t('_component._form.height'),
            type: 'string',
            'x-cols': 6,
          },
          imageUrl: {
            title: i18n.global.t('_theme.backgroundImageURL'),
            type: 'string',
            'x-cols': 6,
            'x-props': {
              clearable: true,
            },
            'x-class': 'pl-1',
          },
          whiteText: {
            type: 'boolean',
            title: i18n.global.t('_component.whiteText'),
            'x-cols': 6,
            'x-display': 'switch',
            'x-props': {
              'hide-details': 'auto',
            },
          },
          backgroundColor: {
            type: 'string',
            title: i18n.global.t('_theme.backgroundColor'),
            format: 'hexcolor',
            'x-cols': 6,
          },
          container: {
            type: 'boolean',
            title: i18n.global.t('_component._form.container'),
            'x-cols': 6,
            'x-display': 'switch',
            'x-class': 'pt-4',
          },
          backgroundColor2: {
            type: 'string',
            title: i18n.global.t('_theme.backgroundColor'),
            format: 'hexcolor',
            'x-cols': 6,
            'x-class': 'pl-1',
          },
          marginTop: {
            type: 'string',
            title: i18n.global.t('_component._form.marginTop'),
            'x-cols': 4,
            'x-class': 'pl-1',
          },
        },
      },
      defaults: {
        title: store.getters.generalConfig ? store.getters.generalConfig.community_name : 'Community Name',
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
      previewImage: 'https://cdn.vyhub.net/vyhub/page-builder/Carousel.png',
      no_wrap: true,
      schema: {
        type: 'object',
        properties: {
          slides: {
            type: 'array',
            title: 'Slides',
            items: {
              type: 'object',
              required: ['imageUrl'],
              properties: {
                title: {
                  title: i18n.global.t('title'),
                  type: 'string',
                },
                subtitle: {
                  title: i18n.global.t('subtitle'),
                  type: 'string',
                },
                imageUrl: {
                  title: i18n.global.t('imageURL'),
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
            title: i18n.global.t('_component.whiteText'),
            'x-cols': 6,
            'x-display': 'switch',
            'x-class': 'mt-5',
            'x-props': {
              'hide-details': 'auto',
            },
            default: true,
          },
          height: {
            title: i18n.global.t('_component._form.height'),
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
            imageUrl: 'https://steam.cryotank.net/wp-content/gallery/minecraft/Minecraft-07-HD.png',
          },
          {
            title: 'Slide 2',
            subtitle: 'Slide 2 Subtitle',
            imageUrl: 'https://cdn.steamstatic.com/steam/apps/4000/header.jpg',
          },
        ],
      },
    },
    {
      title: 'News',
      keywords: ['news', 'announcements'],
      component: 'NewsPreview',
      previewImage: 'https://cdn.vyhub.net/vyhub/page-builder/NewsPreview.png',
      no_title_in_wrapper: true,
      schema: {
        type: 'object',
        properties: {
          maxColumnHeight: {
            title: i18n.global.t('_component._form.maxColumnHeight'),
            type: 'string',
          },
          inverted: {
            title: i18n.global.t('_component._form.inverted'),
            type: 'boolean',
          },
        },
      },
      defaults: {
        title: 'Do you want to stay updated?',
        subtitle: 'Get the latest announcements here!',
      },
    },
    {
      title: 'Community Stats',
      keywords: ['community', 'stats', 'playtime', 'users', 'players'],
      component: 'CommunityStats',
      previewImage: 'https://cdn.vyhub.net/vyhub/page-builder/CommunityStats.png',
      defaults: {
        title: 'Our Community in Numbers',
      },
    },
    {
      title: 'Shop Stats',
      keywords: ['shop', 'stats', 'top donators', 'donation goal', 'store'],
      component: 'ShopInformation',
      previewImage: 'https://cdn.vyhub.net/vyhub/page-builder/ShopStats.png',
      schema: {
        type: 'object',
        properties: {
          imageCardUrl: {
            title: i18n.global.t('imageURL'),
            type: 'string',
            'x-props': {
              clearable: true,
            },
          },
        },
      },
    },
    {
      title: 'Shop Categories',
      keywords: ['shop', 'categories', 'store'],
      component: 'ShopCategories',
      previewImage: 'https://cdn.vyhub.net/vyhub/page-builder/ShopCategories.png',
      schema: {
        type: 'object',
        properties: {
          callToAction: {
            title: i18n.global.t('_component._form.btnText'),
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
      title: 'Shop Recommended Packets',
      keywords: ['shop', 'categories', 'packets', 'packages'],
      component: 'ShopRecommendedPackets',
      previewImage: 'https://cdn.vyhub.net/vyhub/page-builder/ShopRecommendedPackets.png',
      schema: {
        type: 'object',
        properties: {
          callToAction: {
            title: i18n.global.t('_component._form.btnText'),
            type: 'string',
          },
        },
      },
      defaults: {
        title: 'Store',
        subtitle: 'Get your in-game perks here!',
        callToAction: 'View more!',
      },
    },
    {
      title: 'New Users',
      keywords: ['new users', 'new', 'players', 'users', 'gamer'],
      component: 'NewUsers',
      previewImage: 'https://cdn.vyhub.net/vyhub/page-builder/NewUsers.png',
      schema: {
        type: 'object',
        properties: {
          limit: {
            title: i18n.global.t('_component._form.limit'),
            type: 'number',
            minimum: 1,
            maximum: 100,
          },
        },
      },
      defaults: {
        title: i18n.global.t('_user.labels.newUsers'),
        limit: 4,
      },
    },
    {
      title: 'Join Server',
      previewImage: 'https://cdn.vyhub.net/vyhub/page-builder/JoinServerLink.png',
      keywords: ['server', 'status', 'logo', 'join server'],
      component: 'JoinServer',
      schema: {
        type: 'object',
        properties: {
          servers: {
            type: 'array',
            title: i18n.global.t('servers'),
            items: {
              type: 'string',
            },
            'x-fromUrl': `${API_URL}/server/`,
            'x-itemKey': 'id',
            'x-itemTitle': 'name',
          },
          logoUrl: {
            title: i18n.global.t('_theme.logoURL'),
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
      previewImage: 'https://cdn.vyhub.net/vyhub/page-builder/ServerStatus.png',
      keywords: ['server', 'status', 'logo'],
      component: 'ServerStatus',
    },
    {
      title: 'Server Status 2',
      previewImage: 'https://cdn.vyhub.net/vyhub/page-builder/ServerStatus2.png',
      keywords: ['server', 'status', 'logo'],
      component: 'ServerStatus2',
      schema: {
        type: 'object',
        properties: {
          imageCardUrl: {
            title: i18n.global.t('imageURL'),
            type: 'string',
            'x-props': {
              clearable: true,
            },
          },
        },
      },
      defaults: {
        imageCardUrl: 'https://media.discordapp.net/attachments/1078311411530346587/1154421955039068220/servers-transformed_cleanup.png?width=1033&height=579',
        whiteText: true,
      },
    },
    {
      title: 'Discord',
      keywords: ['discord', 'voice', 'join'],
      component: 'Discord',
      previewImage: 'https://cdn.vyhub.net/vyhub/page-builder/JoinDiscord.png',
      schema: {
        type: 'object',
        properties: {
          headline: {
            title: i18n.global.t('_component._form.headline'),
            type: 'string',
          },
          inviteLink: {
            title: i18n.global.t('_component._form.inviteLink'),
            type: 'string',
          },
          discordWidget: {
            title: i18n.global.t('_component._form.discordWidget'),
            type: 'string',
          },
          inverted: {
            title: i18n.global.t('_component._form.inverted'),
            type: 'boolean',
          },
        },
      },
      defaults: {
        headline: 'Join our Discord',
        discordWidget: '<iframe src="https://discord.com/widget?id=847059571351486504&theme=dark" width="100%" max-width="400" height="400" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>',
      },
    },
    {
      title: 'Forum Activity',
      component: 'ForumLatestActivity',
      keywords: ['forum', 'posts', 'threads', 'reactions', 'activity', 'stats'],
      previewImage: 'https://cdn.vyhub.net/vyhub/page-builder/ForumLatest.png',
      defaults: {
        title: 'Forum',
        subtitle: 'Start the discussion in our Forum!',
      },
    },
    {
      title: 'Features',
      keywords: ['features', 'columns', 'icons', 'cards'],
      component: 'ColumnCards',
      previewImage: 'https://cdn.vyhub.net/vyhub/page-builder/Features.png',
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
                  title: i18n.global.t('title'),
                  type: 'string',
                },
                icon: {
                  title: i18n.global.t('icon'),
                  type: 'string',
                },
                content: {
                  title: i18n.global.t('content'),
                  type: 'string',
                },
                btnText: {
                  title: i18n.global.t('_component._form.btnText'),
                  type: 'string',
                },
                link: {
                  title: i18n.global.t('link'),
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
      previewImage: 'https://cdn.vyhub.net/vyhub/page-builder/FrequentlyAskedQuestions.png',
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
                  title: i18n.global.t('_component._form.question'),
                  type: 'string',
                },
                answer: {
                  title: i18n.global.t('_component._form.answer'),
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
      previewImage: 'https://cdn.vyhub.net/vyhub/page-builder/ColumnsTemplate.png',
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
                  title: i18n.global.t('title'),
                  type: 'string',
                },
                content: {
                  title: i18n.global.t('content'),
                  type: 'string',
                },
                imageUrl: {
                  title: i18n.global.t('imageURL'),
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
      previewImage: 'https://cdn.vyhub.net/vyhub/page-builder/Html.png',
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
