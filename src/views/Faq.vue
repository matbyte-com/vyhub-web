<template>
  <div>
      <v-card>
        <v-expansion-panels>
          <v-expansion-panel v-for="question in questions" :key="question.id">
            <v-expansion-panel-header>
              {{ question.title }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              {{ question.content }}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
  </div>
</template>

<script>
import openapi from '../api/openapi';

export default {
  name: 'FAQ',
  data() {
    return {
      questions: null,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).faq_getFaq().then((rsp) => {
        this.questions = rsp.data;
      });
    },
  },
};
</script>

<style scoped>
</style>
