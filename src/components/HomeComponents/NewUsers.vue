<template>
  <v-card
    class="vh-new-users card-rounded"
    flat
    :border="outlined"
  >
    <v-card-title class="pb-0">
      <CardTitle
        icon="mdi-account-arrow-right"
        :title="$t('_user.labels.newUsers')"
      />
    </v-card-title>
    <v-card-text
      v-if="newUsers != null"
      style="width: inherit"
      class="mt-3"
    >
      <v-row
        v-if="$vuetify.display.mdAndUp"
        style="width: inherit"
        :justify="$vuetify.display.smAndDown && newUsers.length !== 1 ? 'center' : 'start'"
      >
        <v-col
          v-for="u in newUsers"
          :key="u.id"
          cols="4"
          md="6"
          lg="6"
          xl="3"
        >
          <v-card
            border
            class="vh-new-user-card"
            @click="$router.push({ name: 'UserDashboard', params: { id: u.id } })"
          >
            <v-img
              :src="u.avatar"
              lazy-src="https://cdn.vyhub.net/vyhub/avatars/default.png"
            />
            <v-card-subtitle class="pa-2 text-center">
              {{ u.username }}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <div
        v-else
        class="d-flex justify-center"
      >
        <div
          v-for="u in newUsers.slice(0,3)"
          :key="u.id"
          style="width: 30%"
          class="mx-2"
        >
          <v-card
            border
            class="vh-new-user-card"
            @click="$router.push({ name: 'UserDashboard', params: { id: u.id } })"
          >
            <v-img
              :src="u.avatar"
              lazy-src="https://cdn.vyhub.net/vyhub/avatars/default.png"
            />
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
  props: ['noIcon', 'noTitle', 'centerHeadline', 'outlined'],
  data() {
    return {
      newUsers: null,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const api = await openapi;

      api.user_getUsers({ size: 4, sort_by: 'registered_on', sort_desc: true }).then((rsp) => {
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

</style>
