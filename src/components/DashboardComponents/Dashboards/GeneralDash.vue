<template>
  <div>
    <v-row>
      <v-col cols="12" md="5" lg="4" xl="3" order-md="1" order-sm="1" order="1">
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
      <v-col cols="12" md="7" lg="8" xl="9" order-sm="2" order-md="2"  order="2">
        <v-row>
          <v-col cols="12" xl="8" class="d-flex">
            <AttributeGraph :user="user" class="flex-md-grow-1"/>
          </v-col>
          <v-col cols="12" xl="4" class="d-flex">
            <UserPackets :user="user" class="flex-md-grow-1"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xl="6">
            <v-row>
              <v-col>
                <UserGroups :user="user"/>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" xl="6">
            <v-row v-if="$store.getters.isLoggedIn && $checkLinked($store.getters.user, user) ||
                  ($checkProp('ban_show') && $checkProp('warning_show'))">
              <v-col>
                <BansAndWarnings :user="user"/>
              </v-col>
            </v-row>
            <v-row v-if="$checkProp('user_log') || $checkProp('user_comment_show')">
              <v-col>
                <v-card flat class="card-rounded">
                  <v-tabs grow>
                    <v-tab v-if="$checkProp('user_comment_show')">
                      <v-icon left>
                        mdi-comment
                      </v-icon>
                      {{ $t('comments') }}
                    </v-tab>
                    <v-tab v-if="$checkProp('user_log')">
                      <v-icon left>
                        mdi-format-list-bulleted
                      </v-icon>
                      {{ $t('logs') }}
                    </v-tab>
                    <v-tab-item v-if="$checkProp('user_comment_show')">
                      <UserComments :user="user"/>
                    </v-tab-item>
                    <v-tab-item v-if="$checkProp('user_log')">
                      <UserLogEntries :user="user"/>
                    </v-tab-item>
                  </v-tabs>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import UserGroups from '@/components/DashboardComponents/UserGroups.vue';
import LinkedAccounts from '@/components/DashboardComponents/LinkedAccounts.vue';
import UserPackets from '@/components/DashboardComponents/UserPackets.vue';
import ProfilePicture from '@/components/DashboardComponents/ProfilePicture.vue';
import AttributeGraph from '@/components/DashboardComponents/AttributeGraph.vue';
import UserComments from '@/components/DashboardComponents/UserComments.vue';
import BansAndWarnings from '../BansAndWarnings.vue';
import UserLogEntries from '../UserLogEntries.vue';

export default {
  name: 'General.vue',
  components: {
    UserComments,
    UserLogEntries,
    BansAndWarnings,
    AttributeGraph,
    ProfilePicture,
    LinkedAccounts,
    UserPackets,
    UserGroups,
  },
  props: {
    user: Object,
  },
};
</script>

<style scoped>

</style>
