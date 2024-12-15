const minimalLightFull = {
  name: 'Minimal',
  description: 'A clean, minimal theme designed for flexibility. Start simple and effortlessly expand with customizable options as your needs grow.',
  type: 'shop_only',
  preview_img: 'https://cdn.vyhub.net/vyhub/themes/minimal-light-shop-only.png',
  data: {
    general: {
      shop_only: true,
      enable_landingpage: false,
      enable_team: false,
      enable_ticket: false,
      enable_forum: false,
      enable_faq: false,
    },
    theme: {
      dark: false,
      primary: '#000000',
      secondary: '#000000',
      header: '#000000',
      light_header: false,
      header_container: false,
      footer: '#000000',
      background: '#f0f0f0',
      show_community_name: false,
      custom_css: 'body { background-color: #f0f0f0; }',
      image: 'https://cdn.vyhub.net/vyhub/themes/abstract-dark.avif'
    },
    shop_settings: {
      donation_goal_enabled: false,
      top_donators_enabled: false,
      last_donators_enabled: false,
    },
  }
}

export default minimalLightFull
