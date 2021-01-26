<template>
  <div>
    <PageTitle :title="$t('settings.labels.groupSettings')" />
    <v-tabs v-model="tab">
      <v-tab v-for="tab in bundles" :key="tab.id">
        {{ tab.name }}
      </v-tab>
    </v-tabs>
    <div class="mt-2">
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="tab in bundles" :key="tab.id">
          {{ tab.name }}
          <v-data-table
            :headers="headers"
            :items="getGroupsByBundle(tab.id)">
              <template v-slot:item.properties="{ item }">
                <v-chip v-for="(prop, index) in item.properties" :key="index" small color="primary">
                  {{ prop.name }}
                </v-chip>
              </template>
          </v-data-table>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';
import api from '@/api/api';

export default {
  name: 'Groups',
  components: {
    PageTitle,
  },
  data() {
    return {
      groups: [],
      bundles: [],
      tab: null,
      headers: [
        { text: '__Name', value: 'name' },
        { text: '__Permission_Level', value: 'permission_level' },
        { text: '__Member Count', value: '' },
        { text: '__properties', value: 'properties' },
      ],
    };
  },
  beforeMount() {
    api.server.getGroups().then((response) => { this.groups = response.data; });
    api.server.getBundles().then((response) => { this.bundles = response.data; });
  },
  methods: {
    getGroupsByBundle(bundleId) {
      return this.groups.filter((g) => g.serverbundle_id === bundleId);
    },
  },
};
</script>

<style scoped>

</style>
