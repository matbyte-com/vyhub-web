<template>
  <v-card class="vh-dashboard-packets card-rounded" flat>
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
              :key="userPacket.id" class="d-flex flex-column"
              cols="6" sm="4" md="6" lg="3" xl="6">
              <v-card @click="showUserPacketDetails(userPacket)" class="flex-grow-1" outlined>
                <v-img height="90" :src="userPacket.packet.image_url"
                       :style="(userPacket.active ? '' : 'filter: grayscale(100%)')">
                  <v-chip
                    small
                    v-if="!userPacket.active"
                    color="error"
                    class="ma-2" style="float: left; filter: none;">
                    <v-icon small>mdi-power</v-icon>
                  </v-chip>
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
    <Dialog :title="$t('_packet.labels.details')" icon="mdi-gift-open" v-model="packetDetailShown">
      <v-simple-table v-if="currentUserPacket != null">
        <tbody>
          <tr>
            <td>{{ $t('title') }}</td>
            <td>{{ currentUserPacket.packet.title }}</td>
          </tr>
          <tr>
            <td>{{ $t('active') }}</td>
            <td><BoolIcon :value="currentUserPacket.active" /></td>
          </tr>
          <tr>
            <td>{{ $t('_packet.labels.activeSince') }}</td>
            <td>{{ utils.formatDate(currentUserPacket.begin) }}</td>
          </tr>
          <tr>
            <td>{{ $t('_packet.labels.activeUntil') }}</td>
            <td>{{ utils.formatDate(currentUserPacket.end) }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </Dialog>
  </v-card>
</template>

<script>
import openapi from '@/api/openapi';
import DataIterator from '../DataIterator.vue';
import Dialog from '../Dialog.vue';
import BoolIcon from '../BoolIcon.vue';

export default {
  name: 'Packets.vue',
  components: { BoolIcon, DataIterator, Dialog },
  data() {
    return {
      userPackets: [],
      currentUserPacket: null,
    };
  },
  props: {
    user: Object,
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).user_getPackets({ uuid: this.user.id }).then((rsp) => {
        this.userPackets = rsp.data;
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
    showUserPacketDetails(userPacket) {
      this.currentUserPacket = userPacket;
    },
  },
  computed: {
    packetDetailShown: {
      get() {
        return this.currentUserPacket != null;
      },
      set(newValue) {
        if (!newValue) {
          this.currentUserPacket = null;
        }
      },
    },
  },
  watch: {
    user() {
      this.fetchData();
    },
  },
};
</script>

<style scoped>

</style>
