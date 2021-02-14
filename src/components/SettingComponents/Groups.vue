<template>
  <div>
    <v-card-title>
      {{ $t('groups') }}
    </v-card-title>
    <v-tabs v-model="tab">
      <v-tab v-for="tab in bundles" :key="tab.id">
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
                <div :style="{ color: item.color }">
                  {{ item.name }}
                </div>
              </template>
              <template v-slot:item.properties="{ item }">
                <v-chip v-for="(prop, index) in item.properties" :key="index" small color="primary">
                  {{ prop.name }}
                </v-chip>
              </template>
            </v-data-table>
            <v-card-actions>
              <v-btn text color="primary">
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

export default {
  name: 'Groups',
  components: {
  },
  data() {
    return {
      groups: [],
      bundles: [],
      tab: null,
      headers: [
        { text: this.$t('name'), value: 'name' },
        { text: this.$t('settings.permissionlevel'), value: 'permission_level' },
        { text: this.$t('settings.membercount'), value: '' },
        { text: this.$t('properties'), value: 'properties' },
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
