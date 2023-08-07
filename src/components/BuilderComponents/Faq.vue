<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="7">
        <v-expansion-panels>
          <v-expansion-panel v-for="(q, index) in questions" :key="index">
            <v-expansion-panel-header>
              {{ q.question }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <p v-html="q.answer"></p>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Faq',
  props: ['questions'],
};
</script>

<style scoped>

</style>
