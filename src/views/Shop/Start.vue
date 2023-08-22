<template>
  <div>
    <v-row>
      <v-col cols="12" md="8" lg="9" class="d-flex flex-column align-content-space-between">
        <PageTitleFlat :title="$t('_shop.shopTitle')" />
        <v-card class="card-rounded mt-4" v-if="$vuetify.breakpoint.smAndDown">
          <ShopStatsSide />
        </v-card>
        <v-card class="card-rounded mt-4 flex-grow-1" flat>
          <v-card-text>
            <div class="d-flex">
              <h2 class="text-h5">{{ $t('categories') }}</h2>
              <v-divider class="ml-3 mb-1 divider-strong align-self-end"/>
            </div>
            <v-row v-if="categories" class="mt-1">
              <v-col cols="6" xl="4" lg="4" md="6" sm="4" v-for="category in categories"
                     :key="category.id"
                     class="d-flex align-content-space-between">
                <v-card :to=" { name: 'ShopCategory',
           params: {categoryId: category.id }}" color="transparent" flat tile
                        class="flex-grow-1 flex-column d-flex bordered">
                  <v-img
                    :src="category.image_url" class="ma-2"
                    max-height="300px" />
                  <div class="d-flex align-center mx-2 mb-2 justify-center">
                    <v-spacer v-if="$vuetify.breakpoint.smAndDown"/>
                    <h3 class="text-h6">{{ category.name }}</h3>
                    <v-spacer />
                    <v-btn tile depressed color="primary" v-if="!$vuetify.breakpoint.smAndDown">
                      <span v-if="$vuetify.breakpoint.lgAndUp">{{ $t('viewMore') }}</span>
                      <span v-else>{{ $t('view') }}</span>
                    </v-btn>
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col xl="3" lg="4" md="6" sm="12" v-if="!categories">
                <v-skeleton-loader type="card"/>
              </v-col>
              <v-col xl="3" lg="4" md="6" sm="12" v-if="!categories">
                <v-skeleton-loader type="card"/>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" lg="3" class="d-flex flex-column">
        <v-card class="card-rounded" v-if="!$vuetify.breakpoint.smAndDown" flat>
          <ShopStatsSide />
        </v-card>
        <v-card class="card-rounded mt-6" flat>
          <RecommendedPacketsSide />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import RecommendedPacketsSide from '@/components/ShopComponents/RecommendedPacketsSide.vue';
import ShopStatsSide from '@/components/ShopComponents/ShopStatsSide.vue';
import PageTitleFlat from '@/components/PageTitleFlat.vue';
import openapi from '../../api/openapi';

export default {
  components: { PageTitleFlat, ShopStatsSide, RecommendedPacketsSide },
  data() {
    return {
      categories: null,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const api = await openapi;

      api.packet_getCategories()
        .then((rsp) => {
          this.categories = rsp.data.filter((cat) => cat.enabled);
        });
    },
  },
};
</script>

<style scoped>
.bordered {
  border: 1px solid black !important;
}
</style>
