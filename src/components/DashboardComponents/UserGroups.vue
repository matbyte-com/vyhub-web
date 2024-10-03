<template>
  <v-card
    class="flex-grow-1 vh-dashboard-groups card-rounded"
    flat
  >
    <dialog-form
      ref="addMembershipDialog"
      :form-schema="userMembershipAddForm"
      icon="mdi-account-group"
      :title="$t('_membership.labels.add')"
      @submit="addUserMembership"
    />
    <MembershipEditDialog
      ref="userMembershipEditDialog"
      @submit="fetchData"
    />
    <v-tabs grow>
      <v-tab>
        <v-icon start>
          mdi-account-group
        </v-icon>
        {{ $t('groups') }}
      </v-tab>
      <v-tab>
        <v-icon start>
          mdi-timer-plus
        </v-icon>
        {{ $t('memberships') }}
      </v-tab>
      <v-tab>
        <v-icon start>
          mdi-shield
        </v-icon>
        {{ $t('properties') }}
      </v-tab>
      <v-tab-item>
        <v-card
          v-if="dataFetched >= 2"
          class="card-rounded"
          flat
        >
          <v-row>
            <v-col>
              <v-table>
                <tbody v-if="serverBundles != null">
                  <tr
                    v-for="bundle in serverBundles"
                    :key="bundle.id"
                  >
                    <td>
                      <v-icon
                        v-if="bundle.icon"
                        start
                      >
                        {{ bundle.icon }}
                      </v-icon>
                      {{ bundle.name }}
                    </td>
                    <td>
                      <v-chip
                        v-for="group in getUserActiveGroupsByBundle(bundle)"
                        :key="group.id"
                        :color="group.color ? group.color : '#000000'"
                        :text-color="$vuetify.theme.current.dark ? 'white' : 'black'"
                        variant="outlined"
                        class="ml-1 mb-1 a mt-1"
                        :class="checkGroups(group)"
                      >
                        <!-- @mouseover="setActiveProps(group)"
                       @mouseleave="resetActives" -->
                        {{ group.name }}
                      </v-chip>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-col>
          </v-row>
          <v-card-text>
            <v-btn
              v-if="$checkProp('user_edit')"
              color="success"
              variant="outlined"
              @click="$refs.addMembershipDialog.show()"
            >
              <v-icon start>
                mdi-account-multiple-plus
              </v-icon>
              <span>{{ $t('add') }}</span>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card>
          <v-data-table
            :headers="computedHeaders"
            :items="computedMemberships"
            :items-per-page="10"
            :sort-by="membershipSortBy"
            :sort-desc="membershipSortDesc"
          >
            <template #item.color-status="{ item }">
              <v-sheet
                :color="membershipRowFormatter(item)"
                height="95%"
                width="10px"
                style="margin-left: -15px"
              />
            </template>
            <template #item.group.name="{ item }">
              <v-chip
                :color="item.group.color ? item.group.color : '#000000'"
                :text-color="$vuetify.theme.current.dark ? 'white' : 'black'"
                variant="outlined"
                class="ml-1 mb-1 a"
              >
                {{ item.group.name }}
              </v-chip>
            </template>
            <template #item.begin="{ item }">
              {{
                (item.begin != null
                  ? utils.formatDate(item.begin)
                  : '-∞')
              }}
            </template>
            <template #item.end="{ item }">
              {{
                (item.end != null
                  ? utils.formatDate(item.end)
                  : '∞')
              }}
            </template>
            <template #item.actions="{ item }">
              <v-btn
                v-if="$checkProp('user_edit')"
                variant="outlined"
                color="primary"
                size="small"
                class="ma-0 pa-0"
                @click="openEditMembershipDialog(item)"
              >
                <v-icon>
                  mdi-pencil
                </v-icon>
              </v-btn>
            </template>
            <template #footer.prepend>
              <v-checkbox
                v-model="showPassedMemberships"
                dense
                class="mb-2"
                hide-details="auto"
                :label="$t('_membership.labels.showInactive')"
              />
            </template>
          </v-data-table>
          <v-card-text>
            <v-btn
              v-if="$checkProp('user_edit')"
              color="success"
              variant="outlined"
              @click="$refs.addMembershipDialog.show()"
            >
              <v-icon start>
                mdi-account-multiple-plus
              </v-icon>
              <span>{{ $t('add') }}</span>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card
          class="card-rounded"
          flat
        >
          <v-card-text>
            <span
              v-for="prop in props"
              :key="prop.id"
            >
              <v-chip
                :class="'ml-1 mb-1 a '
                  + (prop.granted ? 'success' : 'error') + ' ' + checkProps(prop)"
                size="small"
                @mouseover="setActiveGroups(prop)"
                @mouseleave="resetActives"
              >
                {{ prop.name }}
                <span v-if="prop.values != null && prop.values.length > 0">
                  :
                  {{ prop.values.join(', ') }}
                </span>
              </v-chip>
            </span>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
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
  props: {
    user: Object,
  },
  data() {
    return {
      dataFetched: 0,
      activeProps: [],
      activeGroups: [],
      userActiveGroups: [],
      memberships: [],
      bundleGroups: [],
      props: [],
      serverBundles: null,
      groupTableHeaders: [
        { value: 'color-status', sortable: false, width: '1px' },
        { text: this.$t('groupname'), align: 'start', value: 'group.name' },
        { text: this.$t('bundle'), value: 'serverbundle.name' },
        { text: this.$t('begin'), value: 'begin' },
        { text: this.$t('end'), value: 'end' },
        {
          text: this.$t('actions'), value: 'actions', sortable: false, align: 'right',
        },
      ],
      userMembershipAddForm: UserMembershipAddForm,
      membershipSortBy: 'begin',
      membershipSortDesc: true,
      showPassedMemberships: false,
    };
  },
  computed: {
    allGroups() {
      return this.userActiveGroups.map((gs) => gs.group);
    },
    computedHeaders() {
      if (this.$checkProp('user_edit')) {
        return this.groupTableHeaders;
      }
      return this.groupTableHeaders.filter((h) => h.value !== 'actions');
    },
    computedMemberships() {
      if (this.showPassedMemberships === true) {
        return this.memberships;
      }
      return this.memberships.filter((m) => m.active === true || new Date(m.begin) > new Date());
    },
  },
  watch: {
    user() {
      this.fetchData();
    },
  },
  beforeMount() {
    this.fetchData();
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
      this.activeGroups = this.allGroups.filter((g) => (prop.name in g.properties))
        .map((g) => g.id);
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
    getUserActiveGroupsByBundle(bundle) {
      return this.userActiveGroups
        .filter((g) => g.serverbundle.id === bundle.id)
        .map((g) => g.group);
    },
    async fetchData() {
      (await openapi).user_getMemberships(this.user.id).then((response) => {
        this.memberships = response.data;
        this.dataFetched += 1;
      });
      (await openapi).user_getActiveGroupsByBundle(this.user.id).then((response) => {
        this.userActiveGroups = response.data;
        this.dataFetched += 1;
      });
      (await openapi).user_getCurrentProperties(this.user.id).then((response) => {
        this.props = response.data;
      });
      (await openapiCached).server_getBundles().then((rsp) => {
        (this.serverBundles = rsp.data);
      });
    },
    async addUserMembership() {
      const api = await openapi;
      const data = this.$refs.addMembershipDialog.getData();
      const userId = this.$route.params.id;

      if (new Date(data.begin) > new Date(data.end)) {
        this.$refs.addMembershipDialog.setErrorMessage('Begin date after end date');
      }

      data.serverbundle_id.forEach((id) => {
        const newData = { ...data, serverbundle_id: id };
        api.user_addMembership(userId, newData).then(() => {
          this.fetchData();
          this.$refs.addMembershipDialog.closeAndReset();
          this.$notify({
            title: this.$t('_messages.addSuccess'),
            type: 'success',
          });
        }).catch((err) => {
          this.$refs.addMembershipDialog.setError(err);
        });
      });
    },
    openEditMembershipDialog(membership) {
      this.$refs.userMembershipEditDialog.show(membership);
    },
    membershipRowFormatter(item) {
      const add = (this.$vuetify.theme.current.dark ? 'darken-2' : 'lighten-4');

      if (item.active) {
        return `green ${add}`;
      }
      return '';
    },
  },
};
</script>

<style scoped>
.a {
  transition: background 0.3s linear 0.1s, color 0.5s linear
}
</style>
