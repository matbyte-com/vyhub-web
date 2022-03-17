<template>
  <div>
    <Dialog v-model="dialog" :max-width="400" icon="mdi-account-plus" :title="$t('link_account')"
            >
      <v-list tile>
        <v-list-item v-for="backend in backends" :key="backend.id"
                     @click="startAuth(backend.id)" :data-cy="backend.id">
          <v-list-item-icon>
            <v-icon> {{ backend.icon }} </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t(`_user.type.${backend.name}.name`) }}</v-list-item-title>
            <div class="grey--text">
              {{ $t(`_user.type.${backend.name}.info`) }}
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </Dialog>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService';
import Dialog from '@/components/Dialog.vue';
import UserService from '@/services/UserService';
import openapi from '@/api/openapi';

export default {
  name: 'Login.vue',
  components: { Dialog },
  data() {
    return {
      dialog: null,
      backends: [
        {
          id: 'vyhub_central',
          name: 'CENTRAL',
          icon: UserService.userTypeIcons.CENTRAL,
        },
        {
          id: 'steam',
          name: 'STEAM',
          icon: UserService.userTypeIcons.STEAM,
        },
        {
          id: 'discord',
          name: 'DISCORD',
          icon: UserService.userTypeIcons.DISCORD,
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
    async startAuth(backend) {
      if (this.$store.getters.isLoggedIn) {
        (await openapi).auth_prepareSocial().then(() => {
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
