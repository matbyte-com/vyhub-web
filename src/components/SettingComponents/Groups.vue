<template>
  <div>
    <SettingTitle docPath="/guide/group">
      {{ $t('groups') }}
    </SettingTitle>
    <div class="mt-2">
      <DataTable
        :headers="headers"
        :items="groups" :items-per-page="15" :sort-by="['permission_level']" :sort-desc="[true]">
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
            <span>{{ $t('_settings.labels.addGroup') }}</span>
          </v-btn>
        </template>
      </DataTable>
    </div>

    <Dialog ref="showMemberDialog"
            icon="mdi-account-multiple"
            :max-width="1000"
            :title="`${$t('_membership.labels.activeMemberships')}:
              ${memberGroup ? memberGroup.name : ''}`">
      <PaginatedDataTable :items="groupMembers" :headers="groupMemberHeaders"
                 ref="memberTable"
                 :totalItems="totalItems"
                 @reload="fetchGroupMembers"
                 class="mt-3">
        <template v-slot:item.user="{ item }">
          <UserLink :user="item.user" />
        </template>
        <template v-slot:item.serverbundle="{ item }">
          <v-icon v-if="item.serverbundle.icon">
            {{ item.serverbundle.icon }}
          </v-icon>
          {{ item.serverbundle.name }}
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
      </PaginatedDataTable>
    </Dialog>

    <DialogForm
      ref="addGroupDialog"
      :form-schema="groupFormSchema"
      icon="mdi-account-multiple"
      @submit="addGroup"
      :title="$t('_settings.labels.addGroup')">
      <template v-slot:custom-properties="context">
        <PropertyPicker v-bind="context"/>
      </template>
    </DialogForm>
    <DialogForm
      ref="editGroupDialog"
      icon="mdi-account-multiple"
      :form-schema="groupFormSchema"
      :max-width="600"
      @submit="editGroup"
      :title="$t('_settings.labels.editGroup')">
      <template v-slot:custom-properties="context">
        <PropertyPicker v-bind="context"/>
      </template>
    </DialogForm>
    <DeleteConfirmationDialog
      ref="deleteGroupDialog"
      @submit="deleteGroup"/>
    <MembershipEditDialog
      title-icon="mdi-account-multiple"
      ref="editMembershipDialog"
      @submit="fetchGroupMembers(1)"/>
  </div>
</template>

<script>
import openapi from '@/api/openapi';
import DialogForm from '@/components/DialogForm.vue';
import GroupForm from '@/forms/GroupForm';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog.vue';
import DataTable from '@/components/DataTable.vue';
import Dialog from '@/components/Dialog.vue';
import UserLink from '@/components/UserLink.vue';
import SettingTitle from './SettingTitle.vue';
import MembershipEditDialog from '../DashboardComponents/MembershipEditDialog.vue';
import PaginatedDataTable from '@/components/PaginatedDataTable.vue';
import PropertyPicker from './PropertyPicker.vue';

export default {
  name: 'Groups',
  components: {
    PaginatedDataTable,
    MembershipEditDialog,
    UserLink,
    Dialog,
    SettingTitle,
    DataTable,
    DeleteConfirmationDialog,
    DialogForm,
    PropertyPicker,
  },
  data() {
    return {
      groups: [],
      headers: [
        { text: this.$t('name'), value: 'name' },
        { text: this.$t('_settings.permissionLevel'), value: 'permission_level' },
        { text: this.$t('properties'), value: 'properties' },
        {
          text: this.$t('actions'), value: 'actions', sortable: false, align: 'right',
        },
      ],
      groupMemberHeaders: [
        { text: this.$t('user'), value: 'user', sortable: false },
        { text: this.$t('serverbundle'), value: 'serverbundle', sortable: false },
        { text: this.$t('begin'), value: 'begin', sortable: false },
        {
          text: this.$t('end'), value: 'end', sortable: false,
        },
        {
          text: this.$t('actions'), value: 'actions', sortable: false, align: 'right',
        },
      ],
      groupFormSchema: GroupForm,
      memberGroup: null,
      groupMembers: null,
      totalItems: 0,
      advancedProps: ['server_group'],
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    formatProperties(data) {
      return [
        ...data.properties.map((p) => ({
          name: p,
          granted: true,
        })),
        /* ...Object.entries(data.advanced_properties).map(([key, value]) => ({
          name: key,
          granted: true,
          value,
        })), */
      ];
    },
    async fetchData() {
      (await openapi).group_getGroups().then((rsp) => {
        this.groups = rsp.data;
      });
    },
    async addGroup() {
      const data = this.$refs.addGroupDialog.getData();

      data.properties = this.formatProperties(data);
      delete data.advanced_properties;

      (await openapi).group_addGroup(
        null, data,
      ).then(() => {
        this.fetchData();
        this.$refs.addGroupDialog.closeAndReset();
        this.$notify({
          title: this.$t('_group.messages.addedGroup'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.addGroupDialog.setErrorMessage(err.response.data.detail);
      });
    },
    openEditGroupDialog(item) {
      const obj = {};

      const allProps = Object.keys(item.properties);
      const props = allProps.filter((x) => !this.advancedProps.includes(x));
      // const advPropsKeys = allProps.filter((x) => this.advancedProps.includes(x));
      // const advProps = {};

      // advPropsKeys.map((key) => {
      //   advProps[key] = item.properties[key].value;
      //   return null;
      // });

      obj.name = item.name;
      obj.permission_level = item.permission_level;
      obj.color = item.color;
      obj.properties = props;
      obj.mappings = item.mappings;
      // obj.advanced_properties = advProps;
      obj.is_team = item.is_team;
      this.$refs.editGroupDialog.show(item);
      this.$nextTick(() => {
        this.$refs.editGroupDialog.setData(obj);
        console.log(this.$refs.editGroupDialog.getData());
      });
    },
    openDeleteGroupDialog(item) {
      this.$refs.deleteGroupDialog.show(item);
    },
    async deleteGroup(group) {
      (await openapi).group_deleteGroup(group.id).then(() => {
        this.$refs.deleteGroupDialog.cancel();
        this.fetchData();
        this.$notify({
          title: this.$t('_group.messages.deletedGroup'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.deleteGroupDialog.setErrorMessage(err.response.data.detail);
      });
    },
    async editGroup(group) {
      const data = this.$refs.editGroupDialog.getData();

      data.properties = this.formatProperties(data);
      // delete data.advanced_properties;

      (await openapi).group_editGroup(group.id, data)
        .then(() => {
          this.fetchData();
          this.$refs.editGroupDialog.closeAndReset();
          this.$notify({
            title: this.$t('_group.messages.editedGroup'),
            type: 'success',
          });
        }).catch((err) => {
          this.$refs.editGroupDialog.setErrorMessage(err.response.data.detail);
        });
    },
    openShowMemberDialog(item) {
      this.memberGroup = item;
      this.groupMembers = null;
      this.$refs.showMemberDialog.show();
      this.fetchGroupMembers();
    },
    async fetchGroupMembers(queryParams = null) {
      (await openapi).group_getGroupMembers({
        uuid: this.memberGroup.id,
        ...(queryParams != null ? queryParams : this.$refs.memberTable.getQueryParameters()),
      })
        .then((rsp) => {
          this.groupMembers = rsp.data.items;
          this.totalItems = rsp.data.total;
        });
    },
    openEditMembershipDialog(item) {
      const mship = item;
      mship.active = true;
      this.$refs.editMembershipDialog.show(mship);
    },
  },
};
</script>

<style scoped>

</style>
