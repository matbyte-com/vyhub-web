<template>
  <div class="vh-home-faq">
    <v-row justify="center">
      <v-col
        cols="12"
        sm="10"
        md="8"
        lg="7"
      >
        <v-card class="card-rounded">
          <v-expansion-panels>
            <v-expansion-panel
              v-for="(q, index) in questions"
              :key="index"
            >
              <v-expansion-panel-title class="vh-home-faq-header">
                <div>
                  <b>
                    <span class="text-primary mr-2">{{ String(index + 1).padStart(2, '0') }}.
                    </span>
                    <v-icon
                      v-if="q.icon"
                      start
                    >{{ q.icon }}</v-icon>
                    <span class="">{{ q.question }}</span>
                  </b>
                </div>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <p v-html="q.answer" />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ['questions'],
};
</script>

<style scoped>
::v-deep .v-expansion-panel-header__icon i {
  color: rgb(var(--v-theme-primary)) !important;
}

</style>
