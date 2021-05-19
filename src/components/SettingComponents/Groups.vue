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
      @submit="editGroup"
      :title="$t('settings.labels.editGroup')"/>
    <DeleteConfirmationDialog
      ref="deleteGroupDialog"
      @submit="deleteGroup"/>
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
            :items="getGroupsByBundle(tab.id)">
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
                    </v-chip>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
              <v-chip v-else v-for="(prop, index) in item.properties" :key="index" small
                      color="primary" class="mr-1 mb-1">
                {{ prop.name }}
              </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
              <div class="text-right">
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
import SettingTitle from './SettingTitle.vue';

export default {
  name: 'Groups',
  components: {
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
      addGroupSchema: AddGroupForm,
      editGroupSchema: EditGroupForm,
    };
  },
  beforeMount() {
    this.fetchData();
    // api.group.getGroups().then((response) => { this.groups = response.data; });
    // api.server.getBundles().then((response) => { this.bundles = response.data; });
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
      return this.groups.filter((g) => g.serverbundle_id === bundleId);
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
      obj.name = item.name;
      obj.permission_level = item.permission_level;
      obj.color = item.color;
      obj.serverbundle = item.serverbundle_id;
      obj.properties = Object.keys(item.properties);
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
      (await openapi).group_editGroup(group.id, data)
        .then(() => {
          this.fetchData();
          this.$refs.editGroupDialog.closeAndReset();
        }).catch((err) => {
          this.$refs.editGroupDialog.setErrorMessage(err.response.data.detail);
        });
    },
  },
};
</script>

<style scoped>

</style>
