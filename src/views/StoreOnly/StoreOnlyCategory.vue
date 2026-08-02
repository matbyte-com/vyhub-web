<script setup>
import {computed, onMounted, ref, watch} from "vue";
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
  const packetsData = {category_id: route.params.categoryId};
  if (store.state.address != null) {
    packetsData.country_code = store.state.address.country.code;
  }

  (await openapiCached).shop_getPackets(packetsData).then((rsp) => {
    packets.value = rsp.data;
  });
}

const subcategories = computed(() => {
  const cats = {};
  if (packets.value == null) {
    return {};
  }

  packets.value.forEach((packet) => {
    const subcat = packet.subcategory || '';

    cats[subcat] = cats[subcat] || [];
    cats[subcat].push(packet);
  });

  const ordered_cats = Object.keys(cats).sort().reduce(
    (obj, key) => {
      const newobj = obj;
      newobj[key] = cats[key];
      return newobj;
    },
    {},
  );

  return ordered_cats;
})

</script>

<template>
  <div>
    <div>
      <div v-if="store.state.shopConfig.packet_list_view">
        <template v-if="packets == null">
          <v-skeleton-loader
            v-for="index in 3"
            :key="index"
            type="list-item"
            class="rounded-lg mb-2"
            height="82px"
            elevation="3"
          />
        </template>
        <div
          v-for="subcategory in Object.keys(subcategories)"
          :key="subcategory"
        >
          <div
            v-if="subcategory !== ''"
            class="mb-2 mt-3 d-flex align-center "
          >
            <div class="text-h6 font-weight-bold text-no-wrap mr-3">
              {{ subcategory }}
            </div>
            <v-divider />
          </div>
          <PacketListEntry
            v-for="packet in subcategories[subcategory]"
            :key="packet.id"
            class="mb-2"
            :packet="packet"
          />
        </div>
        <!-- <PacketListEntry
          v-for="packet in packets"
          :key="packet.id"
          class="mb-2"
          :packet="packet"
        />-->
      </div>
      <div v-else>
        <v-row v-if="packets == null">
          <v-col
            v-for="index in 3"
            :key="index"
            cols="12"
            sm="6"
            md="6"
            lg="4"
            xl="4"
          >
            <v-card>
              <v-skeleton-loader
                type="card"
                elevation="3"
              />
            </v-card>
          </v-col>
        </v-row>
        <div
          v-for="subcategory in Object.keys(subcategories)"
          :key="subcategory"
        >
          <div
            v-if="subcategory !== ''"
            class="mb-2 mt-3 d-flex align-center "
          >
            <div class="text-h6 font-weight-bold text-no-wrap mr-3">
              {{ subcategory }}
            </div>
            <v-divider />
          </div>
          <v-row class="">
            <v-col
              v-for="packet in subcategories[subcategory]"
              :key="packet.id"
              cols="12"
              sm="6"
              md="6"
              lg="4"
              xl="4"
              class=""
            >
              <PacketCard
                :no-information-icon="['md', 'lg']"
                :packet="packet"
              />
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
