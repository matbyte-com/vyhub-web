<template>
  <div>
    <Dialog v-model="dialog" :max-width="400" icon="mdi-account-plus" :title="$t('link_account')"
            >
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
    </Dialog>
  </div>
</template>

<script>
import api from '@/api/api';
import AuthService from '@/services/AuthService';
import Dialog from '@/components/Dialog.vue';

export default {
  name: 'Login.vue',
  components: { Dialog },
  data() {
    return {
      dialog: null,
      backends: [
        {
          id: 'nyx_central',
          name: 'Central',
          icon: 'mdi-image-filter-center-focus-strong',
          info: 'Link multiple accounts, get a personal dashboard url and more.',
        },
        {
          id: 'steam',
          name: 'Steam',
          icon: 'mdi-steam',
        },
      ], // TODO: Fetch backends from API
    };
  },
  watch: {
    $route(to) {
      this.dialog = to.query.login === 'true';
    },
    dialog() {
      if (this.dialog === false) {
        this.$router.replace(this.$route.path);
      }
    },
  },
  methods: {
    show() {
      this.dialog = true;
    },
    redirectToSocial(backend) {
      window.location.href = AuthService.getSocialAuthUrl(backend, this.$route.query.return_url);
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
