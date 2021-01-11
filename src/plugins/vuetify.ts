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
} from 'vuetify/lib';

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

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#9652ff',
        secondary: '#00d8ff',
        accent: '#3cd1c2',
      },
    },
  },
});
