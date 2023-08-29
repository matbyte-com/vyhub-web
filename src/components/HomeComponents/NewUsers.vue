<template>
  <v-card class="vh-new-users card-rounded" flat>
    <v-card-title class="pb-0">
      <CardTitle icon="mdi-account-arrow-right" :title="$t('_user.labels.newUsers')"/>
    </v-card-title>
    <v-card-text style="width: inherit" class="mt-3" v-if="newUsers != null">
      <v-row v-if="$vuetify.breakpoint.mdAndUp" style="width: inherit"
             :justify="$vuetify.breakpoint.smAndDown && newUsers.length !== 1 ? 'center' : 'start'">
        <v-col cols="4" md="6" lg="6" xl="3" v-for="u in newUsers" v-bind:key="u.id">
          <v-card
            class="vh-new-user-card"
            @click="$router.push({ name: 'UserDashboard', params: { id: u.id } })">
            <v-img :src="u.avatar" lazy-src="https://cdn.vyhub.net/vyhub/avatars/default.png" />
            <v-card-subtitle class="pa-2 text-center">
              {{ u.username }}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <div v-else class="d-flex justify-center" >
        <div style="width: 30%" v-for="u in newUsers.slice(0,3)" v-bind:key="u.id" class="mx-2">
          <v-card
            class="vh-new-user-card"
            @click="$router.push({ name: 'UserDashboard', params: { id: u.id } })">
            <v-img :src="u.avatar" lazy-src="https://cdn.vyhub.net/vyhub/avatars/default.png" />
            <v-card-subtitle class="pa-2 text-center">
              {{ u.username }}
            </v-card-subtitle>
          </v-card>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import openapi from '../../api/openapi';
import CardTitle from '../CardTitle.vue';

export default {
  name: 'NewUsers',
  components: { CardTitle },
  props: ['noIcon', 'noTitle', 'centerHeadline'],
  data() {
    return {
      newUsers: null,
    };
  },
  methods: {
    async fetchData() {
      const api = await openapi;

      api.user_getUsers({ limit: 4, sort: 'registered_on', desc: true }).then((rsp) => {
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

</style>
