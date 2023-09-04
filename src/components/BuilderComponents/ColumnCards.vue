<template>
  <div class="vh-home-features">
    <v-row justify="center">
      <v-col cols="6" md="4" lg="3" v-for="(card, index) in cards" :key="index" class="d-flex">
        <v-card class="grow-on-hover feature-card flex-grow-1">
          <v-card-text class="text-center d-flex flex-column" style="height: 100%">
            <v-icon size="75">{{ card.icon }}</v-icon>
            <h3 class="text-h5">{{ card.title }}</h3>
            <p v-html="card.content"></p>
            <v-spacer />
            <div>
              <v-btn outlined color="primary"
                     :href="(!utils.localLink(card) ? card.link : null)"
                     :to="utils.localLink(card) ? utils.getLocalLink(card) : null">
                {{ card.btnText }}
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  // TODO Fix BTN Link
  name: 'ColumnCards',
  props: ['headline', 'subtitle', 'cards'],
};
</script>

<style scoped>
.feature-card {
  transition: all .2s ease-in-out;
}

.feature-card:hover i {
  color: var(--v-primary-base);
}
</style>
