import i18n from '@/plugins/i18n';
import store from '@/store';

export default {
  components: [
    {
      title: 'Headline',
      component: 'Headline',
      imageUrl: 'https://picsum.photos/300/200',
      noWrap: true,
      props: [
        {
          name: 'title',
          type: 'string',
        },
        {
          name: 'subtitle',
          type: 'string',
        },
        {
          name: 'height',
          type: 'string',
        },
        {
          name: 'imageUrl',
          type: 'string',
        },
        {
          name: 'btnText',
          type: 'string',
        },
        {
          name: 'btnUrl',
          type: 'string',
        },
      ],
      defaults: {
        title: store.getters.generalConfig.community_name,
        subtitle: 'Welcome to our community!',
      },
    },
    {
      title: 'Carousel',
      component: 'Carousel',
      imageUrl: 'https://picsum.photos/301/200',
      noWrap: true,
      props: [
        {
          name: 'slides',
          type: 'array',
        },
        {
          name: 'height',
          type: 'string',
        },
      ],
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
      props: [
        {
          name: 'limit',
          type: 'number',
        },
      ],
      defaults: {
        title: i18n.t('_user.labels.newUsers'),
        limit: 4,
      },
    },
    {
      title: 'Discord',
      component: 'Discord',
      imageUrl: 'https://picsum.photos/304/200',
      props: [
        {
          name: 'headline',
          type: 'string',
        },
        {
          name: 'discordWidget',
          type: 'string',
        },
        {
          name: 'mirror',
          type: 'boolean',
        },
      ],
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
      props: [
        {
          name: 'callToAction',
          type: 'string',
        },
      ],
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
      props: [
        {
          name: 'cards',
          type: 'array',
        },
      ],
      defaults: {
        cards: [
          {
            icon: 'mdi-star',
            title: 'Features',
            text: 'We offer the best features on the market!',
          },
          {
            icon: 'mdi-face-agent',
            title: 'Support',
            text: 'Our friendly support is here to help you!',
          },
          {
            icon: 'mdi-developer-board',
            title: 'Developer',
            text: 'Our experienced developer team is constantly working on new features!',
          },
        ],
      },
    },
    {
      title: 'Join Server',
      imageUrl: 'https://picsum.photos/309/200',
      component: 'JoinServer',
      props: [
        {
          name: 'servers',
          type: 'array',
        },
        {
          name: 'imageUrl',
          type: 'string',
        },
      ],
    },
    {
      title: 'HTML',
      component: 'RawHtml',
      imageUrl: 'https://picsum.photos/302/200',
      noWrap: true,
      props: [
        {
          name: 'html',
          type: 'string',
        },
      ],
      defaults: {
        html: '<div style="width: 100%; text-align: center; background-color: #646464">'
          + '<h1>Hi, I am an HTML block</h1><p>HTML</p></div>',
      },
    },
  ],
};
