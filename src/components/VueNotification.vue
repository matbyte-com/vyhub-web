<template>
  <notifications position="bottom left" :duration="8000" :width="400"
                 classes="vue-notification vuetify-notification">
    <template slot="body" slot-scope="{ item }">
      <div :class="'vue-notification vuetify-notification ' + item.type">
        <div class="body-2">
          <v-row>
            <v-col cols="1" align-self="center">
              <v-icon v-if="item.data && item.data.icon" class="white--text">
                {{ item.data.icon }}
              </v-icon>
              <div v-else>
                <v-icon v-if="item.type === 'error'" class="white--text">
                  mdi-alert-circle
                </v-icon>
                <v-icon v-else-if="item.type === 'warn'" class="white--text">
                  mdi-alert
                </v-icon>
                <v-icon v-else-if="item.type === 'success'" class="white--text">
                  mdi-check
                </v-icon>
                <v-icon v-else class="white--text">
                  mdi-information
                </v-icon>
              </div>
            </v-col>
            <v-col>
              <div class="font-weight-bold">
                {{ item.title }}
              </div>
              {{ item.text }}
            </v-col>
          </v-row>
        </div>
      </div>
    </template>
  </notifications>
</template>

<script>
export default {
  name: 'VueNotification',
};
</script>

<style scoped>

</style>
