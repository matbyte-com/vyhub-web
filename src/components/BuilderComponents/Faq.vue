<template>
  <div class="vh-home-faq">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="7">
        <v-card class="card-rounded">
          <v-expansion-panels>
            <v-expansion-panel v-for="(q, index) in questions" :key="index">
              <v-expansion-panel-header class="vh-home-faq-header">
                <div>
                  <v-icon left v-if="q.icon">{{ q.icon }}</v-icon>
                  <b>
                    <span class="primary--text">{{ String(index + 1).padStart(2, '0') }}.</span>
                    <span class="ml-2">{{ q.question }}</span>
                  </b>
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
::v-deep .v-expansion-panel-header__icon i {
  color: var(--v-primary-base) !important;
}

</style>
