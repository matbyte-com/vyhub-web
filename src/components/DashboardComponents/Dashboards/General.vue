<template>
  <div>
    <v-row>
      <v-col lg="10" md="9">
        <v-row>
          <v-col md="6" xl="4" class="d-flex">
            <Packets :user="user" class="flex-md-grow-1" />
          </v-col>
          <v-col md="12" xl="8" class="d-flex">
            <AttributeGraph :user="user" class="flex-md-grow-1" />
          </v-col>
        </v-row>
        <v-row>
          <v-col md="5" cols="12" class="d-flex">
            <Groups :user="user" />
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-row>
          <v-col>
            <ProfilePicture :user="user"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <LinkedAccounts :user="user" />
          </v-col>
        </v-row>
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
