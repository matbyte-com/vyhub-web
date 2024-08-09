<template>
  <div>
    <Dialog v-model="dialog" :max-width="400" icon="mdi-account-plus" :title="title"
            text-class="mb-0 pb-0" action-class="mt-0 pt-1">
      <v-card border type="info" dense v-if="$store.getters.isLoggedIn || $route.query.shop"
              class="mt-3 description-card">
        <v-card-text>
          <v-row no-gutters>
            <v-col cols="10">
              <span v-if="$store.getters.isLoggedIn">{{ $t('_user.userLinkDescription') }}</span>
              <span v-else>{{ $t('_user.userLoginShopDescription') }}</span>
            </v-col>
            <v-col class="d-flex align-center justify-end">
              <v-icon v-if="$store.getters.isLoggedIn" color="secondary" size="large">
                mdi-exclamation
              </v-icon>
              <v-icon v-else color="secondary" size="large">mdi-information-outline</v-icon>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-list tile v-if="backends != null" class="pb-0 mb-0">
        <v-list-item v-for="backend in availableBackends" :key="backend.id"
                     @click="startAuth(backend)" :data-cy="backend.id">
          <v-list-item-icon>
            <v-icon> {{ getIcon(backend.name) }} </v-icon>
          </v-list-item-icon>
          
            <v-list-item-title>{{ $t(`_user.type.${backend.name}.name`) }}</v-list-item-title>
            <div class="text-grey">
              {{ $t(`_user.type.${backend.name}.info`) }}
            </div>
          
        </v-list-item>
      </v-list>
      <div v-if="backends == null" class="text-center mt-5">
        <v-progress-circular
          indeterminate
          color="primary"/>
      </div>
      <v-divider class="mt-1" v-if="!$route.query.shop"/>
      <template v-slot:actions>
        <v-list class="pa-0 mt-0 ml-2 mr-2" style="width: 100%" density="compact" v-if="!$route.query.shop">
          <v-list-item @click="startAuth(backends.find((b) => b.type === 'CENTRAL'))">
            <v-list-item-icon>
              <v-icon>{{ getIcon('CENTRAL') }}</v-icon>
            </v-list-item-icon>
            
              <v-list-item-title>{{ $t(`_user.type.CENTRAL.name`) }}</v-list-item-title>
            
          </v-list-item>
        </v-list>
      </template>
    </Dialog>
    <Dialog v-model="authReqDialog" icon="mdi-account-key" :title="authDialogType"
            @cancel="authDialogType = null">
      <div class="text-center mt-2">
        <div class="font-weight-bold">
          {{ $t('_user.labels.authRequestDescription', { type: authDialogType }) }}
        </div>
        <div v-if="authCommand != null" class="mt-2">
          <v-text-field readonly :model-value="authCommand"
                        @focus="$event.target.select()" />
        </div>
        <div v-else class="mt-2">
          <v-progress-circular indeterminate color="primary" />
        </div>
        <div v-if="authDialogType === 'MINECRAFT'">
          <!-- Minecraft Instructional Video -->
          <video width="500" height="280" style="border-radius: 10px"
                 autoplay playsinline loop src="https://cdn.vyhub.net/vyhub/minecraft-login.mp4" />
        </div>
      </div>
    </Dialog>
    <ConfirmationDialog :persistent="true"
                        :width="600" ref="linkUsersDialog" text="-" :btn-text="$t('confirm')"
                        @submit="confirmLink" @cancel="cancelLink" btn-color="success">
      <div v-if="userToLink && $store.getters.isLoggedIn">
        <div class="text-center my-5">
          {{  $t('_user.messages.linkAccountConfirm') }}
        </div>
        <v-card class="mt-6 card-rounded" border>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6" class="text-center">
                <v-avatar>
                  <v-img :src="$store.getters.user.avatar" contain
                         alt="avatar"/>
                </v-avatar>
                <br/>
                {{ $store.getters.user.username }}
                <br/>
                {{ $store.getters.user.type }}
              </v-col>
              <v-col cols="12" md="6" class="text-center">
                <v-avatar>
                  <v-img :src="userToLink.avatar" contain
                         alt="avatar"/>
                </v-avatar>
                <br/>
                {{ userToLink.username }}
                <br/>
                {{ userToLink.type }}
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
    </ConfirmationDialog>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService';
