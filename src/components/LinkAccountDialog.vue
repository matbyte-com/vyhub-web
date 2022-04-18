<template>
  <div>
    <Dialog v-model="dialog" :max-width="400" icon="mdi-account-plus" :title="$t('link_account')"
            >
      <v-list tile v-if="backends != null">
        <v-list-item v-for="backend in backends" :key="backend.id"
                     @click="startAuth(backend)" :data-cy="backend.id">
          <v-list-item-icon>
            <v-icon> {{ getIcon(backend.name) }} </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t(`_user.type.${backend.name}.name`) }}</v-list-item-title>
            <div class="grey--text">
              {{ $t(`_user.type.${backend.name}.info`) }}
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div v-else class="text-center mt-5">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </Dialog>
    <Dialog v-model="authReqDialog" icon="mdi-account-key" :title="authDialogType"
            @cancel="authDialogType = null">
      <div class="text-center mt-2">
        <div class="font-weight-bold">
          {{ $t('_user.labels.authRequestDescription', { type: authDialogType }) }}
        </div>
        <div v-if="authCommand != null" class="mt-2">
          <v-text-field readonly :value="authCommand"
                        @focus="$event.target.select()"
          >
          </v-text-field>
        </div>
        <div v-else class="mt-2">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService';
import Dialog from '@/components/Dialog.vue';
import UserService from '@/services/UserService';
import openapi from '@/api/openapi';
import EventBus from '@/services/EventBus';

export default {
  name: 'Login.vue',
  components: { Dialog },
  data() {
    return {
      dialog: null,
      backends: null,
      authDialogType: null,
      authCommand: null,
      authRequest: null,
      intervalId: null,
    };
  },
  watch: {
    $route(to) {
      this.dialog = to.query.login === 'true';
    },
    dialog() {
      if (this.dialog === false) {
        this.$router.replace(this.$route.path);
      } else {
        this.fetchBackends();
      }
    },
    authReqDialog() {
      if (this.authReqDialog === false) {
        if (this.intervalId != null) {
          clearInterval(this.intervalId);
          this.intervalId = null;
        }

        this.authRequest = null;
      }
    },
  },
  computed: {
    authReqDialog: {
      get() {
        return this.authDialogType != null;
      },
      set(newValue) {
        if (!newValue) {
          this.authDialogType = null;
        }
      },
    },
  },
  beforeMount() {
    EventBus.on('social_config_edited', this.fetchBackends);
  },
  methods: {
    show() {
      this.dialog = true;
    },
    async fetchBackends() {
      (await openapi).auth_getAuthBackends().then((rsp) => {
        this.backends = rsp.data;
      });
    },
    redirectToSocial(backend) {
      window.location.href = AuthService.getSocialAuthUrl(
        backend.id,
        this.$route.query.return_url,
        (this.authRequest != null ? this.authRequest.id : null),
      );
    },
    async startSocial(backend) {
      if (this.$store.getters.isLoggedIn) {
        (await openapi).auth_prepareSocial().then(() => {
          this.redirectToSocial(backend);
        });
      } else {
        this.redirectToSocial(backend);
      }
    },
    async startAuthRequest(backend) {
      this.authDialogType = backend.type;

      const api = (await openapi);

      api.auth_createAuthRequest(null, { user_type: backend.type }).then((rsp) => {
        this.authRequest = rsp.data;

        if (!this.authRequest.valid) {
          this.cancelAuthRequest();
          console.log('New auth request is invalid.');
        }

        this.authCommand = AuthService.authRequestCommands[backend.type].replace(
          '{uuid}',
          this.authRequest.id,
        );

        let errCount = 0;
        this.intervalId = setInterval(() => {
          api.auth_getAuthRequest({ uuid: this.authRequest.id }).then((rsp2) => {
            this.authRequest = rsp2.data;
            errCount = 0;

            if (!this.authRequest.valid) {
              this.cancelAuthRequest();
              console.log('Auth request became invalid.');
            } else if (this.authRequest.valid && this.authRequest.confirmed) {
              this.startSocial(backend);
            }
          }).catch(() => {
            errCount += 1;

            if (errCount > 3) {
              this.cancelAuthRequest();
            }
          });
        }, 5000);
      });
    },
    cancelAuthRequest() {
      this.authDialogType = null;
      console.log('Auth request status cancelled.');
    },
    async startAuth(backend) {
      if (backend.auth_request) {
        await this.startAuthRequest(backend);
      } else {
        await this.startSocial(backend);
      }
    },
    getIcon(type) {
      return UserService.userTypeIcons[type];
    },
  },
};
</script>

<style scoped>

</style>
