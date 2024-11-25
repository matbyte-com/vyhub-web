const vyhubLightFull = {
  name: 'Dark Ocean',
  description: 'A sleek theme with deep blue tones, soft accents, and a light header for clarity.',
  type: 'full_management',
  preview_img: 'https://cdn.vyhub.net/vyhub/themes/blue-light-full.png',
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
      dark: false,
      image: null,
      primary: '#1565c0', // A rich, deep blue for the primary color
      secondary: '#42a5f5', // A lighter blue for accent and harmony
      header: '#ffffff', // Bright white header for contrast
      light_header: true, // Matches light background
      header_container: true,
      footer: '#0d47a1', // A darker blue for footer consistency
      background: '#f3f6fb', // Soft off-white for a clean, subtle look
      show_community_name: true, // Promotes branding
      custom_css: `

        .vh-news-donation-goal, .vh-news-donation-goal i, .vh-news-donation-goal a.v-btn {
            background-color: #0d47a1 !important; /* Darker blue for emphasis */
            color: #ffffff !important;
        }
        .vh-packet-card-text, .v-btn--outlined {
            color: #1565c0 !important; /* Matches primary color */
        }
        .vh-news-top-donators, .vh-news-top-donators i, .vh-news-top-donators a.v-btn {
            background-color: #1976d2 !important; /* Slightly lighter blue */
            color: #ffffff !important;
        }
        .vh-new-users, .vh-new-users i, .vh-new-users div.v-card {
            background-color: #e3f2fd !important; /* Pale blue for a soft, welcoming tone */
        }
        .vh-cart-recommended-packets, .vh-cart-recommended-packets h2 {
            background-color: #2c4164 !important;
            color: #ffffff !important;
        }
        .vh-cart-categories, .vh-cart-categories h2, .vh-cart-categories hr {
            background-color: #e3f2fd !important; /* Deep navy blue for depth */
        }
        .vh-cart-recommended-packets-cart, .vh-cart-recommended-packets-cart h2 {
            background-color: #2c4164 !important;
            color: #ffffff !important;
        }
        .vh-cart-recommended-packets-cart .v-btn--icon {
            color: #42a5f5 !important; /* Matches secondary accent color */
        }
        .vh-cart-category, .vh-cart-category h2, .vh-cart-category hr, .vh-cart-category a.v-card, .vh-cart-category div.v-tab:not(.v-tab--active), vh-cart-category button.v-btn {
            background-color: #1e3a56 !important;
            color: #ffffff !important;
            border-color: #90caf9 !important;
        }
        .vh-cart-category div.v-card, .vh-cart-category h6, .vh-cart-category div.text-subtitle-2 {
            color: #ffffff !important;
            background-color: #2c4164 !important;
        }
        .vh-forum-latest-posts, .vh-forum-latest-posts .v-list, .vh-forum-latest-posts a.v-btn, .vh-forum-latest-posts span.vh-forum-link, .vh-forum-latest-posts a.vh-forum-link {
            background-color: #0d47a1 !important; /* Consistent with footer */
            color: #ffffff !important;
        }
        .vh-forum-latest-posts i {
            color: #ffffff !important;
        }
        .vh-forum-latest-threads, .vh-forum-latest-threads .v-list, .vh-forum-latest-threads a.v-btn, .vh-forum-latest-threads span.vh-forum-link, .vh-forum-latest-threads a.vh-forum-link {
            background-color: #1976d2 !important; /* Lighter blue for slight variation */
            color: #ffffff !important;
        }
        .vh-forum-latest-threads i {
            color: #ffffff !important;
        }
        .vh-forum-statistics, .vh-forum-statistics i {
            background-color: #e3f2fd !important; /* Pale blue to contrast with text */
            color: #1565c0 !important; /* Matches primary color */
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
