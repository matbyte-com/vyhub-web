import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import {createVuetify} from "vuetify";
import { mdi } from 'vuetify/iconsets/mdi';
import {customSVGs} from "./customSvgs";
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        primary: '#9652ff',
        secondary: '#00d8ff',
        accent: '#3cd1c2',
        background: '#FAFAFA',
      },
    },
    variations: {
      colors: ['primary', 'secondary', 'warning', 'success', 'error', 'header', 'footer', 'background'],
      lighten: 5,  // Allow up to 5 lighten variants (e.g., primary-lighten-1, primary-lighten-2)
      darken: 5,   // Allow up to 5 darken variants (e.g., primary-darken-1, primary-darken-2)
    }
  },
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi,
      custom: customSVGs,
    }
  },
  defaults: {
    VjsfSwitch: {
      VSwitch: {
        color: "primary"
      }
    },
    VjsfTextField: {
      VTextField: {
        variant: "underlined"
      }
    },
    VjsfAutocomplete: {
      VAutocomplete: {
        variant: "underlined"
      }
    },
    VjsfSelect: {
      VSelect: {
        variant: "underlined"
      }
    },
    VjsfNumberField: {
      VTextField: {
        variant: "underlined"
      }
    },
    VjsfOneOfSelect: {
      VSelect: {
        variant: "underlined"
      }
    }
  }
})

export default vuetify;
