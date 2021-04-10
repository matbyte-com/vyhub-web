<template>
  <span v-html="html"></span>
</template>

<script>
import api from '@/api/api';

export default {
  name: 'UserRenderedHTML',
  data() {
    return {
      links: null,
      html: null,
    };
  },
  watch: {
    links() {
      this.getHtml();
    },
  },
  created() {
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
      const htmlId = this.links.find((l) => l.title === this.$route.params.title).html;
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
