<template>
  <div>
    <h2 class="text-h4">Groups</h2>
    <v-divider class="mb-3"/>
    <v-simple-table v-if="groups.length != 0">
      <thead>
        <tr>
          <th class="text-left">
            Serverbundle
          </th>
          <th class="text-left">
            Gruppen
          </th>
          <th class="text-left">
            Properties
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
          <td>
            <span v-for="prop in getPropsByBundle(bundle.id)" :key="prop.id">
              <v-chip
                @mouseover="setActiveGroups(prop)"
                @mouseleave="resetActives"
                class="ml-1 mb-1 a secondary"
                :class="checkProps(prop)"
              >{{ prop.name }}
              </v-chip>
            </span>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-expansion-panels flat>
      <v-expansion-panel class="mt-3">
        <v-expansion-panel-header class="text-left">Alle Gruppen</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-data-table
          :headers="groupTableHeaders"
          :items="getMembershipTable"
          :items-per-page="5"
          dense
          >
            <v-data-footer disable-items-per-page="true" />
          </v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import axios from 'axios';
import store from '@/store/index';

const uuid = store.getters.user.id;
const customerURL = `${process.env.VUE_APP_BACKEND_CUSTOMER_URL}`;

export default {
  name: 'Groups',
  data() {
    return {
      activeProps: [],
      activeGroups: [],
      test: {},
      groups: [],
      memberships: [],
      serverBundles: [],
      bundleGroups: [],
      groupTableHeaders: [
        { text: 'Name', align: 'start', value: 'name' },
        { text: 'Serverbundle', value: 'bundle' },
        { text: 'Startdatum', value: 'startDate' },
        { text: 'Enddatum', value: 'endDate' },
      ],
    };
  },
  async beforeMount() {
    axios.get(`${customerURL}/group/`).then((response) => { (this.groups = response.data); });
    axios.get(`${customerURL}/user/${uuid}/memberships/`).then((response) => {
      this.memberships = response.data;
      this.memberships.sort((a, b) => new Date(a.end) + new Date(b.end));
    });
    axios.get(`${customerURL}/server/bundle/`).then((response) => { (this.serverBundles = response.data); });
  },
  methods: {
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
    getGroupsByBundle(bundleId) {
      return this.getGroups.filter((g) => g.serverbundle_id === bundleId);
    },
    getPropsByBundle(bundleId) {
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
  },
  computed: {
    // get currently active groups of user
    getGroups() {
      const groups = [];
      this.memberships.forEach((membership) => {
        if (new Date() < new Date(membership.end)) {
          groups.push(this.groups.find((g) => g.id === membership.group_id));
        }
      });
      return groups;
    },
    // unused
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
