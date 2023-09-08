<template>
<div class="d-flex flex-column flex-grow-1">
  <PageTitleFlat :title="$t('_shop.shopTitle')"
                 :hide-triangle="$vuetify.breakpoint.smAndDown"
                 :no-bottom-border-radius="$vuetify.breakpoint.smAndDown"/>
  <v-card class="card-rounded-bottom flex-grow-1"
          :class="{ 'mt-4 card-rounded-top':!$vuetify.breakpoint.smAndDown,
           'no-top-border-radius': $vuetify.breakpoint.smAndDown }"
          flat>
    <v-card-text>
      <div class="d-flex">
        <h2 class="text-h5">{{ $t('categories') }}</h2>
        <v-divider class="ml-3 mb-1 divider-strong align-self-end"/>
      </div>
      <v-row v-if="categories" class="mt-1">
        <v-col cols="6" sm="4" md="6" lg="4" xl="4" v-for="category in categories"
               :key="category.id"
               class="d-flex align-content-space-between">
          <v-card :to=" { name: 'ShopCategory',
           params: {categoryId: category.id }}" color="" flat outlined
                  class="flex-grow-1 flex-column d-flex">
            <v-img
              :src="category.image_url" class="ma-1 img-rounded"
              max-height="300px" />
            <div class="d-flex align-center mx-1 mb-1 justify-center">
              <v-spacer v-if="$vuetify.breakpoint.smAndDown"/>
              <h3 class="text-h6">{{ category.name }}</h3>
              <v-spacer />
              <v-btn depressed color="primary" v-if="!$vuetify.breakpoint.smAndDown">
                <span v-if="$vuetify.breakpoint.lgAndUp">{{ $t('viewMore') }}</span>
                <span v-else>{{ $t('view') }}</span>
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="6" sm="4" md="6" lg="4" xl="4" v-if="!categories">
          <v-skeleton-loader type="card"/>
        </v-col>
        <v-col cols="6" sm="4" md="6" lg="4" xl="4" v-if="!categories">
          <v-skeleton-loader type="card"/>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</div>
</template>

<script>
import openapi from '@/api/openapi';
import PageTitleFlat from '@/components/PageTitleFlat.vue';

export default {
  name: 'Categories',
  components: { PageTitleFlat },
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
          // Redirect if there is only on category
          if (this.categories.length === 1) {
            this.$router.replace({ name: 'ShopCategory', params: { categoryId: this.categories[0].id } });
          }
        });
    },
  },
};
</script>

<style scoped>
.bordered {
  border: 1px solid grey !important;
}

.img-rounded {
  border-radius: 3px !important;
}
</style>
