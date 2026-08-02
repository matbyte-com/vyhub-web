const goldDarkFull = {
  name: 'Midas',
  description: 'A sleek dark theme accented with warm gold gradients for a premium, modern feel.',
  type: 'full_management',
  preview_img: 'https://cdn.vyhub.net/vyhub/themes/midas.png',
  data: {
    general: {
      shop_only: false,
      enable_landingpage: false,
      enable_team: false,
      enable_ticket: false,
      enable_forum: true,
      enable_faq: false,
    },
    theme: {
      dark: true,
      image: null,
      primary: '#d4af37', // Metallic gold accent
      secondary: '#e5c76b', // Softer champagne gold
      header: '#121110', // Near-black header
      light_header: false,
      header_container: true,
      footer: '#0d0c0a', // Deep charcoal footer
      background: '#141210', // Warm dark background
      show_community_name: true,
      custom_css: `
        body {
            background: radial-gradient(circle at top, #1c1913 0%, #0d0c0a 70%) !important;
        }
        .vh-news-donation-goal {
            background: linear-gradient(135deg, #241d10 0%, #4a3a18 100%) !important;
        }
        .vh-news-donation-goal {
            color: #f4e4b0 !important;
        }
        .vh-news-donation-goal i {
            color: #d4af37 !important;
        }
        .vh-news-donation-goal a.v-btn {
            background-color: #d4af37 !important;
            color: #14120c !important;
        }
        .vh-packet-card-text, .v-btn--outlined {
            color: #d4af37 !important;
        }
        .vh-news-top-donators {
            background: linear-gradient(135deg, #201b12 0%, #3a2f18 100%) !important;
        }
        .vh-news-top-donators {
            color: #f4e4b0 !important;
        }
        .vh-news-top-donators i {
            color: #d4af37 !important;
        }
        .vh-news-top-donators a.v-btn {
            background-color: #d4af37 !important;
            color: #14120c !important;
        }
        .vh-new-users {
            background: linear-gradient(135deg, #1a1811 0%, #262014 100%) !important;
            color: #f4e4b0 !important;
        }
        .vh-new-users div.v-card {
            background-color: #24201a !important;
            border-color: #d4af37 !important;
            color: #f4e4b0 !important;
        }
        .vh-forum-latest-posts {
            background: linear-gradient(135deg, #241d10 0%, #4a3a18 100%) !important;
        }
        .vh-forum-latest-posts,
        .vh-forum-latest-posts span.vh-forum-link,
        .vh-forum-latest-posts a.vh-forum-link {
            color: #f4e4b0 !important;
        }
        .vh-forum-latest-posts .v-list,
        .vh-forum-latest-posts .v-card-text {
            background: transparent !important;
        }
        .vh-forum-latest-posts i {
            color: #d4af37 !important;
        }
        .vh-forum-latest-threads {
            background: linear-gradient(135deg, #201b12 0%, #3a2f18 100%) !important;
        }
        .vh-forum-latest-threads,
        .vh-forum-latest-threads span.vh-forum-link,
        .vh-forum-latest-threads a.vh-forum-link {
            color: #f4e4b0 !important;
        }
        .vh-forum-latest-threads .v-list,
        .vh-forum-latest-threads .v-card-text {
            background: transparent !important;
        }
        .vh-forum-latest-threads i {
            color: #d4af37 !important;
        }
        .vh-forum-statistics {
            background: linear-gradient(135deg, #1a1811 0%, #262014 100%) !important;
        }
        .vh-forum-statistics, .vh-forum-statistics i {
            color: #d4af37 !important;
        }
        .vh-cart-categories, .vh-cart-categories h2, .vh-cart-categories hr {
            background-color: #16130e !important;
            color: #f4e4b0 !important;
            border-color: #d4af37 !important;
        }
        .vh-cart-categories a.v-card, .vh-cart-categories h3 {
            background-color: #24201a !important;
            color: #f4e4b0 !important;
        }
        .vh-cart-recommended-packets-cart, .vh-cart-recommended-packets-cart h2 {
            background: linear-gradient(135deg, #201b12 0%, #3a2f18 100%) !important;
            color: #f4e4b0 !important;
        }
        .vh-cart-recommended-packets-cart .v-btn--icon {
            color: #d4af37 !important;
        }
        .vh-cart-category, .vh-cart-category h2, .vh-cart-category hr, .vh-cart-category a.v-card, .vh-cart-category div.v-tab:not(.v-tab--active), vh-cart-category button.v-btn {
            background-color: #16130e !important;
            color: #f4e4b0 !important;
            border-color: #d4af37 !important;
        }
        .vh-cart-category div.v-card, .vh-cart-category h6, .vh-cart-category div.text-subtitle-2 {
            color: #f4e4b0 !important;
            background-color: #24201a !important;
        }
    `,
    },
    shop_settings: {
      donation_goal_enabled: true,
      top_donators_enabled: true,
      last_donators_enabled: true,
    },
  },
}

export default goldDarkFull
