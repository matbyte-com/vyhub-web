<template>
  <div>
    <v-row>
      <v-col cols="12" md="5" lg="4" xl="3" order-md="1" order-sm="1" order="1">
        <v-row>
          <v-col>
            <ProfilePicture :user="user" @user-updated="userUpdated">
              <BansAndWarnings :user="user"
                               v-if="$store.getters.isLoggedIn &&
                             $checkLinked($store.getters.user, user) ||
                  ($checkProp('ban_show') && $checkProp('warning_show'))" />
            </ProfilePicture>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <LinkedAccounts :user="user"/>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="7" lg="8" xl="9" order-sm="2" order-md="2" order="2">
        <v-row>
          <v-col cols="12" xl="8" class="d-flex">
            <AttributeGraph :user="user" class="flex-md-grow-1"/>
          </v-col>
          <v-col cols="12" xl="4" class="d-flex">
            <Packets :user="user" class="flex-md-grow-1"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xl="6">
            <v-row>
              <v-col>
                <Groups :user="user"/>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" xl="6">
            <v-row v-if="forumEnabled">
              <v-col>
                <UserForumStats :user="user"/>
              </v-col>
            </v-row>
            <v-row v-if="$checkProp('user_log_show') || $checkProp('user_comment_show')
            || isCurrentUser">
              <v-col>
                <v-card flat class="card-rounded">
                  <v-tabs grow>
                    <v-tab
                      v-if="$checkProp('user_comment_show') || isCurrentUser">
                      <v-icon left>
                        mdi-comment
                      </v-icon>
                      {{ $t('comments') }}
                    </v-tab>
                    <v-tab v-if="$checkProp('user_log_show')">
                      <v-icon left>
                        mdi-format-list-bulleted
                      </v-icon>
                      {{ $t('logs') }}
                    </v-tab>
                    <v-tab-item
                      v-if="$checkProp('user_comment_show') || isCurrentUser">
                      <UserComments :readOnly="isCurrentUser && !$checkProp('user_comment_show')"
                                    :user="user"/>
                    </v-tab-item>
                    <v-tab-item v-if="$checkProp('user_log_show')">
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
import Groups from '@/components/DashboardComponents/Groups.vue';
import LinkedAccounts from '@/components/DashboardComponents/LinkedAccounts.vue';
import Packets from '@/components/DashboardComponents/Packets.vue';
import ProfilePicture from '@/components/DashboardComponents/ProfilePicture.vue';
import AttributeGraph from '@/components/DashboardComponents/AttributeGraph.vue';
import UserComments from '@/components/DashboardComponents/UserComments.vue';
import UserForumStats from '@/components/DashboardComponents/UserForumStats.vue';
import BansAndWarnings from '../BansAndWarnings.vue';
import UserLogEntries from '../UserLogEntries.vue';

export default {
  name: 'General.vue',
  components: {
    UserForumStats,
    UserComments,
    UserLogEntries,
    BansAndWarnings,
    AttributeGraph,
    ProfilePicture,
    LinkedAccounts,
    Packets,
    Groups,
  },
  data() {
    return {
      isCurrentUser: false,
    };
  },
  props: {
    user: Object,
  },
  computed: {
    forumEnabled() {
      if (this.$store.getters.generalConfig
        && this.$store.getters.generalConfig.enable_forum) return true;
      return false;
    },
  },
  beforeMount() {
    this.isCurrentUser = this.user.id === this.$store.getters.user.id;
  },
  methods: {
    userUpdated() {
      this.$emit('user-updated');
    },
  },
};
</script>

<style scoped>

</style>
