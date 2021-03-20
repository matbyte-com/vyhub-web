<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="400px">
        <v-card>
          <v-card-title class="grey lighten-3">
            <span>{{ $t("link_account") }}</span>
            <v-spacer />
            <v-icon @click="dialog = false">mdi-close</v-icon>
          </v-card-title>
          <v-card-text>
            <v-list tile>
              <v-list-item v-for="backend in backends" :key="backend.id"
                           @click="startAuth(backend.id)">
                <v-list-item-icon>
                  <v-icon> {{ backend.icon }} </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ backend.name }}</v-list-item-title>
                  <div class="grey--text" v-if="backend.info != null">
                    {{ backend.info }}
                  </div>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import api from '@/api/api';
import AuthService from '@/services/AuthService';

export default {
  name: 'Login.vue',
  data() {
    return {
      dialog: null,
      backends: [
        {
          id: 'nyx_central',
          name: 'Central',
          icon: 'mdi-image-filter-center-focus-strong',
          info: 'Link multiple accounts, make purchases and more.',
        },
        {
          id: 'steam',
          name: 'Steam',
          icon: 'mdi-steam',
        },
      ], // TODO: Fetch backends from API
    };
  },
  methods: {
    show() {
      this.dialog = true;
    },
    redirectToSocial(backend) {
      window.location.href = AuthService.getSocialAuthUrl(backend);
    },
    startAuth(backend) {
      if (this.$store.getters.isLoggedIn) {
        api.user.prepareSocialAuth().then(() => {
          this.redirectToSocial(backend);
        }).catch((err) => {
          console.log(err);
          // TODO: Error handling
        });
      } else {
        this.redirectToSocial(backend);
      }
    },
  },
};
</script>

<style scoped>

</style>
