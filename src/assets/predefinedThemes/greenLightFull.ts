const vyhubLightFull = {
  name: 'Verdant Harmony',
  description: 'Inspired by nature, this theme blends deep greens with light tones for a refreshing and modern aesthetic.',
  type: 'full_management',
  preview_img: 'https://cdn.vyhub.net/vyhub/themes/green-light-full.png',
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
      primary: '#4caf50', // A calm green shade for a fresh feel
      secondary: '#81c784', // A lighter green accent for a harmonious touch
      header: '#222831', // A dark, sleek header
      light_header: false, // Keeps the header subtle and modern
      header_container: true,
      footer: '#1b262c', // Deep dark footer for consistency
      background: '#f8f9fa', // Light, neutral background for readability
      show_community_name: true, // Enables community name for brand visibility
      custom_css: `
        .vh-news-donation-goal, .vh-news-donation-goal i, .vh-news-donation-goal a.v-btn {
            background-color: #00796b !important; /* Teal for a modern look */
            color: #ffffff !important;
        }
        .vh-packet-card-text, .v-btn--outlined {
            color: #4caf50 !important; /* Matches primary color */
        }
        .vh-news-top-donators, .vh-news-top-donators i, .vh-news-top-donators a.v-btn {
            background-color: #388e3c !important; /* A darker green for differentiation */
            color: #ffffff !important;
        }
        .vh-new-users, .vh-new-users i, .vh-new-users div.v-card {
            background-color: #e0f2f1 !important; /* Soft mint green for a welcoming vibe */
        }
        .vh-cart-categories, .vh-cart-categories h2, .vh-cart-categories hr {
            background-color: #263238 !important; /* Deep charcoal */
            color: #ffffff !important;
            border-color: #546e7a !important; /* Bluish-gray */
        }
        .vh-cart-categories a.v-card, .vh-cart-categories h3 {
            background-color: #37474f !important; /* Mid charcoal for depth */
            color: #ffffff !important;
        }
        .vh-cart-recommended-packets-cart, .vh-cart-recommended-packets h2 {
            background-color: #37474f !important;
            color: #ffffff !important;
        }
        .vh-cart-recommended-packets-cart .v-btn--icon {
            color: #81c784 !important; /* Secondary green accent */
        }
        .vh-cart-category, .vh-cart-category h2, .vh-cart-category hr, .vh-cart-category a.v-card, .vh-cart-category div.v-tab:not(.v-tab--active), vh-cart-category button.v-btn {
            background-color: #263238 !important;
            color: #ffffff !important;
            border-color: #546e7a !important;
        }
        .vh-cart-category div.v-card, .vh-cart-category h6, .vh-cart-category div.text-subtitle-2 {
            color: #ffffff !important;
            background-color: #37474f !important;
        }
        .vh-forum-latest-posts, .vh-forum-latest-posts .v-list, .vh-forum-latest-posts a.v-btn, .vh-forum-latest-posts span.vh-forum-link, .vh-forum-latest-posts a.vh-forum-link {
            background-color: #00796b !important; /* Consistent teal */
            color: #ffffff !important;
        }
        .vh-forum-latest-posts i {
            color: #ffffff !important;
        }
        .vh-forum-latest-threads, .vh-forum-latest-threads .v-list, .vh-forum-latest-threads a.v-btn, .vh-forum-latest-threads span.vh-forum-link, .vh-forum-latest-threads a.vh-forum-link {
            background-color: #388e3c !important; /* Matches top-donator color */
            color: #ffffff !important;
        }
        .vh-forum-latest-threads i {
            color: #ffffff !important;
        }
        .vh-forum-statistics, .vh-forum-statistics i {
            background-color: #e0f7fa !important; /* Soft blue-green */
            color: #004d40 !important; /* Dark teal for contrast */
        }
    `
    },
    shop_settings: {
      donation_goal_enabled: true,
      top_donators_enabled: true,
      last_donators_enabled: true,
    },
  }
}

export default vyhubLightFull
