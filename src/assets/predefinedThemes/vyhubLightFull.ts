const vyhubLightFull = {
  name: 'VyHub',
  description: 'This is VyHubs demo theme!',
  type: 'full_management',
  preview_img: 'https://picsum.photos/600/400',
  data: {
    general: {
      shop_only: false,
      enable_landingpage: false,
      enable_team: false,
      enable_ticket: false,
      enable_forum: false,
      enable_faq: false,
    },
    theme: {
      dark: false,
      image: null,
      primary: '#db2230',
      secondary: '#ef5350',
      header: '#ffffff',
      light_header: true,
      header_container: true,
      footer: '#101322',
      background: '#e6e6e6',
      show_community_name: false,
      custom_css: '.vh-news-donation-goal, .vh-news-donation-goal i, .vh-news-donation-goal a.v-btn {\n' +
        'background-color: #141d41 !important;\n' +
        'color: #ffffff !important;\n' +
        '}\n' +
        '.vh-packet-card-text, .v-btn--outlined {\n' +
        'color: #ffffff !important;\n' +
        '}\n' +
        '.vh-news-top-donators, .vh-news-top-donators i, .vh-news-top-donators a.v-btn {\n' +
        'background-color: #363944 !important;\n' +
        'color: #ffffff !important;\n' +
        '}\n' +
        '.vh-new-users, .vh-new-users i, .vh-new-users div.v-card {\n' +
        'background-color: #d8dbe7 !important;\n' +
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
        '.vh-cart-recommended-packets-cart, .vh-cart-recommended-packets h2 {\n' +
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
        '}\n' +
        '\n' +
        '.vh-forum-latest-posts,.vh-forum-latest-posts .v-list , .vh-forum-latest-posts a.v-btn, .vh-forum-latest-posts span.vh-forum-link, .vh-forum-latest-posts a.vh-forum-link {\n' +
        'background-color: #141d41 !important;\n' +
        'color: #ffffff !important;\n' +
        '}\n' +
        '\n' +
        '.vh-forum-latest-posts i {\n' +
        'color: #ffffff !important;\n' +
        '}\n' +
        '\n' +
        '.vh-forum-latest-threads, .vh-forum-latest-threads .v-list, .vh-forum-latest-threads a.v-btn, .vh-forum-latest-threads span.vh-forum-link, .vh-forum-latest-threads a.vh-forum-link {\n' +
        'background-color: #353944 !important;\n' +
        'color: #ffffff !important;\n' +
        '}\n' +
        '\n' +
        '.vh-forum-latest-threads i {\n' +
        'color: #ffffff !important;\n' +
        '}\n' +
        '\n' +
        '.vh-forum-statistics, .vh-forum-statistics i {\n' +
        'background-color: #d8dce7 !important;\n' +
        'color: #1c1d1e !important;\n' +
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
