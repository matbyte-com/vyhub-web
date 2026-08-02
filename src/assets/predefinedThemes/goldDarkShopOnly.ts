const goldDarkShopOnly = {
  name: 'Dark Gold',
  description: 'A sleek dark theme accented with warm gold gradients, tailored for the shop-only mode for a premium, modern feel.',
  type: 'shop_only',
  preview_img: 'https://cdn.vyhub.net/vyhub/themes/shoponlydarkgold.png',
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
        .v-main {
            background-color: #141210 !important;
            background-image:
                url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='80'%20height='80'%20viewBox='0%200%2080%2080'%3E%3Cpath%20d='M40%200%20L80%2040%20L40%2080%20L0%2040%20Z'%20fill='none'%20stroke='%23d4af37'%20stroke-opacity='0.07'/%3E%3Ccircle%20cx='40'%20cy='40'%20r='1.4'%20fill='%23e5c76b'%20fill-opacity='0.10'/%3E%3C/svg%3E"),
                radial-gradient(ellipse at 20% -10%, rgba(212, 175, 55, 0.14) 0%, rgba(212, 175, 55, 0) 45%),
                radial-gradient(ellipse at 85% 5%, rgba(229, 199, 107, 0.09) 0%, rgba(229, 199, 107, 0) 42%),
                linear-gradient(160deg, #1f1b12 0%, #14110c 45%, #0b0a08 100%) !important;
            background-repeat: repeat, no-repeat, no-repeat, no-repeat !important;
            background-size: 80px 80px, auto, auto, auto !important;
            background-attachment: fixed !important;
        }
        .vh-packet-card-text, .v-btn--outlined {
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
        .button-active {
            background-color: #24201a !important;
            border-radius: 4px !important;
            padding: 2px 10px !important;
        }
    `,
    },
    shop_settings: {
      donation_goal_enabled: false,
      top_donators_enabled: false,
      last_donators_enabled: false,
    },
  },
}

export default goldDarkShopOnly
