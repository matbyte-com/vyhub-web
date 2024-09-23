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
          <template #default="{ hover }">
            <v-fade-transition mode="out-in">
              <v-avatar
                :key="activeUser.id"
                class="ma-1"
                height="200px"
                width="200px"
              >
                <v-img :src="activeUser.avatar" />
                <v-fade-transition>
                  <v-overlay
                    v-if="hover"
                    absolute
                  >
                    <p>{{ activeUser.type }} </p>
                    <UserLink
                      :disabled-link="true"
                      :outline="false"
                      :user="activeUser"
                    />
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
        text
        color="success"
        variant="outlined"
        class="font-weight-bold mt-3"
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
            <v-btn
              v-if="$store.getters.user && $store.getters.user.admin"
              icon
              color="error"
              size="x-small"
              class="justify-end"
              @click="$refs.adminDeleteConfirmationDialog.show()"
            >
              <v-icon>mdi-close-circle</v-icon>
            </v-btn>
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
import UserLink from '@/components/UserLink.vue';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';
import openapi from '@/api/openapi';

export default {
  name: 'ProfilePicture.vue',
  components: { ConfirmationDialog, UserLink },
  props: {
    user: Object,
  },
  data() {
    return {
      userNum: 0,
    };
  },
  computed: {
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
  },
};
</script>

<style scoped>

</style>
