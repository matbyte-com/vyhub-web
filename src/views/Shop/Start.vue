<template>
  <div>
    <v-card flat class="card-rounded mb-5" v-if="$vuetify.breakpoint.smAndDown">
      <ShopStatsSide />
    </v-card>
    <v-row>
      <v-col cols="12" md="8" lg="9" class="d-flex flex-column align-content-space-between">
        <transition enter-active-class="animate__fadeIn animate__animated"
                    leave-active-class="absolute">
          <router-view />
        </transition>
      </v-col>
      <v-col cols="12" md="4" lg="3" class="d-flex flex-column">
        <v-card class="card-rounded" v-if="!$vuetify.breakpoint.smAndDown" flat>
          <ShopStatsSide />
        </v-card>
        <v-card class="card-rounded" :class="{ 'mt-6':!$vuetify.breakpoint.smAndDown }" flat>
          <RecommendedPacketsSide />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import RecommendedPacketsSide from '@/components/ShopComponents/RecommendedPacketsSide.vue';
import ShopStatsSide from '@/components/ShopComponents/ShopStatsSide.vue';

export default {
  components: { ShopStatsSide, RecommendedPacketsSide },
};
</script>

<style scoped>
.absolute {
  position: absolute;
  opacity: 0;
}
</style>
