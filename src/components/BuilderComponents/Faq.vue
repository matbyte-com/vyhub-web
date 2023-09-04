<template>
  <div class="vh-home-faq">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="7">
        <v-card class="card-rounded">
          <v-expansion-panels>
            <v-expansion-panel v-for="(q, index) in questions" :key="index">
              <v-expansion-panel-header>
                <div>
                  <v-icon left v-if="q.icon">{{ q.icon }}</v-icon>
                  <b>{{ q.question }}</b>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-divider class="pb-3" />
                <p v-html="q.answer"></p>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
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
