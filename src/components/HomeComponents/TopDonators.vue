<template>
  <v-card :class="$vuetify.breakpoint.mdAndUp ? '' : 'transparent'" flat
          v-if="topDonators.length > 0">
    <v-card-title class="pb-0">
      <v-row>
        <v-col cols="12" class="d-flex align-center">
          <HeadlineSidebar :title="$t('_shop.labels.topDonators')" icon="mdi-podium"/>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <div class="d-flex align-center overflow-hidden mt-3">
        <span class="mr-2 subtitle-1">
          {{ topDonators[0].purchases_total }} {{ currency.symbol }}
        </span>
        <v-tooltip bottom v-for="(donator, index) in topDonators" :key="donator.user.id">
          <template v-slot:activator="{ on, attrs }">
            <router-link :to="{ name: 'UserDashboard',
                         params: {id: donator.user.id}}">
              <v-avatar size="55" v-bind="attrs"
                        v-on="on" :style="`margin-right: -10px; z-index: ${100-index}`">
                <img :src="donator.user.avatar" alt="Avatar">
              </v-avatar>
            </router-link>
          </template>
          <span>
            {{ donator.user.username }} {{ donator.purchases_total }} {{ currency.symbol }}
          </span>
        </v-tooltip>
        <span style="margin-left: 18px" class="subtitle-1">
          {{ topDonators[topDonators.length -1].purchases_total }} {{ currency.symbol }}
        </span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import HeadlineSidebar from '@/components/HomeComponents/HeadlineSidebar.vue';

export default {
  name: 'TopDonators',
  components: { HeadlineSidebar },
  props: ['topDonators', 'currency'],
};
</script>

<style scoped>

</style>
