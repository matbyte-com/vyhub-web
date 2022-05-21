<template>
  <div>
    <PageTitle icon="mdi-server" :title="server.name" />
    <v-card>
      <v-row>
        <v-col>
          <span v-if="server.status !== 'UNKNOWN'">
                <a>
                  <span v-if="server.type !== 'DISCORD'">
                    <span v-if="server.users_current != null">
                    {{ server.users_current }}
                  </span>
                  <span v-else>
                    ?
                  </span>
                  /
                  </span>
                  <span v-if="server.users_max != null">
                    {{ server.users_max }}
                  </span>
                  <span v-else>
                    ?
                  </span>
                </a>
              </span>
        </v-col>
        <v-col></v-col>
        <v-col></v-col>
      </v-row>
    </v-card>
    <v-card>
      Serevr Dashboard
    </v-card>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';

export default {
  name: 'ServerDashboard',
  components: { PageTitle },
  data() {
    return {
      server: null,
    };
  },
};
</script>

<style scoped>

</style>
