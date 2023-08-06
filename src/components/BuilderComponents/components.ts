export default {
  components: [
    {
      title: 'Headline',
      component: 'Headline',
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
    },
    {
      title: 'Carousel',
      component: 'Carousel',
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
    },
    {
      title: 'HTML',
      component: 'RawHtml',
      props: [
        {
          name: 'html',
          type: 'string',
        },
      ],
    },
    {
      title: 'New Users',
      component: 'NewUsers',
      props: [
        {
          name: 'limit',
          type: 'number',
        },
      ],
    },
    {
      title: 'Discord',
      component: 'Discord',
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
    },
    {
      title: 'Community Stats',
      component: 'CommunityStats',
      props: [
        {
          name: 'headline',
          type: 'string',
        },
      ],
    },
    {
      title: 'Shop Stats',
      component: 'ShopInformation',
      props: [
        {
          name: 'headline',
          type: 'string',
        },
      ],
    },
  ],
};
