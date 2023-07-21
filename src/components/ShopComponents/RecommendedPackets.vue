<template>
<v-card class="vh-cart-recommended-packets"
        v-if="recommendedPackets !== null && recommendedPackets.length > 0">
  <v-card-title>
    <v-icon left>mdi-star-shooting</v-icon>
    {{ $t('_shop.labels.recommended') }}
  </v-card-title>
  <v-card-text>
    <v-row v-if="recommendedPackets">
      <v-col cols="6" md="6" lg="6" xl="3" v-for="p in recommendedPackets" :key="p.id">
        <PacketCard :packet="p" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="6" md="6" lg="6" xl="3" v-for="i in 4" :key="i">
        <v-skeleton-loader type="card" height="200" />
      </v-col>
    </v-row>
  </v-card-text>
</v-card>
</template>

<script>
import PacketCard from '@/components/ShopComponents/PacketCard.vue';

export default {
  name: 'RecommendedPackets',
  components: { PacketCard },
  props: ['recommendedPackets'],
};
</script>

<style scoped>

</style>
