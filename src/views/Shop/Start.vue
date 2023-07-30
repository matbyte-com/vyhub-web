<template>
  <div>
    <PageTitle icon="mdi-sack" :title="$t('shop')"></PageTitle>
    <v-row v-if="categories">
      <v-col xl="3" lg="4" md="6" sm="12" v-for="category in categories" :key="category.id"
             class="d-flex align-content-space-between">
        <v-card @click="$router.push({ name: 'ShopCategory', params: {categoryId: category.id }})"
                class="flex-grow-1 flex-column d-flex">
          <v-img
            :src="category.image_url"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            max-height="300px" min-height="150px">
            <v-card-title>{{ category.name }}</v-card-title>
          </v-img>
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
  </div>
</template>

<script>
import PageTitle from '../../components/PageTitle.vue';
import openapi from '../../api/openapi';

export default {
  components: { PageTitle },
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

</style>
