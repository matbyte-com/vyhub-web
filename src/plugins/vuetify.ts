import Vue from 'vue';
import Vuetify from 'vuetify';
import {
  VTooltip,
  VIcon,
  VListItem,
  VAvatar,
  VFlex,
  VLayout,
  VSelect,
  VTextarea,
  VCheckbox,
  VColorPickerCanvas,
  VColorPicker,
  VSwitch,
  VSlider,
  VTimePicker,
  VDatePicker,
  VTabs,
  VStepper,
} from 'vuetify/lib';
import minifyTheme from 'minify-css-string';
import '@mdi/font/css/materialdesignicons.css';
import VyHubIcon from '@/components/Icons/VyHub.vue';
import TeamspeakIcon from '@/components/Icons/Teamspeak.vue';
import DiscordIcon from '@/components/Icons/Discord.vue';
import RustIcon from '@/components/Icons/Rust.vue';
import FiveMIcon from '@/components/Icons/FiveM.vue';
import GModIcon from '@/components/Icons/GMod.vue';
import SevenDaysIcon from '@/components/Icons/7Days.vue';
import AsaIcon from '@/components/Icons/Asa.vue';

Vue.use(Vuetify);

Vue.component('v-tooltip', VTooltip);
Vue.component('v-icon', VIcon);
Vue.component('v-list-item', VListItem);
Vue.component('v-avatar', VAvatar);
Vue.component('v-flex', VFlex);
Vue.component('v-layout', VLayout);
Vue.component('v-select', VSelect);
Vue.component('v-textarea', VTextarea);
Vue.component('v-checkbox', VCheckbox);
Vue.component('v-color-picker-canvas', VColorPickerCanvas);
Vue.component('v-color-picker', VColorPicker);
Vue.component('v-switch', VSwitch);
Vue.component('v-slider', VSlider);
Vue.component('v-date-picker', VDatePicker);
Vue.component('v-time-picker', VTimePicker);
Vue.component('v-tabs', VTabs);
Vue.component('v-stepper', VStepper);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
    values: {
      vyhub: {
        component: VyHubIcon,
      },
      teamspeak: {
        component: TeamspeakIcon,
      },
      discord: {
        component: DiscordIcon,
      },
      gmod: {
        component: GModIcon,
      },
      fivem: {
        component: FiveMIcon,
      },
      rust: {
        component: RustIcon,
      },
      sevenDays: {
        component: SevenDaysIcon,
      },
      asa: {
        component: AsaIcon,
      },
    },
  },
  theme: {
    options: {
      customProperties: true,
      minifyTheme,
    },
    themes: {
      light: {
        primary: '#9652ff',
        // primary: '#FAFAFA',
        secondary: '#00d8ff',
        accent: '#3cd1c2',
        background: '#FAFAFA',
      },
    },
  },
});
