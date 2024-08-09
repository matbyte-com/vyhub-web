<template>
  <v-card class="vh-dashboard-packets card-rounded" flat>
    <v-tabs grow>
      <v-tab>
        <v-icon start>mdi-gift-open</v-icon>
        {{ $t('packets') }}
      </v-tab>
      <v-tab-item>
        <v-card class="card-rounded" flat style="background-color: transparent !important;">
          <v-card-text>
            <DataIterator :items="userPackets" :showPageSelector="false">
              <template v-slot:default="props">
                <v-row>
                  <v-col
                    v-for="userPacket in props.items"
                    :key="userPacket.id" class="d-flex flex-column"
                    cols="6" sm="4" md="6" lg="3" xl="6">
                    <v-card @click="showUserPacketDetails(userPacket)" class="flex-grow-1" border>
                      <PacketImage height="90" :packet="userPacket.packet"
                                   :style="(userPacket.active ? '' : 'filter: grayscale(100%)')">
                        <v-chip
                          size="small"
                          v-if="!userPacket.active"
                          color="error"
                          class="ma-2" style="float: left; filter: none;">
                          <v-icon size="small">mdi-power</v-icon>
                        </v-chip>
                      </PacketImage>
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
      </v-tab-item>
    </v-tabs>

    <Dialog :title="$t('_packet.labels.details')" icon="mdi-gift-open" v-model="packetDetailShown">
      <v-table v-if="currentUserPacket != null">
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
      </v-table>
    </Dialog>
  </v-card>
</template>

<script>
import openapi from '@/api/openapi';
import PacketImage from '@/components/ShopComponents/PacketImage.vue';
import DataIterator from '../DataIterator.vue';
import Dialog from '../Dialog.vue';
import BoolIcon from '../BoolIcon.vue';

export default {
  name: 'Packets.vue',
  components: {
    PacketImage, BoolIcon, DataIterator, Dialog,
  },
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
