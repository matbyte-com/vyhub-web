<template>
<div>
  <div style="position: absolute; left: 50%; top: 50%">
    <v-progress-circular indeterminate size="50" />
  </div>
</div>
</template>

<script>
import openapiCached from '@/api/openapiCached';

export default {
  name: 'Start.vue',
  beforeMount() {
    this.redirect();
  },
  methods: {
    async redirect() {
      if (!this.$store.getters.theme) {
        (await openapiCached).general_getTheme().then((rsp) => {
          const theme = rsp.data;
          if (theme.enable_landingpage) {
            this.$router.replace({ name: 'Home' });
          } else {
            this.$router.replace({ name: 'News' });
          }
        });
      } else if (this.$store.getters.theme.enable_landingpage) {
        this.$router.replace({ name: 'Home' });
      } else {
        this.$router.replace({ name: 'News' });
      }
    },
  },
};
</script>

<style scoped>

</style>
