<template>
  <v-row>
    <v-col md="4" sm="12"  class="d-flex">
      <Groups :server-bundles="serverBundles" />
    </v-col>
    <v-col md="3" sm="12" class="d-flex">
      <Packets />
    </v-col>
    <v-col class="d-flex">
      <LinkedAccounts />
    </v-col>
  </v-row>
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
