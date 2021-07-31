<template>
  <v-card :class="$vuetify.breakpoint.mdAndUp ? '' : 'transparent'" flat>
    <v-card-title class="pb-0">
      <v-row>
        <v-col cols="12" class="d-flex align-center">
          <HeadlineSidebar :title="$t('_user.labels.newUsers')" icon="mdi-account-arrow-right"/>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row v-if="newUsers != null">
        <v-col cols="6" md="6" lg="6" xl="3" v-for="u in newUsers" v-bind:key="u.id">
          <v-card
            class="mt-2" @click="$router.push({ name: 'UserDashboard', params: { id: u.id } })">
            <v-img :src="u.avatar"></v-img>
            <v-card-subtitle class="pa-2 text-center">
              {{ u.username }}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col>
          <v-skeleton-loader></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import HeadlineSidebar from './HeadlineSidebar.vue';
import openapi from '../../api/openapi';

export default {
  name: 'NewUsers',
  components: { HeadlineSidebar },
  data() {
    return {
      newUsers: null,
    };
  },
  methods: {
    async queryData() {
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
    this.queryData();
  },
};
</script>

<style scoped>

</style>
