<template>
  <div>
    <SettingTitle>{{ $t('groups') }}</SettingTitle>
    <DialogForm
      ref="addGroupDialog"
      :form-schema="addGroupSchema"
      title-icon="mdi-account-multiple"
      @submit="addGroup"
      :title="$t('settings.labels.addGroup')"/>
    <DialogForm
      ref="editGroupDialog"
      title-icon="mdi-account-multiple"
      :form-schema="editGroupSchema"
      :max-width="600"
      @submit="editGroup"
      :title="$t('settings.labels.editGroup')"/>
    <DeleteConfirmationDialog
      ref="deleteGroupDialog"
      @submit="deleteGroup"/>
    <MembershipEditDialog
      ref="editMembershipDialog"
      @submit="fetchGroupMembers(1)"/>
    <Dialog ref="showMemberDialog"
            :title="`${$t('_membership.labels.activeMemberships')}:  ${memberGroup.name}`">
      <DataTable :items="groupMembersData.items" :headers="groupMemberHeaders"
                 :footer-props="{
                  'disable-items-per-page': true,
                  }"
                 :server-items-length.sync="totalItems"
                 :items-per-page.sync="itemsPerPage"
                 @update:page="newMembershipPage"
                 :external-search="true"
                 @search="newSearch"
                 class="mt-3">
        <template v-slot:item.user="{ item }">
          <UserLink :user="item.user" />
        </template>
        <template v-slot:item.begin="{ item }">
          {{ (item.begin != null
          ? $d(new Date(item.begin), 'short', $i18n.locale)
          : '∞') }}
        </template>
        <template v-slot:item.end="{ item }">
          {{ (item.end != null
          ? $d(new Date(item.end), 'short', $i18n.locale)
          : '∞') }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn outlined color="primary" small @click="openEditMembershipDialog(item)">
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
        </template>
      </DataTable>
    </Dialog>
    <v-tabs v-model="tab">
      <v-tab v-for="tab in bundles" :key="tab.id" :style="'color:' + tab.color">
        <v-icon v-if="tab.icon" left :color="tab.color">{{ tab.icon }}</v-icon>
        {{ tab.name }}
      </v-tab>
    </v-tabs>
    <div class="mt-2">
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="tab in bundles" :key="tab.id">
          <DataTable
            :headers="headers"
            :items="getGroupsByBundle(tab.id)" :items-per-page="50">
            <template v-slot:item.name="{ item }">
              <v-chip :color="item.color ? item.color : '#000000'"
                      :text-color="$vuetify.theme.dark ? 'white' : 'black'"
                      outlined>
                {{ item.name }}
              </v-chip>
            </template>
            <template v-slot:item.properties="{ item }" >
              <v-expansion-panels v-if="Object.keys(item.properties).length > 5" flat>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    {{ $t('properties') }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-chip v-for="(prop, index) in item.properties" :key="index" small
                            color="primary" class="mr-1 mb-1">
                      {{ prop.name }}
                      <span v-if="prop.value !== null">
                        : {{ prop.value }}
                      </span>
                    </v-chip>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
              <v-chip v-else v-for="(prop, index) in item.properties" :key="index" small
                      color="primary" class="mr-1 mb-1">
                {{ prop.name }}
                <span v-if="prop.value !== null">
                  : {{ prop.value }}
                </span>
              </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
              <div class="text-right">
                <v-btn outlined color="success" small
                       @click="openShowMemberDialog(item)" class="mr-1">
                  <v-icon>
                    mdi-account-group
                  </v-icon>
                </v-btn>
                <v-btn outlined color="primary" small
                       @click="openEditGroupDialog(item)" class="mr-1">
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-btn outlined color="error" small @click="openDeleteGroupDialog(item)">
                  <v-icon>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </div>
            </template>
            <template v-slot:footer-right>
              <v-btn color="success" @click="$refs.addGroupDialog.show()" outlined>
                <v-icon left>mdi-plus</v-icon>
                <span>{{ $t('settings.labels.addGroup') }}</span>
              </v-btn>
            </template>
          </DataTable>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import openapi from '@/api/openapi';
import DialogForm from '@/components/DialogForm.vue';
import AddGroupForm from '@/forms/GroupAddForm';
import EditGroupForm from '@/forms/GroupEditForm';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog.vue';
import DataTable from '@/components/DataTable.vue';
import Dialog from '@/components/Dialog.vue';
import UserLink from '@/components/UserLink.vue';
import SettingTitle from './SettingTitle.vue';
import MembershipEditDialog from '../DashboardComponents/MembershipEditDialog.vue';

export default {
  name: 'Groups',
  components: {
    MembershipEditDialog,
    UserLink,
    Dialog,
    SettingTitle,
    DataTable,
    DeleteConfirmationDialog,
    DialogForm,
  },
  data() {
    return {
      groups: [],
      bundles: [],
      tab: null,
      headers: [
        { text: this.$t('name'), value: 'name' },
        { text: this.$t('settings.permissionLevel'), value: 'permission_level' },
        { text: this.$t('properties'), value: 'properties' },
        {
          text: this.$t('actions'), value: 'actions', sortable: false, align: 'right',
        },
      ],
      groupMemberHeaders: [
        { text: this.$t('user'), value: 'user', sortable: false },
        { text: this.$t('begin'), value: 'begin', sortable: false },
        {
          text: this.$t('end'), value: 'end', sortable: false,
        },
        {
          text: this.$t('actions'), value: 'actions', sortable: false, align: 'right',
        },
      ],
      addGroupSchema: AddGroupForm,
      editGroupSchema: EditGroupForm,
      memberGroup: {},
      groupMembersData: [],
      itemsPerPage: 50,
      totalItems: 20,
      advancedProps: ['server_group'],
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).group_getGroups().then((rsp) => {
        this.groups = rsp.data;
      });
      (await openapi).server_getBundles().then((rsp) => {
        this.bundles = rsp.data;
      });
    },
    getGroupsByBundle(bundleId) {
      return this.groups.filter((g) => g.serverbundle.id === bundleId);
    },
    async addGroup() {
      const data = this.$refs.addGroupDialog.getData();
      data.serverbundle_id = data.serverbundle.id;

      (await openapi).group_addGroup(
        null, data,
      ).then(() => {
        this.fetchData();
        this.$refs.addGroupDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.addGroupDialog.setErrorMessage(err.response.data.detail);
      });
    },
    openEditGroupDialog(item) {
      const obj = {};

      const allProps = Object.keys(item.properties);
      const props = allProps.filter((x) => !this.advancedProps.includes(x));
      const advPropsKeys = allProps.filter((x) => this.advancedProps.includes(x));
      const advProps = {};

      advPropsKeys.map((key) => {
        advProps[key] = item.properties[key].value;
        return null;
      });

      obj.name = item.name;
      obj.permission_level = item.permission_level;
      obj.color = item.color;
      obj.serverbundle = item.serverbundle;
      obj.properties = props;
      obj.advanced_properties = advProps;

      this.$refs.editGroupDialog.show(item);
      this.$refs.editGroupDialog.setData(obj);
    },
    openDeleteGroupDialog(item) {
      this.$refs.deleteGroupDialog.show(item);
    },
    async deleteGroup(group) {
      (await openapi).group_deleteGroup(group.id).then(() => {
        this.$refs.deleteGroupDialog.cancel();
        this.fetchData();
      }).catch((err) => {
        this.$refs.deleteGroupDialog.setErrorMessage(err.response.data.detail);
      });
    },
    async editGroup(group) {
      const data = this.$refs.editGroupDialog.getData();
      data.serverbundle_id = data.serverbundle.id;

      data.properties = [
        ...data.properties.map((p) => ({
          name: p,
          granted: true,
        })),
        ...Object.entries(data.advanced_properties).map(([key, value]) => ({
          name: key,
          granted: true,
          value,
        })),
      ];

      delete data.advanced_properties;

      (await openapi).group_editGroup(group.id, data)
        .then(() => {
          this.fetchData();
          this.$refs.editGroupDialog.closeAndReset();
        }).catch((err) => {
          this.$refs.editGroupDialog.setErrorMessage(err.response.data.detail);
        });
    },
    openShowMemberDialog(item) {
      this.memberGroup = item;
      this.groupMembers = [];
      this.$refs.showMemberDialog.show();
      this.fetchGroupMembers();
    },
    async fetchGroupMembers(page = 1, searchStr = null) {
      (await openapi).group_getGroupMembers({
        uuid: this.memberGroup.id,
        page,
        search: searchStr,
      })
        .then((rsp) => {
          this.groupMembersData = rsp.data;
          this.totalItems = rsp.data.total;
        });
    },
    openEditMembershipDialog(item) {
      const mship = item;
      mship.active = true;
      this.$refs.editMembershipDialog.show(mship);
    },
    newMembershipPage(page) {
      this.fetchGroupMembers(page);
    },
    newSearch(str) {
      this.fetchGroupMembers(1, str);
    },
  },
};
</script>

<style scoped>

</style>
