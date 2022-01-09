<template>
  <div>
    <v-row>
      <v-col cols="12" md="7" lg="8" xl="9" order-sm="2" order-md="1">
        <v-row>
          <v-col cols="12" xl="4" class="d-flex">
            <Packets :user="user" class="flex-md-grow-1"/>
          </v-col>
          <v-col cols="12" xl="8" class="d-flex">
            <AttributeGraph :user="user" class="flex-md-grow-1"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xl="6">
            <Groups :user="user"/>
          </v-col>
          <v-col cols="12" xl="6">
            <v-row v-if="$store.getters.isLoggedIn && $checkLinked($store.getters.user, user) ||
                  ($checkProp('ban_show') && $checkProp('warning_show'))">
              <v-col>
                <BansAndWarnings :user="user"/>
              </v-col>
            </v-row>
            <v-row v-if="$checkProp('user_log')">
              <v-col>
                <UserLogEntries :user="user"/>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="5" lg="4" xl="3" order-md="2" order-sm="1">
        <v-row>
          <v-col>
            <ProfilePicture :user="user"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <LinkedAccounts :user="user"/>
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
import BansAndWarnings from '../BansAndWarnings.vue';
import UserLogEntries from '../UserLogEntries.vue';

export default {
  name: 'General.vue',
  components: {
    UserLogEntries,
    BansAndWarnings,
    AttributeGraph,
    ProfilePicture,
    LinkedAccounts,
    Packets,
    Groups,
  },
  props: {
    user: Object,
  },
};
</script>

<style scoped>

</style>
