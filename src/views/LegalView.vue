<template>
  <div>
    <PageTitleFlat
      :title="$t('legal')"
      :hide-triangle="true"
    />
    <v-card
      class="card-rounded mt-4"
      flat
    >
      <v-card-text>
        <!-- Do not remove or alter the following disclaimer.
         This is against the terms of service of VyHub.-->
        <span class="text-disabled">
          <span v-if="!removeBranding">
            This website is built using the <a
              target="_blank"
              href="https://vyhub.net"
            >VyHub</a>
            gameserver and community management system by Matbyte.
            <br>
          </span>
          The contents of this website are not managed by Matbyte UG, therefore
          Matbyte UG is not responsible for them.
        </span>
        <!-- Only the text above -->
        <div
          class="mt-2 ql-editor"
          v-html="content"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import openapi from '@/api/openapi';

export default {
  data() {
    return {
      content: 'Legal',
    };
  },
  computed: {
    removeBranding() {
      return this.$store.getters.generalConfig != null
        && this.$store.getters.generalConfig.remove_branding;
    },
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).general_getLegal().then((rsp) => {
        this.content = rsp.data;
      });
    },
  },
};
</script>

<style scoped>

</style>
