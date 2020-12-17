<template>
  <v-app-bar dense app color="primary" dark>
    <div class="hidden-sm-and-up">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon v-on="on" v-bind="attrs"></v-app-bar-nav-icon>
        </template>
        <v-list>
          <v-list-item v-for="(link, index) in links" :key="index">
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <div class="d-flex align-center pr-5">
      <v-img alt="Vuetify Logo" class="shrink mr-2" contain src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40"/>
      <span class="display-1">NyX</span>
    </div>

    <v-toolbar-items class="hidden-xs-only">
      <v-btn color="primary" small class="darken-1 ml-3" v-for="link in links" :key="link" dark>
        {{ link.title }}
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn fab color="primary" small class="darken-1" dark v-bind="attrs" v-on="on">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(dropdown, index) in dropdowns" :key="index">
          <v-list-item-title>{{ dropdown.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      dropdowns: [
        { title: 'Profil' },
        { title: 'Einstellungen' },
        { title: 'Logout' },
      ],
      links: [
        { title: 'Dashboard' },
        { title: 'Announcements' },
        { title: 'Bans' },
      ],
    };
  },
};
</script>
