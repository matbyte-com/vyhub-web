<template>
  <v-app-bar app color="primary" dark>
    <!-- burger menu on the left-->
    <div class="hidden-sm-and-up">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon v-on="on" v-bind="attrs"></v-app-bar-nav-icon>
        </template>
        <v-list dense>
          <v-list-item v-for="(link, index) in links" :key="index">
            <v-icon left>{{ link.icon }}</v-icon>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item>
          <v-divider />
          <v-list-item v-for="(dropdown, index) in dropdowns" :key="index">
            <v-icon left>{{ dropdown.icon }}</v-icon>
            <v-list-item-title>{{ dropdown.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <!-- Logo -->
    <div class="d-flex align-center pr-5">
      <v-img alt="Vuetify Logo" class="shrink mr-2" contain src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40"/>
      <v-toolbar-title>NyX</v-toolbar-title>
    </div>

    <!-- navigation links-->
    <div class="hidden-xs-only">
      <v-menu open-on-hover offset-y v-for="(link, index) in links" :key="index">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" class="ml-3" depressed dark v-bind="attrs" v-on="on">
            <v-icon left>{{ link.icon }}</v-icon>
            <span>{{ link.title }}</span>
          </v-btn>
        </template>
        <v-list dense v-if="link.tabs.length > 0">
          <v-list-item v-for="(tab, index) in link.tabs" :key="index">
            <v-list-item-title>
              <v-icon left>{{ tab.icon }}</v-icon>
              <span>{{ tab.title }}</span>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <!-- profile icon with dropdown-->
    <v-spacer></v-spacer>
    <div class="hidden-xs-only">
      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon left>mdi-account-circle</v-icon>
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
        {
          title: 'Dashboard', icon: 'mdi-home', link: '/home', tabs: [{ title: 'Edit', icon: 'mdi-home-edit-outline', link: '/home' }],
        },
        {
          title: 'Announcements', icon: 'mdi-exclamation-thick', link: '/announcement', tabs: [],
        },
        {
          title: 'Bans', icon: 'mdi-account-cancel', tabs: [],
        },
      ],
    };
  },
};
</script>
