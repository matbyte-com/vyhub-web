const vyhubLightFull = {
  name: 'VyHub',
  description: 'This is VyHubs demo theme adapted to a shop-only instance!',
  type: 'shop_only',
  preview_img: 'https://picsum.photos/600/400',
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
      image: null,
      image: 'https://images.unsplash.com/photo-1567360425618-1594206637d2?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // TODO put in CDN
      primary: '#db2230',
      secondary: '#ef5350',
      header: '#ffffff',
      light_header: true,
      header_container: true,
      footer: '#101322',
      background: '#e6e6e6',
      show_community_name: false,
      custom_css: '.vh-packet-card-text, .v-btn--outlined {\n' +
        'color: #ffffff !important;\n' +
        '}\n' +
        '.vh-cart-categories, .vh-cart-categories h2, .vh-cart-categories hr {\n' +
        'background-color: #20232a !important;\n' +
        'color: #ffffff !important;\n' +
        'border-color: #5f6269 !important;\n' +
        '}\n' +
        '\n' +
        '.vh-cart-categories a.v-card, .vh-cart-categories h3  {\n' +
        'background-color: #363a45 !important;\n' +
        'color: #ffffff !important;\n' +
        '}\n' +
        '\n' +
        '.vh-cart-recommended-packets-cart, .vh-cart-recommended-packets-cart h2 {\n' +
        'background-color: #363a45 !important;\n' +
        'color: #ffffff !important;\n' +
        '}\n' +
        '\n' +
        '.vh-cart-recommended-packets-cart .v-btn--icon {\n' +
        'color: #363a45 !important;\n' +
        '}\n' +
        '\n' +
        '.vh-cart-category, .vh-cart-category h2, .vh-cart-category hr, .vh-cart-category a.v-card, .vh-cart-category div.v-tab:not(.v-tab--active), vh-cart-category button.v-btn {\n' +
        'background-color: #20232a !important;\n' +
        'color: #ffffff !important;\n' +
        'border-color: #5f6269 !important;\n' +
        '}\n' +
        '\n' +
        '.vh-cart-category div.v-card, .vh-cart-category h6, .vh-cart-category div.text-subtitle-2 {\n' +
        'color: #ffffff !important;\n' +
        'background-color: #363a45 !important;\n' +
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
