<template>
  <v-card ref="Card" height="200px" width="200px" class="text-center d-flex align-center">
    <v-row justify="center" class="">
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-fade-transition mode="out-in">
            <v-avatar height="150px" width="150px" :key="avatarNum">
              <v-img :src="getAvatars[avatarNum]"/>
              <v-fade-transition>
                <v-overlay
                  v-if="hover"
                  absolute
                >
                  <p>{{ returnUserData.type }} </p>
                  <UserLink :outline="false" :user="returnUserData"/>
                </v-overlay>
              </v-fade-transition>
            </v-avatar>
          </v-fade-transition>
        </template>
      </v-hover>
    </v-row>
  </v-card>
</template>

<script>
import UserLink from '@/components/UserLink.vue';

export default {
  name: 'ProfilePicture.vue',
  components: { UserLink },
  data() {
    return {
      avatarNum: 0,
    };
  },
  props: {
    user: Object,
  },
  mounted() {
    this.cycleAvatar();
  },
  computed: {
    getAvatars() {
      if (this.user === []) { return []; }
      const avatars = [];
      avatars.push(this.user.avatar);
      this.user.linked_users.forEach((u) => {
        avatars.push(u.avatar);
      });
      return avatars;
    },
    returnUserData() {
      if (this.user === []) { return []; }
      if (this.avatarNum === 0) {
        return this.user;
      }
      return this.user.linked_users[this.avatarNum - 1];
    },
  },
  methods: {
    cycleAvatar() {
      setTimeout(() => {
        if (this.avatarNum === this.getAvatars.length - 1) {
          this.avatarNum = 0;
        } else {
          this.avatarNum += 1;
        }
        this.cycleAvatar();
      }, 4000);
    },
  },
};
</script>

<style scoped>

</style>
