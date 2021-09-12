<template>
  <v-card class="flex-grow-1">
    <dialog-form :form-schema="userMembershipAddForm"
                 title-icon="mdi-account-group"
                 :title="$t('_membership.labels.add')"
                 ref="addMembershipDialog"
                 @submit="addUserMembership"/>
    <MembershipEditDialog ref="userMembershipEditDialog" @submit="queryData"/>
    <v-card-title>
      <v-icon class="mr-2">mdi-account-group</v-icon>
      {{ $t('groups') }}
      <v-spacer />
      <v-btn v-if="$checkProp('user_edit')" color="success"
             @click="$refs.addMembershipDialog.show()" outlined>
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
            <tbody v-if="serverBundles != null">
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
                    v-for="group in getUserActiveGroupsByBundle(bundle)" :key="group.id"
                  >
                    {{ group.name }}
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
                  :items="memberships"
                  :items-per-page="5"
                  :hide-default-footer="true"
                >
                  <template v-slot:item.group.name="{ item }">
                    <v-chip
                      :color="item.group.color ? item.group.color : '#000000'"
                      :text-color="$vuetify.theme.dark ? 'white' : 'black'"
                      outlined
                      class="ml-1 mb-1 a"
                    >
                      {{ item.group.name }}
                    </v-chip>
                  </template>
                  <template v-slot:item.begin="{ item }">
                    {{ (item.begin != null
                    ? $d(new Date(item.begin), 'short', $i18n.locale)
                    : '-∞') }}
                  </template>
                  <template v-slot:item.end="{ item }">
                    {{ (item.end != null
                    ? $d(new Date(item.end), 'short', $i18n.locale)
                    : '∞') }}
                  </template>
                  <template v-slot:item.actions="{ item }">
                    <v-btn outlined color="primary" small
                           @click="openEditMembershipDialog(item)" class="ma-0 pa-0">
                      <v-icon>
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                {{ $t("_dashboard.labels.activeProperties") }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <span v-for="prop in props" :key="prop.id">
                    <v-chip
                      @mouseover="setActiveGroups(prop)"
                      @mouseleave="resetActives"
                      :class="'ml-1 mb-1 a '
                      + (prop.granted ? 'success' : 'error') + ' ' + checkProps(prop)"
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
import MembershipEditDialog from './MembershipEditDialog.vue';

export default {
  name: 'Groups',
  components: { MembershipEditDialog, DialogForm },
  data() {
    return {
      dataFetched: 0,
      activeProps: [],
      activeGroups: [],
      userActiveGroups: [],
      groups: [],
      memberships: [],
      bundleGroups: [],
      serverBundles: null,
      groupTableHeaders: [
        { text: this.$t('groupname'), align: 'start', value: 'group.name' },
        { text: this.$t('bundle'), value: 'group.serverbundle.name' },
        { text: this.$t('begin'), value: 'begin' },
        { text: this.$t('end'), value: 'end' },
        {
          text: this.$t('actions'), value: 'actions', sortable: false, align: 'right',
        },
      ],
      userMembershipAddForm: UserMembershipAddForm,
    };
  },
  watch: {
    $route() {
      this.queryData();
    },
  },
  props: {
    user: Object,
  },
  beforeMount() {
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
    getUserActiveGroupsByBundle(bundle) {
      return this.userActiveGroups.filter((g) => g.serverbundle.id === bundle.id);
    },
    getPropsByBundle(bundleId) {
      if (!this.dataFetched) { return []; }
      const props = [];
      this.getGroupsByBundle(bundleId).forEach((group) => {
        Object.values(group.properties).forEach((prop) => props.push(prop));
      });
      return props;
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
      (await openapiCached).server_getBundles().then((rsp) => { (this.serverBundles = rsp.data); });
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
    openEditMembershipDialog(membership) {
      this.$refs.userMembershipEditDialog.show(membership);
    },
  },
  computed: {
    /**
     * @link {} get all props belonging to active Group
     * @returns {[]} Array of props
     */
    props() {
      const props = [];
      this.userActiveGroups.forEach((group) => {
        Object.values(group.properties).forEach((prop) => props.push(prop));
      });
      return props;
    },
  },
};
</script>

<style scoped>
  .a {
    transition: background 0.3s linear 0.1s , color 0.5s linear
  }
</style>
