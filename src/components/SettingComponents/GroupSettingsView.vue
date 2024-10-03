<template>
  <div>
    <SettingTitle doc-path="/guide/group">
      {{ $t('groups') }}
    </SettingTitle>
    <div class="mt-2">
      <DataTable
        :headers="headers"
        :items="groups"
        :items-per-page="10"
        class="no-padding"
        sort-by="permission_level"
        :sort-desc="true"
      >
        <template #item.name="{ item }">
          <v-chip
            :color="item.color ? item.color : '#000000'"
            :text-color="$vuetify.theme.current.dark ? 'white' : 'black'"
            variant="outlined"
          >
            {{ item.name }}
          </v-chip>
        </template>
        <template #item.properties="{ item }">
          <div class="pa-1">
            <v-expansion-panels
              v-if="Object.keys(item.properties).length > 5"
              flat
            >
              <v-expansion-panel>
                <v-expansion-panel-title>
                  {{ $t('properties') }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-chip
                    v-for="(prop, index) in item.properties"
                    :key="index"
                    size="small"
                    :color="prop.granted ? 'success' : 'error'"
                    class="mr-1 mb-1 mt-1"
                  >
                    {{ prop.name }}
                    <span v-if="prop.value !== null">
                      : {{ prop.value }}
                    </span>
                  </v-chip>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-chip
              v-for="(prop, index) in item.properties"
              v-else
              :key="index"
              size="small"
              :color="prop.granted ? 'success' : 'error'"
              class="mr-1 mb-1"
            >
              {{ prop.name }}
              <span v-if="prop.value !== null">
                : {{ prop.value }}
              </span>
            </v-chip>
          </div>
        </template>
        <template #item.actions="{ item }">
          <div
            class="d-flex"
            :class="{ 'flex-column' : $vuetify.display.lgAndDown }"
          >
            <v-btn
              icon
              color="secondary"
              size="small"
              class="mr-xl-1 mt-xl-0"
              @click="copyGroup(item)"
            >
              <v-icon size="small">
                mdi-content-copy
              </v-icon>
            </v-btn>
            <v-btn
              variant="outlined"
              color="success"
              size="small"
              class="mr-xl-1 mt-1 mt-xl-0"
              @click="openShowMemberDialog(item)"
            >
              <v-icon>
                mdi-account-group
              </v-icon>
            </v-btn>
            <v-btn
              variant="outlined"
              color="primary"
              size="small"
              class="mr-xl-1 mt-1 mt-xl-0"
              @click="openEditGroupDialog(item)"
            >
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-btn>
            <v-btn
              variant="outlined"
              color="error"
              size="small"
              class="mt-1 mt-xl-0"
              @click="openDeleteGroupDialog(item)"
            >
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
          </div>
        </template>
        <template #footer-right>
          <v-btn
            color="success"
            variant="outlined"
            :class="{ 'glow-effect':utils.customerJourneyActive('add-group') }"
            @click="$refs.addGroupDialog.show()"
          >
            <v-icon start>
              mdi-plus
            </v-icon>
            <span>{{ $t('_settings.labels.addGroup') }}</span>
          </v-btn>
        </template>
      </DataTable>
    </div>

    <Dialog
      ref="showMemberDialog"
      icon="mdi-account-multiple"
      :max-width="1000"
      :title="`${$t('_membership.labels.activeMemberships')}:
              ${memberGroup ? memberGroup.name : ''}`"
    >
      <PaginatedDataTable
        ref="memberTable"
        :items="groupMembers"
        :headers="groupMemberHeaders"
        :total-items="totalItems"
        class="mt-3"
        @reload="fetchGroupMembers"
      >
        <template #item.user="{ item }">
          <UserLink :user="item.user" />
        </template>
        <template #item.serverbundle="{ item }">
          <v-icon v-if="item.serverbundle.icon">
            {{ item.serverbundle.icon }}
          </v-icon>
          {{ item.serverbundle.name }}
        </template>
        <template #item.begin="{ item }">
          {{ (item.begin != null
            ? $d(new Date(item.begin), 'short', $i18n.locale)
            : '∞') }}
        </template>
        <template #item.end="{ item }">
          {{ (item.end != null
            ? $d(new Date(item.end), 'short', $i18n.locale)
            : '∞') }}
        </template>
        <template #item.actions="{ item }">
          <v-btn
            variant="outlined"
            color="primary"
            size="small"
            @click="openEditMembershipDialog(item)"
          >
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
      :title="$t('_settings.labels.addGroup')"
      @submit="addGroup"
    >
      <template #custom-properties="context">
        <PropertyPicker v-bind="context" />
      </template>
    </DialogForm>
    <DialogForm
      ref="editGroupDialog"
      icon="mdi-account-multiple"
      :form-schema="groupFormSchema"
      :max-width="600"
      :title="$t('_settings.labels.editGroup')"
      @submit="editGroup"
    >
      <template #custom-properties="context">
        <PropertyPicker v-bind="context" />
      </template>
    </DialogForm>
    <DeleteConfirmationDialog
      ref="deleteGroupDialog"
      @submit="deleteGroup"
    />
    <MembershipEditDialog
      ref="editMembershipDialog"
      title-icon="mdi-account-multiple"
      @submit="fetchGroupMembers(1)"
    />
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
import PaginatedDataTable from '@/components/PaginatedDataTable.vue';
import EventBus from '@/services/EventBus';
import SettingTitle from './SettingTitle.vue';
import MembershipEditDialog from '../DashboardComponents/MembershipEditDialog.vue';
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
        { text: this.$t('properties'), value: 'properties', width: '65%' },
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
      groupFormSchema: GroupForm.returnForm(),
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
    formatNegativeProperties(data) {
      if (!data.negative_properties) { return []; }
      return [
        ...data.negative_properties.map((p) => ({
          name: p,
          granted: false,
        })),
      ];
    },
    async fetchData() {
      (await openapi).group_getGroups().then((rsp) => {
        this.groups = rsp.data;
      });
    },
    async addGroup(copy) {
      let data = null;
      if (copy == null) {
        data = this.$refs.addGroupDialog.getData();

        data.properties = this.formatProperties(data);
        data.negative_properties = this.formatNegativeProperties(data);
        delete data.advanced_properties;
        data.max_ban_length = data.max_ban_length * 60 * 60 * 24;
      } else {
        data = copy;
      }

      (await openapi).group_addGroup(
        null, data,
      ).then(() => {
        this.fetchData();
        if (copy == null) {
          this.$refs.addGroupDialog.closeAndReset();
        }
        this.$notify({
          title: this.$t('_messages.addSuccess'),
          type: 'success',
        });
        // Event caught in CustomerJourney.vue
        EventBus.emit('customerJourneyUpdate');
      }).catch((err) => {
        this.$refs.addGroupDialog.setError(err);
      });
    },
    openEditGroupDialog(item) {
      const obj = {};

      const allProps = Object.keys(item.properties);
      const props = allProps.filter((x) => !this.advancedProps.includes(x));
      const negativeProps = Object.keys(item.properties)
        .filter((key) => !item.properties[key].granted);
      // const advPropsKeys = allProps.filter((x) => this.advancedProps.includes(x));
      // const advProps = {};

      // advPropsKeys.map((key) => {
      //   advProps[key] = item.properties[key].value;
      //   return null;
      // });

      obj.name = item.name;
      obj.permission_level = item.permission_level;
      obj.color = item.color;
      if (item.max_ban_length != null) {
        obj.max_ban_length = item.max_ban_length / 60 / 60 / 24;
      }
      obj.properties = props;
      obj.negative_properties = negativeProps;
      obj.mappings = item.mappings;
      // obj.advanced_properties = advProps;
      obj.is_team = item.is_team;
      obj.protected = item.protected;
      this.$refs.editGroupDialog.show(item);
      this.$nextTick(() => {
        this.$refs.editGroupDialog.setData(obj);
        // console.log(this.$refs.editGroupDialog.getData());
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
          title: this.$t('_messages.deleteSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.deleteGroupDialog.setError(err);
      });
    },
    async editGroup(group) {
      const data = this.$refs.editGroupDialog.getData();

      data.properties = this.formatProperties(data);
      data.negative_properties = this.formatNegativeProperties(data);
      // delete data.advanced_properties;
      data.max_ban_length = data.max_ban_length * 60 * 60 * 24;

      (await openapi).group_editGroup(group.id, data)
        .then(() => {
          this.fetchData();
          this.$refs.editGroupDialog.closeAndReset();
          this.$notify({
            title: this.$t('_messages.editSuccess'),
            type: 'success',
          });
        }).catch((err) => {
          this.$refs.editGroupDialog.setError(err);
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
    async copyGroup(group) {
      const data = { ...group };
      delete data.id;
      data.name = `${data.name} (Copy)`;
      const allProps = Object.keys(group.properties);
      data.properties = allProps.filter((x) => !this.advancedProps.includes(x));
      data.properties = this.formatProperties(data);
      this.addGroup(data);
      this.fetchData();
    },
  },
};
</script>

<style>

.no-padding table tr td {
  padding: 5px !important;
}

.no-padding table {
  border-collapse: collapse !important;
  border-spacing: 0 !important;
}
</style>
