<template>
  <v-card :class="$vuetify.breakpoint.mdAndUp ? '' : 'transparent'" class="vh-new-users" flat>
    <v-card-text>
      <div class="text-center text-h3 pb-5">
        {{ $t('_user.labels.newUsers') }}
      </div>
      <div class="d-flex flex-row flex-wrap justify-center" v-if="newUsers != null">
        <div class="pa-3" v-for="u in newUsers" v-bind:key="u.id">
          <v-card class="text-center" width="250px"
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
      <v-row v-else>
        <v-col>
          <v-skeleton-loader></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import openapi from '../../api/openapi';

export default {
  name: 'NewUsers',
  props: {
    limit: {
      type: Number,
      default: 6,
    },
  },
  data() {
    return {
      newUsers: null,
    };
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
.avatar {
  border-color: var(--v-primary-base);
  border-style: solid;
  border-radius: 62px;
  margin-top: -75px;
  margin-left: auto;
  margin-right: auto;
}

.grow {
  transition: all .2s ease-in-out;
}
.grow:hover {
  transform: scale(1.05);
}
</style>
