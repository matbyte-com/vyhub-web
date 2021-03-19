<template>
  <v-card class="flex-grow-1">
    <v-card-title>
      <v-icon class="mr-2">mdi-account-group</v-icon>
      {{ $t('groups') }}
    </v-card-title>

    <!-- rendered components-->
    <v-card-text v-if="dataFetched >= 2">
      <v-row class="mb-1">
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
            <span v-for="group in getGroupsByBundle(bundle.id)" :key="group.id">
                <v-chip
                  @mouseover="setActiveProps(group)"
                  @mouseleave="resetActives"
                  class="ml-1 mb-1 a secondary"
                  :class="checkGroups(group)"
                >{{ group.name }}
                </v-chip>
              </span>
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
              <v-expansion-panel-header>{{ $t("allGroups") }}</v-expansion-panel-header>
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
              <v-expansion-panel-header>{{ $t("allProperties") }}</v-expansion-panel-header>
              <v-expansion-panel-content>
          <span v-for="prop in getProps" :key="prop.id">
              <v-chip
                @mouseover="setActiveGroups(prop)"
                @mouseleave="resetActives"
                class="ml-1 mb-1 a secondary"
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
import api from '@/api/api';

export default {
  name: 'Groups',
  data() {
    return {
      dataFetched: 0,
      activeProps: [],
      activeGroups: [],
      groups: [],
      memberships: [],
      bundleGroups: [],
      groupTableHeaders: [
        { text: this.$t('groupname'), align: 'start', value: 'name' },
        { text: this.$t('serverbundle'), value: 'bundle' },
        { text: this.$t('startdate'), value: 'startDate' },
        { text: this.$t('enddate'), value: 'endDate' },
      ],
    };
  },
  watch: {
    $route() {
      this.queryData();
    },
  },
  props: ['serverBundles'],
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
      if (this.activeGroups.includes(group.id)) {
        return 'accent';
      }
      return '';
    },
    checkProps(prop) {
      if (this.activeProps.includes(prop.name)) {
        return 'accent';
      }
      return '';
    },
    // -----
    getGroupsByBundle(bundleId) {
      return this.getGroups.filter((g) => g.serverbundle_id === bundleId);
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
    queryData() {
      const username = this.$route.params.id;
      api.group.getGroups().then((response) => {
        this.groups = response.data;
        this.dataFetched += 1;
      });
      api.user.getMemberships(username).then((response) => {
        this.memberships = response.data;
        this.dataFetched += 1;
      });
    },
  },
  computed: {
    /**
     * get active Groups of Current User
     * @returns {[Groups]} Array of active UserGroups
     */
    getGroups() {
      const groups = [];
      this.memberships.forEach((membership) => {
        if (membership.active === true) {
          groups.push(this.groups.find((g) => g.id === membership.group_id));
        }
      });
      return groups;
    },
    /**
     * @link {getGroups()} get all props belonging to active Group
     * @returns {[]} Array of props
     */
    getProps() {
      const props = [];
      this.getGroups.forEach((group) => {
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
        object.startDate = this.$d(new Date(m.begin), 'short', this.$i18n.locale);
        object.endDate = this.$d(new Date(m.end), 'short', this.$i18n.locale);
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
