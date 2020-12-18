<template>
  <v-app-bar app color="primary" dark>
    <div class="hidden-sm-and-up">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon v-on="on" v-bind="attrs"></v-app-bar-nav-icon>
        </template>
        <v-list>
          <v-list-item v-for="(link, index) in links" :key="index">
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item>
          <v-divider />
          <v-list-item v-for="(dropdown, index) in dropdowns" :key="index">
            <v-list-item-title>{{ dropdown.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <div class="d-flex align-center pr-5">
      <v-img alt="Vuetify Logo" class="shrink mr-2" contain src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40"/>
      <v-toolbar-title>NyX</v-toolbar-title>
    </div>

    <div class="hidden-xs-only">
      <v-btn color="primary" class="ml-3" depressed v-for="link in links" :key="link" dark>
        {{ link.title }}
      </v-btn>
    </div>

    <v-spacer></v-spacer>
    <div class="hidden-xs-only">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(dropdown, index) in dropdowns" :key="index">
            <v-list-item-title>{{ dropdown.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
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
