<template>
  <div>
    <div class="d-flex flex-row flex-wrap justify-center" v-if="newUsers != null">
      <div class="pa-3" v-for="u in newUsers" v-bind:key="u.id">
        <v-card class="text-center grow" width="250px"
                :to="{ name: 'UserDashboard', params: { id: u.id } }">
          <v-img height="125" style="filter: blur(2px) brightness(80%);"
                 :src="u.avatar" lazy-src="https://cdn.vyhub.net/vyhub/avatars/default.png" />
          <v-img height="125px" width="125px" class="avatar"
                 :src="u.avatar" lazy-src="https://cdn.vyhub.net/vyhub/avatars/default.png" />
          <div class="text-h5 pa-3">
            {{ u.username }}
          </div>
        </v-card>
      </div>
    </div>
    <div v-else>
      <v-row justify="center">
        <v-col v-for="i in 4" :key="i">
          <v-skeleton-loader type="card" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import openapi from '../../api/openapi';

export default {
  name: 'NewUsers',
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
  methods: {
    async fetchData() {
      const api = await openapi;

      api.user_getUsers({ limit: this.limit, sort: 'registered_on', desc: true }).then((rsp) => {
        this.newUsers = rsp.data;
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
  },
  beforeMount() {
    this.fetchData();
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
  border-color: var(--v-primary-base);
  border-style: solid;
  border-radius: 62px;
  margin-top: -75px;
  margin-left: auto;
  margin-right: auto;
}
</style>
