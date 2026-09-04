<template>
  <v-card
    class="text-center vh-dashboard-profile-picture card-rounded"
    flat
  >
    <v-card-text>
      <v-row
        justify="center"
        class="my-1"
      >
        <v-hover v-if="activeUser != null">
          <template #default="{ isHovering, props }">
            <v-fade-transition mode="out-in">
              <v-avatar
                v-bind="props"
                :key="activeUser.id"
                class="ma-1"
                size="200px"
              >
                <v-img :src="activeUser.avatar" />
                <v-fade-transition>
                  <v-overlay
                    :model-value="!!isHovering"
                    contained
                    class="d-flex justify-center align-center"
                  >
                    <p class="text-h6 text-white">
                      {{ activeUser.type }}
                    </p>
                    <UserLink
                      class="mt-2"
                      :disabled-link="true"
                      :outline="false"
                      :user="activeUser"
                    />
                    <div
                      v-if="$checkProp('user_edit')"
                      class="mt-2"
                    >
                      <v-tooltip
                        location="bottom"
                        :text="$t('_user.labels.hideAvatar')"
                      >
                        <template #activator="{ props: activatorProps }">
                          <v-btn
                            icon
                            size="x-small"
                            v-bind="activatorProps"
                            @click="toggleAvatarHidden(activeUser)"
                          >
                            <v-icon
                              size="small"
                              :icon="(activeUser.avatar_hidden ? 'mdi-eye' : 'mdi-eye-off')"
                            />
                          </v-btn>
                        </template>
                      </v-tooltip>
                    </div>
                  </v-overlay>
                </v-fade-transition>
              </v-avatar>
            </v-fade-transition>
          </template>
        </v-hover>
        <v-progress-circular
          v-else
          indeterminate
        />
      </v-row>
      <v-alert
        v-if="user.admin"
        density="compact"
        color="success"
        variant="outlined"
        class="font-weight-bold mt-3 mb-3"
        width="100%"
      >
        <span class="d-flex align-center justify-space-between">
          <span />
          <span>
            <v-icon
              color="success"
              start
            >
              mdi-shield-account
            </v-icon>
            <span>
              {{ $t('admin') }}
            </span>
          </span>
          <span class="justify-end">
            <v-icon
              v-if="store.user && store.user.admin"
              icon="mdi-close-circle"
              variant="flat"
              color="error"
              @click="$refs.adminDeleteConfirmationDialog.show()"
            />
          </span>
        </span>
      </v-alert>
      <slot />
    </v-card-text>
    <confirmation-dialog
      ref="adminDeleteConfirmationDialog"
      :title="$t('_dashboard.labels.removeAdminTitle')"
      :text="$t('_dashboard.messages.removeAdminConfirmation')"
      @submit="removeAdmin"
    />
  </v-card>
</template>

<script>
import openapi from '@/api/openapi';
import { useVyHubStore } from '@/store';

export default {
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
emits: ['user-updated'],
  data() {
    return {
      userNum: 0,
    };
  },
  computed: {
    store() {
      return useVyHubStore();
    },
    users() {
      if (this.user === null) {
        return null;
      }

      return [this.user].concat(this.user.linked_users);
    },
    activeUser() {
      if (this.users == null || this.userNum >= this.users.length) {
        return null;
      }

      return this.users[this.userNum];
    },
  },
  watch: {
    users() {
      this.userNum = 0;
    },
  },
  mounted() {
    this.cycleAvatar();
  },
  methods: {
    cycleAvatar() {
      setTimeout(() => {
        this.userNum = (this.userNum + 1) % this.users.length;

        this.cycleAvatar();
      }, 4000);
    },
    async removeAdmin() {
      (await openapi).user_editUser(this.user.id, { admin: false }).then(() => {
        this.$refs.adminDeleteConfirmationDialog.closeAndReset();
        this.$notify({
          title: this.$t('_messages.removeSuccess'),
          type: 'success',
        });
        this.$emit('user-updated');
      }).catch((err) => {
        this.$refs.adminDeleteConfirmationDialog.setError(err);
      });
    },
    async toggleAvatarHidden(user) {
      (await openapi).user_editUser(user.id, { avatar_hidden: !user.avatar_hidden }).then(() => {
        this.$notify({
          title: this.$t('_messages.updateSuccess'),
          type: 'success',
        });
        this.$emit('user-updated');
      })
    }
  },
};
</script>

<style scoped>

</style>
