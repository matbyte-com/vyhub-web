<template>
  <v-card class="flex-grow-1">
    <v-card-title>
      <v-icon class="mr-2">mdi-gift-open</v-icon>
      {{ $t('packets') }}
      <v-spacer></v-spacer>
      <v-btn outlined color="success" @click="$router.push({ name: 'UserPurchases',
      params: { id: user.id} })">
        <v-icon left>mdi-history</v-icon>
        <span>{{ $t("purchases") }}</span>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-list dense class="mt-3">
        <v-list-item v-for="userPacket in userPackets" v-bind:key="userPacket.id">
          {{ userPacket.packet.title }}
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import api from '@/api/api';

export default {
  name: 'Packets.vue',
  data() {
    return {
      userPackets: [],
    };
  },
  props: {
    user: Object,
  },
  beforeMount() {
    this.queryData();
  },
  methods: {
    queryData() {
      api.user.getPackets(this.user.id).then((rsp) => {
        this.userPackets = rsp.data;
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
  },
  watch: {
    $route() {
      this.queryData();
    },
  },
};
</script>

<style scoped>

</style>
