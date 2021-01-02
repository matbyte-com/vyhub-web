<template>
  <div>
    <h1 class="display-2"> dark mode switch</h1>
    <v-switch v-model="$vuetify.theme.dark" />
    <v-card class="my-2"
            :disabled="$vuetify.theme.themes.name === theme.name"
            @click="setTheme(theme)"
            hover
            outlined
            v-for="(theme, index) in themes"
            :key="index"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            {{ theme.name }}</v-list-item-title
          >
        </v-list-item-content>
        <v-list-item-action>
          <v-avatar
            color="success"
            size="30"
            v-if="$vuetify.theme.themes.name === theme.name"
          >
            <v-icon>mdi-check</v-icon>
          </v-avatar>
        </v-list-item-action>
      </v-list-item>
      <div class="my-2">
        <v-chip
          class="mx-1"
          label
          :color="theme.dark[key]"
          v-for="(key, index) in Object.keys(theme.dark)"
          :key="index"
        >
          {{ key }}</v-chip
        >
      </div>
      <div class="my-2">
        <v-chip
          class="mx-1"
          label
          :color="theme.light[key]"
          v-for="(key, index) in Object.keys(theme.light)"
          :key="index"
        >
          {{ key }}</v-chip
        >
      </div>
    </v-card>
    <GenForm :form-schema="formSchema" :form-model="formModel" @submit="setThemeColors"
             :error-message="errorMessage" cancel-text="Cancel" submit-text="Submit"
             ref="themePicker"
            @cancel="setThemeColors"/>
  </div>
</template>

<script>
import GenForm from '@/components/GenForm.vue';
import ThemePickerSchema from '@/forms/ThemePicker';

export default {
  name: 'ThemeChanger.vue',
  components: {
    GenForm,
  },
  data() {
    return {
      formSchema: ThemePickerSchema,
      formModel: {},
      errorMessage: null,
      themes: [
        {
          name: 'Theme 1',
          dark: {
            primary: '#21CFF3',
            accent: '#FF4081',
            secondary: '#21dc79',
            success: '#86af3f',
            info: '#f34fc6',
            warning: '#FB8C00',
            error: '#FF5252',
          },
          light: {
            primary: '#22daff',
            accent: '#ff6b99',
            secondary: '#26ff8c',
            success: '#a5d64c',
            info: '#ff53d0',
            warning: '#ff8e00',
            error: '#ff5252',
          },
        },
        {
          name: 'Theme 2',
          dark: {
            primary: '#E65100',
            accent: '#7CB342',
            secondary: '#689F38',
            success: '#4CAF50',
            info: '#6156d8',
            warning: '#1565C0',
            error: '#FF7043',
          },
          light: {
            primary: '#ffa450',
            accent: '#a1e754',
            secondary: '#92de4e',
            success: '#6dff74',
            info: '#7365ff',
            warning: '#2e8ac0',
            error: '#ff5e3c',
          },
        },
      ],
    };
  },
  methods: {
    setTheme(theme) {
      // close menu
      this.menu = false;
      const { name } = theme;
      const { dark } = theme;
      const { light } = theme;
      // set themes
      Object.keys(dark).forEach((i) => {
        this.$vuetify.theme.themes.dark[i] = dark[i];
      });
      Object.keys(light).forEach((i) => {
        this.$vuetify.theme.themes.light[i] = light[i];
      });
      // also save theme name to disable selection
      this.$vuetify.theme.themes.name = name;
    },
    setThemeColors() {
      console.log(`emitted color ${this.formModel.primary}`);
      this.$vuetify.theme.themes.light.primary = this.formModel.primary.substr(0, 7);
    },
  },
};
</script>
