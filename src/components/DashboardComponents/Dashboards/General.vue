<template>
  <div>
    <v-row>
      <v-col cols="4">
        <v-card class="pa-3" max-width="600px">
          <Groups :server-bundles="serverBundles" />
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="ml-3 pa-3" max-width="600px">
          <Packets />
        </v-card>
      </v-col>
      <v-col>
        <v-card class="ml-3 pa-3" max-width="800px">
          <LinkedAccounts />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Groups from '@/components/DashboardComponents/Groups.vue';
import LinkedAccounts from '@/components/DashboardComponents/LinkedAccounts.vue';
import Packets from '@/components/DashboardComponents/Packets.vue';

export default {
  name: 'General.vue',
  components: {
    Groups,
    LinkedAccounts,
    Packets,
  },
  props: ['serverBundles'],
};
</script>

<style scoped>

</style>
