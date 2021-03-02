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
              <v-btn @click="startAuth(backend.id)">{{ backend.name }}</v-btn>
            </v-col>
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
    startAuth(backend) {
      api.user.prepareSocialAuth().then(() => {
        window.location.href = AuthService.getSocialAuthUrl(backend);
      }).catch(() => {
        // TODO: Error handling
      });
    },
  },
};
</script>

<style scoped>

</style>
