<template>
  <div>
    <v-card
      flat
      tile
      height="calc(100vh - 108px)"
      class="d-flex align-center justify-center"
    >
      <div>
        <v-progress-circular
          indeterminate
          size="50"
        />
      </div>
    </v-card>
  </div>
</template>

<script>
import openapiCached from '@/api/openapiCached';

export default {
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
