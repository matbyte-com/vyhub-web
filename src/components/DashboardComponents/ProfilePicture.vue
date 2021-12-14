<template>
  <v-card class="text-center">
    <v-card-text>
      <v-row justify="center">
        <v-hover v-if="activeUser != null">
          <template v-slot:default="{ hover }">
            <v-fade-transition mode="out-in">
              <v-avatar class="ma-1" height="200px" width="200px" :key="activeUser.id">
                <v-img :src="activeUser.avatar"/>
                <v-fade-transition>
                  <v-overlay
                    v-if="hover"
                    absolute
                  >
                    <p>{{ activeUser.type }} </p>
                    <UserLink :disabled-link="true" :outline="false" :user="activeUser"/>
                  </v-overlay>
                </v-fade-transition>
              </v-avatar>
            </v-fade-transition>
          </template>
        </v-hover>
        <v-progress-circular
          v-else
          indeterminate
        ></v-progress-circular>
      </v-row>
      <v-row v-if="user.admin">
        <v-col>
          <v-alert
            dense
            text
            color="success"
            outlined
            class="font-weight-bold"
          >
            <v-icon color="success">
              mdi-shield-account
            </v-icon>
            Admin
          </v-alert>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import UserLink from '@/components/UserLink.vue';

export default {
  name: 'ProfilePicture.vue',
  components: { UserLink },
  data() {
    return {
      userNum: 0,
    };
  },
  props: {
    user: Object,
  },
  mounted() {
    this.cycleAvatar();
  },
  computed: {
    users() {
      if (this.user === null) {
        return null;
      }

      return [this.user].concat(this.user.linked_users);
    },
    activeUser() {
      if (this.users == null || this.userNum >= this.users.length) {
        return null;
      }

      return this.users[this.userNum];
    },
  },
  watch: {
    users() {
      this.userNum = 0;
    },
  },
  methods: {
    cycleAvatar() {
      setTimeout(() => {
        this.userNum = (this.userNum + 1) % this.users.length;

        this.cycleAvatar();
      }, 4000);
    },
  },
};
</script>

<style scoped>

</style>
