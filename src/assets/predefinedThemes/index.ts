import minimalLightFull from './minimalLightFull'
import minimalLightShopOnly from "./minimalLightShopOnly";
import vyhubLightFull from "./vyhubLightFull";
import greenDarkFull from "./greenDarkFull";
import blueLightFull from "./blueLightFull";
import vyhubLightShopOnly from "./vyhubLightShopOnly";

export default {
  themes: [
    minimalLightFull,
    vyhubLightFull,
    blueLightFull,
    greenDarkFull,
    minimalLightShopOnly,
    vyhubLightShopOnly
  ],
  allowedValues: {
    general: ['shop_only', 'enable_landingpage'],
    theme: ['dark', 'image', 'primary', 'secondary', 'header', 'light_header', 'header_container', 'footer', 'success', 'warning', 'error', 'background', 'logo', 'logo_width', 'show_community_name', 'custom_css'],
    shop_settings: ['credits_display_title', 'donation_goal_enabled', 'donation_goal_display_title', 'top_donators_enabled', 'top_donators_display_title', 'last_donators_enabled', 'last_donators_display_title', 'packet_list_view', 'show_widgets_on_shop_page']
  }
}
