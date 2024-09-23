import globals from "globals";
import pluginVue from 'eslint-plugin-vue';
import pluginVuetify from 'eslint-plugin-vuetify/lib/configs/flat/base.js';

export default [
    ...pluginVue.configs["flat/essential"],
    ...pluginVue.configs["flat/recommended"],
    pluginVuetify,
    {
        languageOptions: {
            globals: {
                ...globals.node,
            },

            ecmaVersion: 2020,
        },

        rules: {
            "@typescript-eslint/explicit-module-boundary-types": "off",
            camelcase: "off",
            "@typescript-eslint/ban-types": "off",

            "vue/valid-v-slot": ["error", {
                allowModifiers: true,
            }],
        },
    },
    {
        files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],

        languageOptions: {
            globals: {
                ...globals.mocha,
            },
        },
    },
];
