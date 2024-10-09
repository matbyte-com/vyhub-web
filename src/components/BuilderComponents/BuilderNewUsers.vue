<template>
  <div>
    <div
      v-if="newUsers != null"
      class="vh-home-new-users"
    >
      <div
        v-if="$vuetify.display.mdAndUp"
        class="d-flex flex-row flex-wrap justify-center"
      >
        <div
          v-for="u in newUsers"
          :key="u.id"
          class="pa-3"
        >
          <v-card
            class="text-center grow-on-hover card-rounded"
            width="250px"
            :to="{ name: 'UserDashboard', params: { id: u.id } }"
          >
            <v-img
              height="125"
              style="filter: blur(2px) brightness(80%);"
              :src="u.avatar"
              lazy-src="https://cdn.vyhub.net/vyhub/avatars/default.png"
            />
            <v-img
              height="125px"
              width="125px"
              class="avatar"
              :src="u.avatar"
              lazy-src="https://cdn.vyhub.net/vyhub/avatars/default.png"
            />
            <div class="text-h5 pa-3">
              {{ u.username }}
            </div>
          </v-card>
        </div>
      </div>
      <Swiper
        v-else
        :number-of-elements="newUsers.length"
        :per-page-custom="[1,2,3,4]"
      >
        <swiper-slide
          v-for="u in newUsers"
          :key="u.id"
        >
          <div class="pa-2">
            <v-card
              class="text-center grow-on-hover card-rounded"
              :to="{ name: 'UserDashboard', params: { id: u.id } }"
            >
              <v-img
                height="125"
                style="filter: blur(2px) brightness(80%);"
                :src="u.avatar"
                lazy-src="https://cdn.vyhub.net/vyhub/avatars/default.png"
              />
              <v-img
                height="125px"
                width="125px"
                class="avatar"
                :src="u.avatar"
                lazy-src="https://cdn.vyhub.net/vyhub/avatars/default.png"
              />
              <div class="text-h5 pa-3">
                {{ u.username }}
              </div>
            </v-card>
          </div>
        </swiper-slide>
      </Swiper>
    </div>
    <div v-else>
      <v-row justify="center">
        <v-col
          v-for="i in 4"
          :key="i"
        >
          <v-skeleton-loader type="card" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import openapi from '../../api/openapi';

export default {
  props: {
    limit: {
      type: Number,
      default: 4,
    },
  },
  data() {
    return {
      newUsers: null,
    };
  },
  watch: {
    limit() {
      this.fetchData();
    },
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const api = await openapi;

      api.user_getUsers({ size: this.limit, sort_by: 'registered_on', sort_desc: true }).then((rsp) => {
        this.newUsers = rsp.data.items;
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
  },
};
</script>

<style scoped>
.grow-on-hover {
  transition: all .2s ease-in-out;
}
.grow-on-hover:hover {
  transform: scale(1.05);
}

.avatar {
  border-color: rgb(var(--v-theme-primary));
  border-style: solid;
  border-radius: 62px;
  margin-top: -75px;
  margin-left: auto;
  margin-right: auto;
}
</style>
