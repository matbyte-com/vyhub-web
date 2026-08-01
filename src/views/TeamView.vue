<template>
  <div>
    <PageTitleFlat
      :title="$t('_team.title')"
      :hide-triangle="true"
      :no-bottom-border-radius="$vuetify.display.smAndDown"
    >
      <template #end>
        <div class="text-right">
          <v-btn
            v-if="$checkProp('edit_team')"
            variant="flat"
            color="success"
            size="small"
            @click="showEditDialog"
          >
            <v-icon start>
              mdi-pencil
            </v-icon>
            {{ $t('edit') }}
          </v-btn>
        </div>
      </template>
    </PageTitleFlat>
    <v-card
      class="vh-team card-rounded-top px-2"
      flat
      :class="{ 'mt-4':!$vuetify.display.smAndDown,
                'no-top-border-radius': $vuetify.display.smAndDown }"
    >
      <v-tabs v-model="tab">
        <v-tab
          v-for="bundle in serverbundles"
          :key="bundle.id"
        >
          <v-icon
            start
            :color="bundle.color"
          >
            {{ bundle.icon }}
          </v-icon>
          <span :style="`color: ${bundle.color}`">
            {{ bundle.name }}
          </span>
        </v-tab>
      </v-tabs>
    </v-card>
    <v-card
      flat
      class="vh-team-content card-rounded-bottom px-2 pb-8"
      :class="{ 'no-top-border-radius': $vuetify.display.smAndDown }"
    >
      <template
        v-for="group in getCurrentTabGroups"
        :key="group.id"
      >
        <div class="d-flex align-center justify-center mt-8 mb-5">
          <v-chip
            variant="flat"
            :color="group.color ? group.color : '#000000'"
            size="large"
            label
            class="text-h6 font-weight-bold px-4"
          >
            {{ group.name }}
          </v-chip>
        </div>
        <v-row class="justify-center">
          <v-col
            v-for="user in getUsersByGroup(group.id)"
            :key="user.id"
            cols="6"
            sm="4"
            md="3"
            lg="2"
            class="d-flex"
          >
            <v-card
              :to="{ name: 'UserDashboard', params: { id: user.id } }"
              class="team-member-card flex-grow-1 text-center pa-4 card-rounded"
              variant="flat"
              border
            >
              <div class="d-flex justify-center">
                <v-avatar
                  size="88"
                  class="team-member-avatar"
                  :style="{ borderColor: group.color ? group.color : '#000000' }"
                >
                  <v-img
                    :src="user.avatar"
                    alt="User Avatar"
                    lazy-src="https://cdn.vyhub.net/vyhub/avatars/default.png"
                  />
                </v-avatar>
              </div>
              <div class="mt-3 font-weight-bold text-truncate">
                {{ user.username }}
              </div>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-card>
    <DialogForm
      ref="editForm"
      :form-schema="schema"
      :title="$t('_team.editTeam')"
      icon="mdi-account-group"
      @submit="editTeamMember"
    />
  </div>
</template>

<script>
import openapi from '../api/openapi';
import TeamEditForm from '../forms/TeamEditForm';

export default {
  data() {
    return {
      tab: 0,
      serverbundles: [],
      memberships: [],
      schema: TeamEditForm,
      teamMemberGroups: [],
    };
  },
  computed: {
    /**
     * First get the current Bundle which is selected by tab
     * Second get all memberships which are active in the selected serverbundle
     * Third get all groups which were active in at least one of the membership and order
     *    them by permission_level
     * Fourth get all users by the group and order them alphabetically
     * @returns {*}
     */
    currentBundleId() {
      return this.serverbundles[this.tab].id;
    },
    getCurrentTabMemberships() {
      return this.memberships.filter((m) => m.serverbundle_id === this.currentBundleId);
    },
    getCurrentTabGroups() {
      if (!this.getCurrentTabMemberships) { return []; }
      const res = [];
      this.getCurrentTabMemberships.forEach((m) => {
        if (!res.find((r) => r.id === m.group.id)) { res.push(m.group); }
      });
      return res.sort((a, b) => b.permission_level - a.permission_level);
    },
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      // Bundles for Tab view
      (await openapi).server_getBundles().then((rsp) => {
        this.serverbundles = rsp.data;
      });
      // Memberships for team view
      (await openapi).general_getTeamMember().then((rsp) => {
        this.memberships = rsp.data;
      });
      // Team Groups only for the edit dialog
      (await openapi).group_getGroups({ is_team: true }).then((rsp) => {
        this.teamMemberGroups = rsp.data;
      });
    },
    getUsersByGroup(groupID) {
      const res = [];
      this.memberships.forEach((m) => {
        if (m.group.id === groupID && m.serverbundle_id === this.currentBundleId) {
          res.push(m.user);
        }
      });
      return res.sort((a, b) => a.username.localeCompare(b.username));
    },
    async editTeamMember() {
      const data = this.$refs.editForm.getData();
      (await openapi).general_editTeamMember(null, data).then(() => {
        this.$refs.editForm.closeAndReset();
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.editSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.editForm.setError(err);
      });
    },
    showEditDialog() {
      this.$refs.editForm.show();
      const obj = {};
      obj.groups = this.teamMemberGroups.map((g) => g.id);
      this.$refs.editForm.setData(obj);
    },
  },
};
</script>

<script setup lang="ts">
</script>

<style scoped>
.team-member-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.team-member-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18) !important;
}

.team-member-avatar {
  border: 3px solid;
}
</style>
