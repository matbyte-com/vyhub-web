export default {
  themes: [
    {
      name: 'Minimal',
      description: 'This is the minimal theme. It is minimal, you can add all options you want but that makes it easy to grow with the theme',
      type: 'full_management',
      preview_img: 'https://picsum.photos/600/400',
      data: {
        general: {
          shop_only: false,
        },
        theme: {
          primary: '#000000',
        },
        shop_settings: {
          shop_message: 'Nice Message'
        },
        custom_css: {
          css: 'body { background-color: #f0f0f0; }'
        }
      }
    },
    {
      name: 'Minimal',
      description: 'This is the minimal theme. It is minimal, you can add all options you want but that makes it easy to grow with the theme',
      type: 'shop_only',
      preview_img: 'https://picsum.photos/601/400',
      data: {
        general: {
          shop_only: false,
        },
        theme: {
          primary: '#000000',
        },
        shop_settings: {
          shop_message: 'Nice Message'
        },
        custom_css: {
          css: 'body { background-color: #f0f0f0; }'
        }
      }
    }
  ]
}
