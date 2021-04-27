<template>
  <v-card class="flex-grow-1">
    <dialog-form :form-schema="userMembershipAddForm"
                 ref="addMembershipDialog"
                 @submit="addUserMembership"/>
    <v-card-title>
      <v-icon class="mr-2">mdi-account-group</v-icon>
      {{ $t('groups') }}
      <v-spacer />
      <v-btn color="success" @click="$refs.addMembershipDialog.show()" outlined>
        <v-icon left>mdi-plus</v-icon>
        <span>{{ $t('add') }}</span>
      </v-btn>
    </v-card-title>

    <!-- rendered components-->
    <v-card-text v-if="dataFetched >= 2">
      <v-row class="mb-1 mt-1">
        <v-col>
          <v-simple-table>
            <thead>
            <tr>
              <th class="text-left">
                {{ $t("serverbundle") }}
              </th>
              <th class="text-left">
                {{ $t("groups") }}
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="bundle in serverBundles" :key="bundle.id">
              <td>
                {{ bundle.name }}
              </td>
              <td>
                <v-chip
                  @mouseover="setActiveProps(group)"
                  @mouseleave="resetActives"
                  :color="group.color ? group.color : '#000000'"
                  :text-color="$vuetify.theme.dark ? 'white' : 'black'"
                  outlined
                  class="ml-1 mb-1 a"
                  :class="checkGroups(group)"
                  v-for="group in getUserActiveGroupsByBundle(bundle.id)" :key="group.id"
                >{{ group.name }}
                </v-chip>
              </td>
            </tr>
            </tbody>
          </v-simple-table>
        </v-col>
      </v-row>
      <v-divider />
      <v-row>
        <v-col>
          <v-expansion-panels flat accordion>
            <v-expansion-panel>
              <v-expansion-panel-header>
                {{ $t("_dashboard.labels.groupMemberships") }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-data-table
                  :headers="groupTableHeaders"
                  :items="getMembershipTable"
                  :items-per-page="5"
                  dense
                  :hide-default-footer="true"
                >
                </v-data-table>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                {{ $t("_dashboard.labels.activeProperties") }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
          <span v-for="prop in getProps" :key="prop.id">
              <v-chip
                @mouseover="setActiveGroups(prop)"
                @mouseleave="resetActives"
                class="ml-1 mb-1 a success"
                :class="checkProps(prop)"
                small
              >{{ prop.name }}
              </v-chip>
            </span>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import DialogForm from '@/components/DialogForm.vue';
import UserMembershipAddForm from '@/forms/UserMembershipAddForm';
import openapi from '@/api/openapi';
import openapiCached from '@/api/openapiCached';

export default {
  name: 'Groups',
  components: { DialogForm },
  data() {
    return {
      dataFetched: 0,
      activeProps: [],
      activeGroups: [],
      userActiveGroups: [],
      groups: [],
      memberships: [],
      bundleGroups: [],
      groupTableHeaders: [
        { text: this.$t('groupname'), align: 'start', value: 'name' },
        { text: this.$t('serverbundle'), value: 'bundle' },
        { text: this.$t('startdate'), value: 'startDate' },
        { text: this.$t('enddate'), value: 'endDate' },
      ],
      userMembershipAddForm: UserMembershipAddForm,
    };
  },
  watch: {
    $route() {
      this.queryData();
    },
  },
  props: ['serverBundles', 'user'],
  async beforeMount() {
    this.queryData();
  },
  methods: {
    /**
     * resetActives, setActiveProps, setActiveGroups, checkGroups
     * and Checkprops are used for highliting the hovered Groups or Props
     */
    resetActives() {
      this.activeProps = [];
      this.activeGroups = [];
    },
    setActiveProps(group) {
      Object.values(group.properties).forEach((prop) => this.activeProps.push(prop.name));
      this.activeGroups.push(group.id);
    },
    setActiveGroups(prop) {
      this.activeGroups.push(prop.group_id);
      this.activeProps.push(prop.name);
    },
    checkGroups(group) {
      const classes = [];

      if (this.activeGroups.includes(group.id)) {
        classes.push('font-weight-bold');
        classes.push('text-decoration-underline');
      }
      return classes.join(' ');
    },
    checkProps(prop) {
      const classes = [];

      if (this.activeProps.includes(prop.name)) {
        classes.push('darken-3');
      }

      if (!prop.granted) {
        classes.push('error');
      }

      return classes.join(' ');
    },
    // -----
    getGroupsByBundle(bundleId) {
      return this.groups.filter((g) => g.serverbundle_id === bundleId);
    },
    getUserActiveGroupsByBundle(bundleId) {
      return this.userActiveGroups.filter((g) => g.serverbundle_id === bundleId);
    },
    getPropsByBundle(bundleId) {
      if (!this.dataFetched) { return []; }
      const props = [];
      this.getGroupsByBundle(bundleId).forEach((group) => {
        Object.values(group.properties).forEach((prop) => props.push(prop));
      });
      return props;
    },
    getGroupById(groupId) {
      return this.groups.find((g) => g.id === groupId);
    },
    getBundleById(bundleId) {
      return this.serverBundles.find((b) => b.id === bundleId);
    },
    async queryData() {
      (await openapi).user_getMemberships(this.user.id).then((response) => {
        this.memberships = response.data;
        this.dataFetched += 1;
      });
      (await openapiCached).group_getGroups().then((response) => {
        this.groups = response.data;
        this.dataFetched += 1;
      });
      (await openapi).user_getActiveGroups(this.user.id).then((response) => {
        this.userActiveGroups = response.data;
        this.dataFetched += 1;
      });
    },
    async addUserMembership() {
      const data = this.$refs.addMembershipDialog.getData();
      data.group_id = data.group.id;
      const userId = this.$route.params.id;

      if (new Date(data.begin) > new Date(data.end)) {
        this.$refs.addMembershipDialog.setErrorMessage('Begin date after end date');
      }
      (await openapi).user_addMembership(userId, data).then(() => {
        this.queryData();
        this.$refs.addMembershipDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.addMembershipDialog.setErrorMessage(err.response.data.detail);
      });
    },
  },
  computed: {
    /**
     * @link {} get all props belonging to active Group
     * @returns {[]} Array of props
     */
    getProps() {
      const props = [];
      this.userActiveGroups.forEach((group) => {
        Object.values(group.properties).forEach((prop) => props.push(prop));
      });
      return props;
    },
    getMembershipTable() {
      const memberships = [];
      this.memberships.forEach((m) => {
        const object = {};
        object.name = this.getGroupById(m.group_id).name;
        object.bundle = this.getBundleById(this.getGroupById(m.group_id).serverbundle_id).name;
        object.startDate = (m.begin != null ? this.$d(new Date(m.begin), 'short', this.$i18n.locale) : '-∞');
        object.endDate = (m.end != null ? this.$d(new Date(m.end), 'short', this.$i18n.locale) : '∞');
        memberships.push(object);
      });
      return memberships;
    },
  },
};
</script>

<style scoped>
  .a {
    transition: background 0.3s linear 0.1s , color 0.5s linear
  }
</style>
