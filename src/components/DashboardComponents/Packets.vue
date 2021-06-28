<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-2">mdi-gift-open</v-icon>
      {{ $t('packets') }}
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text>
      <DataIterator :items="userPackets" :showPageSelector="false">
        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="userPacket in props.items"
              :key="userPacket.id"
              cols="12"
              lg="6"
            >
              <v-card>
                <v-img height="90" :src="userPacket.packet.image_url">
                </v-img>
                <v-card-subtitle class="pa-2 text-center">
                  {{ userPacket.packet.title }}
                </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </DataIterator>
    </v-card-text>
  </v-card>
</template>

<script>
import api from '@/api/api';
import DataIterator from '../DataIterator.vue';

export default {
  name: 'Packets.vue',
  components: { DataIterator },
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
