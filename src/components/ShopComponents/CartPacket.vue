<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col lg="2" align-self="center" class="text-center">
          <v-img
            @click="showPacket"
            style="cursor: pointer;"
            :src="cartPacket.packet.image_url"
          ></v-img>
        </v-col>
        <v-col>
          <div class="text-h6" @click="showPacket" style="cursor: pointer;">
            {{ cartPacket.packet.title }}
          </div>
          <div class="subtitle-2" v-if="cartPacket.packet.subtitle">
            {{ cartPacket.packet.subtitle }}
          </div>
          <div class="body-2" v-if="showOutline">
            <ul>
              <li v-for="point in cartPacket.packet.abstract" :key="point">
                {{ point }}
              </li>
            </ul>
          </div>
        </v-col>
        <v-col :lg="priceCols" class="text-right" align-self="center">
          <v-row dense>
            <v-col :class="(cartPacket.discount ? 'green--text' : '')">
              <div class="text-h6">
                {{ cartPacket.price.total.toFixed(2).toLocaleString() }}
                {{ cartPacket.currency.symbol }}
              </div>
              <div v-if="cartPacket.discount">
                <span class="caption">
                  -{{ cartPacket.discount.percentage }}% {{ cartPacket.discount.name }}
                </span>
                <v-icon @click="$emit('removeDiscount')" v-if="showRemove" small>
                  mdi-close
                </v-icon>
              </div>
            </v-col>
          </v-row>
          <v-row dense v-if="cartPacket.price.credits">
            <v-col>
              <div class="subtitle-2">
                {{ cartPacket.price.credits }} {{ $t('_shop.labels.credits') }}
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col lg="1" align-self="center" class="text-center" v-if="showRemove">
          <v-btn fab outlined small color="error"
                 @click="$emit('remove')">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'CartPacket',
  props: {
    cartPacket: Object,
    showOutline: Boolean,
    showRemove: Boolean,
    priceCols: {
      type: Number,
      default: 2,
    },
  },
  methods: {
    showPacket() {
      this.$router.push({ name: 'ShopPacket', params: { packetId: this.cartPacket.packet.id } });
    },
  },
};
</script>

<style scoped>

</style>
