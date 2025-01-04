const greenDarkShopOnly = {
  name: 'Dark Green',
  description: 'A clean, dark green, minimal theme designed for the shop-only mode. Start simple and effortlessly expand the theme as your needs grow.',
  type: 'shop_only',
  preview_img: 'https://cdn.vyhub.net/vyhub/themes/dark-green-shop-only.webp',
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
      image: "https://cdn.vyhub.net/vyhub/themes/dark-green-background.webp",
      dark: true,
      primary: '#4caf50',
      secondary: '#81c784',
      header: '#4caf50',
      light_header: false,
      header_container: true,
      footer: '#1b262c',
      background: '#373737',
      show_community_name: true,
      custom_css: '.button-active {background-color: white !important;border-radius: 3px !important;padding: 2px 4px !important;}'
    },
    shop_settings: {
      donation_goal_enabled: false,
      top_donators_enabled: false,
      last_donators_enabled: false,
    },
  }
}

export default greenDarkShopOnly
