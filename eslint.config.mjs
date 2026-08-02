import globals from "globals";
import pluginVue from 'eslint-plugin-vue';

export default [
    ...pluginVue.configs["flat/essential"],
    ...pluginVue.configs["flat/recommended"],
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

            // Page views and thin wrapper/icon components intentionally use
            // single-word names throughout this project.
            "vue/multi-word-component-names": "off",

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
