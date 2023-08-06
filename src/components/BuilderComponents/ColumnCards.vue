<template>
  <div>
    <v-row justify="center">
      <v-col cols="6" md="4" lg="3" v-for="(card, index) in cards" :key="index">
        <v-card class="grow">
          <v-card-text class="text-center">
            <v-icon size="75">{{ card.icon }}</v-icon>
            <h3 class="text-h5">{{ card.title }}</h3>
            <p v-html="card.text"></p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'ColumnCards',
  props: ['headline', 'subtitle', 'cards'],
};
</script>

<style scoped>

</style>
