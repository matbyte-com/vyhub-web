<template>
  <div>
    <DialogForm
            ref="addGroupDialog"
            :form-model="addGroupModel"
            :form-schema="addGroupSchema"
            @submit="addGroup"
            :title="$t('settings.labels.addGroup')"/>
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
              :items="getGroupsByBundle(tab.id)">
              <template v-slot:item.name="{ item }">
                <v-chip :color="item.color ? item.color : '#000000'"
                        :text-color="$vuetify.theme.dark ? 'white' : 'black'"
                        outlined>
                  {{ item.name }}
                </v-chip>
              </template>
              <template v-slot:item.properties="{ item }">
                <v-chip v-for="(prop, index) in item.properties" :key="index" small color="primary">
                  {{ prop.name }}
                </v-chip>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editBundle(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="openDeleteBundleDialog(item)">
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
  </div>
</template>

<script>
import api from '@/api/api';
import DialogForm from '@/components/DialogForm.vue';
import AddGroupForm from '@/forms/AddGroupForm';

export default {
  name: 'Groups',
  components: {
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
        { text: this.$t('settings.membercount'), value: '' },
        { text: this.$t('properties'), value: 'properties' },
        { text: this.$t('actions'), value: 'actions', sortable: false },
      ],
      addGroupModel: {},
      addGroupSchema: AddGroupForm,
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
      ).then((rsp) => {
        api.group.getGroups().then((response) => { this.groups = response.data; });
        this.$refs.addGroupDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.addGroupDialog.setErrorMessage(err.response.data.detail);
      });
    },
  },
};
</script>

<style scoped>

</style>
