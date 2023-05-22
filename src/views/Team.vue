<template>
  <div>
    <div class="d-flex">
      <PageTitle icon="mdi-account-group">{{ $t('_team.title') }}</PageTitle>
      <v-spacer/>
      <v-btn v-if="$checkProp('edit_team')" color="success" small
             @click="showEditDialog">
        <v-icon left>mdi-pencil</v-icon>
        {{ $t('edit') }}
      </v-btn>
    </div>
    <v-card>
      <v-tabs v-model="tab">
        <v-tab v-for="bundle in serverbundles" :key="bundle.id">
          <v-icon left :color="bundle.color">
            {{ bundle.icon }}
          </v-icon>
          <span :style="`color: ${bundle.color}`">
            {{ bundle.name }}
          </span>
        </v-tab>
      </v-tabs>
    </v-card>

    <v-row v-for="group in getCurrentTabGroups" :key="group.id" class="justify-center mt-10 mb-3">
      <v-col class="text-center" cols="12">
        <v-chip :color="group.color ? group.color : '#000000'" large
                :text-color="$vuetify.theme.dark ? 'black' : 'white'" label>
          <h2 class="display-h5">{{ group.name }}</h2>
        </v-chip>
      </v-col>
      <v-col cols="6" sm="4" lg="2"
             v-for="user in getUsersByGroup(group.id)" :key="user.id" class="text-center">
        <div style="position:relative;">
          <router-link :to="{ name: 'UserDashboard', params: { id: user.id } }">
            <v-avatar size="100%" style="border-style: solid;"
                      :style="{ borderColor: group.color }">
              <img :src="user.avatar" alt="User Avatar">
            </v-avatar>
          </router-link>
          <div style="position: absolute; top: 92%; width: 100%; text-align: center;">
            <v-chip :color="group.color ? group.color : '#000000'"
                    :text-color="$vuetify.theme.dark ? 'black' : 'white'">
              {{ user.username }}
            </v-chip>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-card>
    </v-card>
    <DialogForm ref="editForm" @submit="editTeamMember"
                :form-schema="schema" :title="$t('_team.editTeam')" icon="mdi-account-group"/>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle.vue';
import openapi from '../api/openapi';
import DialogForm from '../components/DialogForm.vue';
import TeamEditForm from '../forms/TeamEditForm';

export default {
  name: 'Team',
  components: {
    DialogForm,
    PageTitle,
  },
  data() {
    return {
      tab: 0,
      serverbundles: [],
      memberships: [],
      schema: TeamEditForm,
      teamMemberGroups: [],
    };
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
          title: this.$t('_team.teamGroupsSuccessfullyEdited'),
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
};
</script>

<style scoped>

</style>
