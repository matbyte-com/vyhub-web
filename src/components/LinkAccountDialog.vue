<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="400px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ $t("link_account") }}</span>
          </v-card-title>
          <v-card-text>
            <v-col v-for="backend in backends" :key="backend.id">
              <form :action="`${socialBaseURL}/${backend.id}/start`" method="POST">
                <input type="hidden" name="authorization" :value="`Bearer ${$store.getters.token}`">
                <v-btn @click="startAuth">{{ backend.name }}</v-btn>
              </form>
            </v-col>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import api from '@/api/api';

export default {
  name: 'Login.vue',
  data() {
    return {
      dialog: null,
      socialBaseURL: `${process.env.VUE_APP_BACKEND_CUSTOMER_URL}/auth/social`,
      backends: [
        {
          id: 'steam',
          name: 'Steam',
        },
      ], // TODO: Fetch backends from API
    };
  },
  methods: {
    show() {
      this.dialog = true;
    },
    startAuth() {
      api.user.prepareSocialAuth().then(() => {
        window.location.href = `${process.env.VUE_APP_BACKEND_CUSTOMER_URL}/auth/social/steam/start`;
      }).catch(() => {
        // TODO: Error handling
      });
    },
  },
};
</script>

<style scoped>

</style>