import Dialog from '@/components/Dialog.vue';
import UserService from '@/services/UserService';
import openapi from '@/api/openapi';
import EventBus from '@/services/EventBus';
import axios from 'axios';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';

export default {
  name: 'Login.vue',
  components: { ConfirmationDialog, Dialog },
  data() {
    return {
      dialog: null,
      backends: null,
      authDialogType: null,
      authCommand: null,
      authRequest: null,
      intervalId: null,
      userToLink: null,
      userToLinkAccessToken: null,
    };
  },
  watch: {
    $route(to) {
      this.dialog = to.query.login === 'true';

      if (this.$route.query.link_refresh_token != null && this.$store.getters.isLoggedIn) {
        this.fetchUserToLink(this.$route.query.link_refresh_token).then((userToLink) => {
          if (userToLink != null) {
            delete this.$route.query.link_refresh_token;
            this.$refs.linkUsersDialog.show();
          } else {
            this.$notify({
              title: this.$t('_user.messages.couldNotLinkUsers'),
              type: 'error',
            });
          }
        }).catch(() => {
          this.$notify({
            title: this.$t('_user.messages.couldNotLinkUsers'),
            type: 'error',
          });
        });
      }
    },
    dialog() {
      if (this.dialog === false) {
        const query = { ...this.$route.query };
        delete query.login;
        delete query.link_refresh_token;
        this.$router.replace({ path: this.$route.path, query });
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
    title() {
      if (this.$store.getters.isLoggedIn) {
        return this.$t('link_account');
      }
      return this.$t('_header.labels.login');
    },
    availableBackends() {
      if (this.backends == null) {
        return [];
      }
      return this.backends.filter((b) => b.name !== 'CENTRAL');
    },
  },
  beforeMount() {
    EventBus.on('social_config_edited', this.fetchBackends);
  },
  methods: {
    async fetchUserToLink(refresh_token) {
      const { access_token } = await AuthService.getToken(refresh_token);

      const api = await openapi;

      const otherUser = (await api.user_getCurrentUser(null, null, { headers: { Authorization: `Bearer ${access_token}` } })).data;

      this.userToLinkAccessToken = access_token;

      if (otherUser && !this.$checkLinked(otherUser, this.$store.getters.user)) {
        this.userToLink = otherUser;
      }

      return this.userToLink;
    },
    show() {
      this.dialog = true;
    },
    async fetchBackends() {
      (await openapi).auth_getAuthBackends().then((rsp) => {
        this.backends = rsp.data;
      });
    },
    redirectToSocial(backend) {
      const url = AuthService.getSocialAuthUrl(
        backend.id,
        this.$route.query.return_url,
        (this.authRequest != null ? this.authRequest.id : null),
      );

      window.location.href = url;
    },
    async startSocial(backend) {
      this.redirectToSocial(backend);
    },
    async confirmLink() {
      const api = await openapi;

      api.auth_linkUser(null, { access_token: this.userToLinkAccessToken }).then(() => {
        this.$notify({
          title: this.$t('_user.messages.linkedAccounts'),
          type: 'success',
        });
        this.$refs.linkUsersDialog.closeAndReset();
        this.cancelLink();
        this.dialog = false;
      }).catch(() => {
        this.$notify({
          title: this.$t('_user.messages.couldNotLinkUsers'),
          type: 'error',
        });
        this.$refs.linkUsersDialog.loading = false;
      });
    },
    async cancelLink() {
      this.userToLink = null;
      this.userToLinkAccessToken = null;
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
          this.authRequest.validation_uuid,
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
              clearInterval(this.intervalId);
              this.intervalId = null;
              this.authCommand = null;
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
.description-card {
  border-color: var(--v-secondary-base);
}
</style>
