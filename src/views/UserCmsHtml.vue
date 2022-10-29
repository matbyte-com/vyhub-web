<template>
  <span class="ql-editor" v-if="html" v-html="html"></span>
</template>

<script>
import openapi from '@/api/openapi';

export default {
  name: 'UserRenderedHTML',
  data() {
    return {
      links: [],
      html: null,
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
      (await openapi).general_getCmsHtml(htmlId).then((rsp) => { this.html = rsp.data.content; })
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
