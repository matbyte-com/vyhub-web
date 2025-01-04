const vyhubLightFull = {
  name: 'VyHub',
  description: 'This is VyHubs demo theme adapted to a shop-only instance!',
  type: 'shop_only',
  preview_img: 'https://cdn.vyhub.net/vyhub/themes/shop-only-vyhub.webp',
  data: {
    general: {
      shop_only: true,
      enable_landingpage: false,
      enable_team: false,
      enable_ticket: false,
      enable_forum: true,
      enable_faq: false,
    },
    theme: {
      dark: false,
      image: 'https://cdn.vyhub.net/vyhub/themes/shop-only-background.webp',
      primary: '#db2230',
      secondary: '#ef5350',
      header: '#db2230',
      light_header: false,
      header_container: true,
      footer: '#101322',
      background: '#e6e6e6',
      show_community_name: false,
      custom_css: '.vh-cart-recommended-packets-cart, .vh-cart-recommended-packets-cart h2 {\n' +
        'background-color: #363a45 !important;\n' +
        'color: #ffffff !important;\n' +
        '}\n' +
        '\n' +
        '.button-active {\n' +
        '  background-color: white !important;\n' +
        '  border-radius: 3px !important;\n' +
        '  padding: 2px 4px !important;\n' +
        '}\n' +
        '\n' +
        '.vh-cart-recommended-packets-cart .v-btn--icon {\n' +
        'color: #363a45 !important;\n' +
        '}\n' +
        '\n' +
        '.vh-shop-stats {\n' +
        'background-color: #141d41 !important;\n' +
        'color: #ffffff !important;\n' +
        '}\n' +
        '\n' +
        '.vh-cart-recommended-packets {\n' +
        'background-color: #363944 !important;\n' +
        'color: #ffffff !important;\n' +
        '}'
    },
    shop_settings: {
      donation_goal_enabled: true,
      top_donators_enabled: true,
      last_donators_enabled: true,
    },
  }
}

export default vyhubLightFull
