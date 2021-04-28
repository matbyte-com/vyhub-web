<template>
  <span class="ql-editor" v-if="html" v-html="html"></span>
</template>

<script>
import api from '@/api/api';

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
    getLinks() {
      api.design.getNavItems().then((rsp) => { this.links = rsp.data; })
        .catch((err) => console.log(err.data));
    },
    getHtml() {
      console.log(this.links);
      const htmlId = this.links
        .find((l) => l.title.toLowerCase() === this.$route.params.title).html;
      api.design.getHtml(htmlId).then((rsp) => { this.html = rsp.data.content; })
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
