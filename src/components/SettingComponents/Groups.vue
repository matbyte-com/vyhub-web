<template>
  <div>
    <v-card flat>
      <DialogForm
        ref="addGroupDialog"
        :form-schema="addGroupSchema"
        @submit="addGroup"
        :title="$t('settings.labels.addGroup')"/>
      <DialogForm
        ref="editGroupDialog"
        :form-schema="editGroupSchema"
        @submit="editGroup"
        :title="$t('settings.labels.editGroup')"/>
      <DeleteConfirmationDialog
        ref="deleteGroupDialog"
        @submit="deleteGroup"/>
      <v-card-title>
        {{ $t('groups') }}
      </v-card-title>
      <v-tabs v-model="tab">
        <v-tab v-for="tab in bundles" :key="tab.id" :style="'color:' + tab.color">
          <v-icon v-if="tab.icon" left :color="tab.color">{{ tab.icon }}</v-icon>
          {{ tab.name }}
        </v-tab>
      </v-tabs>
      <div class="mt-2">
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="tab in bundles" :key="tab.id">
            <v-card flat>
              <v-data-table
                :headers="headers"
                :items="getGroupsByBundle(tab.id)"
                item-key="id">
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
                  <v-icon small class="mr-2" @click="openEditGroupDialog(item)">
                    mdi-pencil
                  </v-icon>
                  <v-icon small @click="openDeleteGroupDialog(item)">
                    mdi-delete
                  </v-icon>
                </template>
              </v-data-table>
              <v-card-actions>
                <v-btn text color="primary" @click="$refs.addGroupDialog.show()">
                  <v-icon left>mdi-plus</v-icon>
                  <span>{{ $t('settings.labels.addGroup') }}</span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </v-card>
  </div>
</template>

<script>
import api from '@/api/api';
import DialogForm from '@/components/DialogForm.vue';
import AddGroupForm from '@/forms/GroupAddForm';
import EditGroupForm from '@/forms/GroupEditForm';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog.vue';

export default {
  name: 'Groups',
  components: {
    DeleteConfirmationDialog,
    DialogForm,
  },
  data() {
    return {
      groups: [],
      bundles: [],
      tab: null,
      headers: [
        { text: this.$t('name'), value: 'name', width: '100px' },
        { text: this.$t('settings.permissionLevel'), value: 'permission_level', width: '150px' },
        { text: this.$t('settings.membercount'), value: '', width: '100px' },
        { text: this.$t('properties'), value: 'properties' },
        {
          text: this.$t('actions'), value: 'actions', width: '10px', sortable: false,
        },
      ],
      addGroupSchema: AddGroupForm,
      editGroupSchema: EditGroupForm,
    };
  },
  beforeMount() {
    api.group.getGroups().then((response) => { this.groups = response.data; });
    api.server.getBundles().then((response) => { this.bundles = response.data; });
  },
  methods: {
    getGroupsByBundle(bundleId) {
      return this.groups.filter((g) => g.serverbundle_id === bundleId);
    },
    addGroup() {
      const data = this.$refs.addGroupDialog.getData();

      api.group.addGroup(
        data.name,
        data.permissionLevel,
        data.serverbundle.id,
        data.color,
      ).then(() => {
        api.group.getGroups().then((response) => { this.groups = response.data; });
        this.$refs.addGroupDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.addGroupDialog.setErrorMessage(err.response.data.detail);
      });
    },
    openEditGroupDialog(item) {
      const obj = {};
      obj.name = item.name;
      obj.permissionLevel = item.permission_level;
      obj.color = item.color;
      obj.serverbundle = item.serverbundle_id;
      obj.groupProperties = Object.keys(item.properties);
      this.$refs.editGroupDialog.show(item);
      this.$refs.editGroupDialog.setData(obj);
    },
    openDeleteGroupDialog(item) {
      this.$refs.deleteGroupDialog.show(item);
    },
    deleteGroup(item) {
      api.group.deleteGroup(item.id).then(() => {
        this.$refs.deleteGroupDialog.cancel();
        api.group.getGroups().then((response) => { this.groups = response.data; });
      }).catch((err) => {
        this.$refs.deleteGroupDialog.setErrorMessage(err.response.data.detail);
      });
    },
    editGroup(group) {
      const data = this.$refs.editGroupDialog.getData();
      api.group.editGroup(
        group.id,
        data.name,
        data.permissionLevel,
        data.serverbundle.id,
        data.color,
        data.groupProperties,
      )
        .then(() => {
          api.group.getGroups().then((response) => { this.groups = response.data; });
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
