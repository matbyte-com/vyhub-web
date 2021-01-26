<template>
  <div>
    <PageTitle :title="'__ServerSettings'" />
    <v-row>
      <v-col>
        <v-card outlined flat>
          <h2>Bundles</h2>
          <v-data-table
            :headers="bundleHeaders"
            :items="bundles">
          </v-data-table>
          <v-card-actions>
            <v-btn text color="primary">
              <v-icon left>mdi-plus</v-icon>
              <span>__Add another Bundle</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <h2>Server</h2>
        <v-card outlined flat>
          Server
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';
import api from '@/api/api';

export default {
  name: 'Server',
  components: {
    PageTitle,
  },
  data() {
    return {
      bundles: [],
      server: [],
      bundleHeaders: [
        { text: '__Name', value: 'name' },
        { text: '__Typ', value: 'server_type' },
        { text: '__DefaultGroup', value: 'default_group_id' },
      ],
    };
  },
  beforeMount() {
    api.server.getBundles().then((rsp) => { this.bundles = rsp.data; });
  },
};
</script>

<style scoped>

</style>
