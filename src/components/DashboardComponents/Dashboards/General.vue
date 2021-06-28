<template>
  <div>
    <v-row>
      <v-col md="4" cols="12"  class="d-flex">
        <Groups :user="user"  :server-bundles="serverBundles" />
      </v-col>
      <v-col md="3" cols="12" class="d-flex">
        <Packets :user="user"  />
      </v-col>
      <v-col class="d-flex">
        <LinkedAccounts :user="user" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <ProfilePicture :user="user"/>
      </v-col>
      <v-col cols="8">
        <AttributeGraph :user="user"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Groups from '@/components/DashboardComponents/Groups.vue';
import LinkedAccounts from '@/components/DashboardComponents/LinkedAccounts.vue';
import Packets from '@/components/DashboardComponents/Packets.vue';
import ProfilePicture from '@/components/DashboardComponents/ProfilePicture.vue';
import AttributeGraph from '@/components/DashboardComponents/AttributeGraph.vue';

export default {
  name: 'General.vue',
  components: {
    AttributeGraph,
    ProfilePicture,
    Groups,
    LinkedAccounts,
    Packets,
  },
  props: {
    serverBundles: Array,
    user: Object,
  },
};
</script>

<style scoped>

</style>
