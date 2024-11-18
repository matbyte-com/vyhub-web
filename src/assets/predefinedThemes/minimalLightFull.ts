const minimalLightFull = {
  name: 'Minimal',
  description: 'This is the minimal theme. It is minimal, you can add all options you want but that makes it easy to grow with the theme',
  type: 'full_management',
  preview_img: 'https://picsum.photos/600/400',
  data: {
    general: {
      shop_only: false,
      enable_landing_page: false,
      enable_team: false,
      enable_ticket: false,
      enable_forum: false,
      enable_faq: false,
      show_advanced_settings: false,
    },
    theme: {
      dark: false,
      image: null,
      primary: '#000000',
      secondary: '#000000',
      header: '#000000',
      light_header: false,
      header_container: false,
      footer: '#000000',
      background: '#f0f0f0',
      show_community_name: false,
      custom_css: 'body { background-color: #f0f0f0; }'
    },
    shop_settings: {
      shop_message: 'Nice Message'
    },
  }
}

export default minimalLightFull
