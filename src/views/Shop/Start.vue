<template>
  <div>
    <PageTitle :title="$t('shop')"></PageTitle>
    <v-row>
      <v-col xl="3" lg="4" md="6" sm="12" v-for="category in categories" :key="category.id">
        <v-card @click="$router.push({ name: 'ShopCategory', params: {categoryId: category.id }})">
          <v-img
            :src="category.image_url"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title>{{ category.name }}</v-card-title>
          </v-img>
        </v-card>
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
      categories: [],
    };
  },
  beforeMount() {
    this.queryData();
  },
  methods: {
    async queryData() {
      const api = await openapi;

      api.packet_getCategories()
        .then((rsp) => {
          this.categories = rsp.data;
        });
    },
  },
};
</script>

<style scoped>

</style>
