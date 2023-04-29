<template>
  <div>
    <v-card>
      <v-card-text>
        <!-- Do not remove or alter the following disclaimer.
         This is against the terms of service of VyHub.-->
        <span class="text--disabled">
          This website is built using the <a target="_blank" href="https://vyhub.net">VyHub</a>
          gameserver and community management system by Matbyte.
          <br/>
          Only the owner of this VyHub instance (and not Matbyte) is responsible for the
          contents of this webpage.
        </span>
        <!-- Only the text above -->
        <div class="mt-2 ql-editor" v-html="content"></div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import openapi from '@/api/openapi';

export default {
  name: 'Legal.vue',
  data() {
    return {
      content: 'Legal',
    };
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
