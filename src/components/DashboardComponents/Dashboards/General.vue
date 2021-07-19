<template>
  <div>
    <v-row>
      <v-col cols="12" md="4" xl="4" class="d-flex">
        <Packets :user="user" class="flex-md-grow-1" />
      </v-col>
      <v-col cols="12" md="8" xl="6" class="d-flex">
        <AttributeGraph :user="user" class="flex-md-grow-1" />
      </v-col>
      <v-col md="5" cols="12" class="d-flex">
        <Groups :user="user" />
      </v-col>
      <v-col cols="6" md="3">
        <ProfilePicture :user="user"/>
      </v-col>
      <v-col>
        <LinkedAccounts :user="user" />
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
    user: Object,
  },
};
</script>

<style scoped>

</style>
