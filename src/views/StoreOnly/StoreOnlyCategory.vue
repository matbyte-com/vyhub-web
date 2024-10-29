<script setup>
import {onMounted, ref, watch} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import openapiCached from "../../api/openapiCached";

onMounted(() => {
  fetchPackets();
})

const packets = ref(null);
const store = useStore();
const route = useRoute();

watch(() => route.params.categoryId, () => {
  packets.value = null;
  fetchPackets();
})

async function fetchPackets() {
  const packetsData = { category_id: route.params.categoryId };
  if (store.state.address != null) {
    packetsData.country_code = store.state.address.country.code;
  }

  (await openapiCached).shop_getPackets(packetsData).then((rsp) => {
    packets.value = rsp.data;
  });
}

</script>

<template>
  <div>
    <div>
      <div v-if="$store.getters.shopConfig.packet_list_view">
        <v-skeleton-loader
          v-for="index in 3"
          v-if="packets == null"
          :key="index"
          type="list-item"
          class="rounded-lg mb-2"
          height="82px"
        />
        <PacketListEntry
          v-for="packet in packets"
          :key="packet.id"
          class="mb-2"
          :packet="packet"
        />
      </div>
      <v-row v-else>
        <v-col
          v-for="index in 3"
          v-if="packets == null"
          :key="index"
          cols="12"
          sm="6"
          md="6"
          lg="4"
          xl="4"
        >
          <v-card>
            <v-skeleton-loader type="card" />
          </v-card>
        </v-col>
        <v-col
          v-for="packet in packets"
          :key="packet.id"
          cols="12"
          sm="6"
          md="6"
          lg="4"
          xl="4"
          class=""
        >
          <PacketCard :packet="packet" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<style scoped>

</style>
