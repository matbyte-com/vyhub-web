<template>
  <div>
    <v-card>
      <v-card-text>
        <span class="text--disabled">This website is built using the <a target="_blank" href="https://vyhub.net">VyHub</a> gameserver and community management system.</span>
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
