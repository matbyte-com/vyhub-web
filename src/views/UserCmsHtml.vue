<template>
  <div v-if="data">
    <v-container v-if="data.wrapper">
      <v-card class="card-rounded">
        <v-card-text>
          <span class="ql-editor" v-html="data.content"></span>
        </v-card-text>
      </v-card>
    </v-container>
    <span v-else class="ql-editor" v-html="data.content"></span>
  </div>
</template>

<script>
import openapi from '@/api/openapi';

export default {
  name: 'UserRenderedHTML',
  data() {
    return {
      links: [],
      data: null,
    };
  },
  watch: {
    $route() {
      this.getHtml();
    },
    links() {
      this.getHtml();
    },
  },
  beforeMount() {
    this.getLinks();
  },
  mounted() {
    document.title = this.$route.params.title;
  },
  methods: {
    async getLinks() {
      this.links = this.$store.getters.navItems;
    },
    async getHtml() {
      const htmlId = this.links
        .find((l) => l.title.toLowerCase() === this.$route.params.title).cms_page_id;
      (await openapi).general_getCmsHtml(htmlId).then((rsp) => { this.data = rsp.data; })
        .catch((err) => {
          this.html = `Error while fetching HTML ${err}`;
          console.log(err.data);
        });
    },
  },
};
</script>

<style scoped>

</style>
