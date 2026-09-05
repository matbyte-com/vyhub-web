import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import {createVuetify} from "vuetify";
import { mdi } from 'vuetify/iconsets/mdi';
import {customSVGs} from "./customSvgs";
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Whether the visitor's locale uses a 12-hour (am/pm) clock, so date/time inputs
// follow their system default instead of a hardcoded format.
const localeUses12h = new Intl.DateTimeFormat(navigator.language, { hour: 'numeric' })
  .resolvedOptions().hour12 ?? false;

const vuetify = createVuetify({
  components,
  directives,
  date: {
    // Format dates/times (e.g. vjsf time fields) using the visitor's locale so the
    // 12h/24h clock follows their system default instead of a hardcoded en-US.
    locale: {
      en: navigator.language || 'en-US',
    },
  },
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
    // Consistent, slightly softer corner radius across the main surfaces. Keeps
    // the existing look-and-feel but unifies the mix of 4px/10px/sharp corners
    // into one modern radius. Theme-agnostic: only affects geometry, not color.
    VCard: {
      rounded: 'lg',
    },
    VBtn: {
      rounded: 'lg',
    },
    VTextField: {
      rounded: 'lg',
    },
    VSelect: {
      rounded: 'lg',
    },
    VAutocomplete: {
      rounded: 'lg',
    },
    VTextarea: {
      rounded: 'lg',
    },
    VSheet: {
      rounded: 'lg',
    },
    VDialog: {
      VCard: {
        rounded: 'lg',
      },
    },
    VMenu: {
      openDelay: 100,
      rounded: 'lg',
    },
    // vjsf reads the time picker's clock format from the global VTimePicker default
    // (it ignores its own timePickerProps option), so set it here to follow the locale.
    VTimePicker: {
      format: localeUses12h ? 'ampm' : '24hr',
    },
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
