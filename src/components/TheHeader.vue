<template>
  <v-app-bar app color="primary" dark>
    <!-- burger menu on the left-->
    <div class="hidden-sm-and-up">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon v-on="on" v-bind="attrs"></v-app-bar-nav-icon>
        </template>
        <v-list dense>
          <!-- render tabs-->
          <v-menu offset-x v-for="(link, index) in links" :key="index">
            <template v-slot:activator="{ on, attrs }">
              <v-list-item v-on="on" v-bind="attrs">
                <v-icon left>{{ link.icon }}</v-icon>
                <v-list-item-title>{{ link.title }}</v-list-item-title>
              </v-list-item>
            </template>
            <v-list dense v-if="link.tabs.length > 0">
              <v-list-item v-for="(tab, index) in link.tabs" :key="index">
                <v-icon left>{{ tab.icon }}</v-icon>
                <v-list-item-title>{{ tab.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-divider />
          <!-- render subtabs-->
          <v-menu dense offset-x v-for="(dropdown, index) in dropdowns" :key="index">
            <template v-slot:activator="{ on, attrs }">
              <v-list-item v-on="on" v-bind="attrs">
                <v-icon left>{{ dropdown.icon }}</v-icon>
                <v-list-item-title>{{ dropdown.title }}</v-list-item-title>
              </v-list-item>
            </template>
            <v-list dense v-if="dropdown.tabs.length > 0">
              <v-list-item v-for="(tab, index) in dropdown.tabs" :key="index">
                <v-icon left>{{ tab.icon }}</v-icon>
                <v-list-item-title>{{ tab.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
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

    <v-spacer></v-spacer>
    <!-- profile icon with dropdown-->
    <div class="hidden-xs-only">
      <ProfileMenu v-if="$store.getters.isLoggedIn"/>
      <Login v-else />
    </div>
  </v-app-bar>
</template>

<script>
import Login from '@/components/HeaderComponents/Login.vue';
import ProfileMenu from '@/components/HeaderComponents/ProfileMenu.vue';

export default {
  components: {
    Login,
    ProfileMenu,
  },
  data() {
    return {
      links: [
        {
          title: 'Dashboard', icon: 'mdi-home', link: '/home', tabs: [{ title: 'Edit', icon: 'mdi-home-edit-outline', link: '/home' }, { title: 'Edit', icon: 'mdi-home-edit-outline', link: '/home' }],
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
