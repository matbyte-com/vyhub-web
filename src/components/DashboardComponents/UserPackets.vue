<template>
  <v-card
    class="vh-dashboard-packets card-rounded"
    flat
  >
    <v-tabs
      v-model="tabs"
      grow
    >
      <v-tab>
        <v-icon start>
          mdi-gift-open
        </v-icon>
        {{ $t('packets') }}
      </v-tab>
    </v-tabs>
    <v-tabs-window>
      <v-tabs-window-item>
        <v-card
          class="card-rounded"
          flat
          style="background-color: transparent !important;"
        >
          <v-card-text>
            <DataIterator
              :items="userPackets"
              :show-page-selector="false"
            >
              <template #default="props">
                <v-row>
                  <v-col
                    v-for="userPacket in props.items"
                    :key="userPacket.id"
                    class="d-flex flex-column"
                    cols="6"
                    sm="4"
                    md="6"
                    lg="3"
                    xl="6"
                  >
                    <v-card
                      class="flex-grow-1"
                      border
                      @click="showUserPacketDetails(userPacket)"
                    >
                      <PacketImage
                        height="90"
                        :packet="userPacket.packet"
                        :style="(userPacket.active ? '' : 'filter: grayscale(100%)')"
                      >
                        <v-chip
                          v-if="!userPacket.active"
                          size="small"
                          color="error"
                          class="ma-2"
                          style="float: left; filter: none;"
                        >
                          <v-icon size="small">
                            mdi-power
                          </v-icon>
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
      </v-tabs-window-item>
    </v-tabs-window>

    <Dialog
      v-model="packetDetailShown"
      :title="$t('_packet.labels.details')"
      icon="mdi-gift-open"
    >
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

export default {
  props: {
    user: Object,
  },
  data() {
    return {
      tabs: null,
      userPackets: [],
      currentUserPacket: null,
    };
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
};
</script>

<style scoped>

</style>
