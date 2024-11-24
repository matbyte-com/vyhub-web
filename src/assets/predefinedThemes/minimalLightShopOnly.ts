const minimalLightFull = {
  name: 'Minimal',
  description: 'This is the minimal theme. It is minimal, you can add all options you want but that makes it easy to grow with the theme',
  type: 'shop_only',
  preview_img: 'https://picsum.photos/600/400',
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
      image: null,
      primary: '#000000',
      secondary: '#000000',
      header: '#000000',
      light_header: false,
      header_container: false,
      footer: '#000000',
      background: '#f0f0f0',
      show_community_name: false,
      custom_css: 'body { background-color: #f0f0f0; }',
      image: 'https://images.unsplash.com/photo-1688413708993-39da5ee59315?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // TODO Repalce with CDN
    },
    shop_settings: {
      donation_goal_enabled: false,
      top_donators_enabled: false,
      last_donators_enabled: false,
    },
  }
}

export default minimalLightFull
