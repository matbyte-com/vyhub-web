<template>
  <div>
    <v-expansion-panels>
      <v-expansion-panel v-for="question in questions" :key="question.id" class="mt-3">
        <v-card>
          <v-expansion-panel-header>
            {{ question.title }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
              <span v-html="question.content" class="ql-editor"></span>
          </v-expansion-panel-content>
        </v-card>
      </v-expansion-panel>
    </v-expansion-panels>
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
