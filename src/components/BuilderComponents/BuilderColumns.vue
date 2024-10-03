<template>
  <div class="vh-home-columns">
    <v-row justify="center">
      <v-col
        v-for="(column, index) in columns"
        :key="index"
      >
        <div class="d-flex justify-center align-center">
          <div>
            <div v-if="column.title">
              <h3 class="text-h3">
                {{ column.title }}
              </h3>
            </div>
            <div v-if="column.imageUrl">
              <v-img
                :src="column.imageUrl"
                :alt="column.title"
                :max-width="maxImageWidth"
                style="border-radius: 3px"
              />
            </div>
            <div
              v-if="column.content"
              :style="`max-width: ${getMaxContentWidth}`"
              v-html="column.content"
            />
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Columns',
  props: ['columns', 'maxImageWidth', 'maxContentWidth'],
  computed: {
    getMaxContentWidth() {
      if (!this.maxContentWidth) return '100%';
      // check if string is only number. If so, add px
      if (/^\d+$/.test(this.maxContentWidth)) return `${this.maxContentWidth}px`;
      return this.maxContentWidth;
    },
  },
};
</script>

<style scoped>

</style>
