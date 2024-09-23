<template>
  <notifications
    position="bottom left"
    :duration="8000"
    :width="400"
    classes="vue-notification vuetify-notification"
  >
    <!--  Was before: <slot name="body" slot-scope="{ item }"> -->
    <slot
      name="body"
      :item="{ item }"
    >
      <div :class="'vue-notification vuetify-notification ' + item.type">
        <div class="text-body-2">
          <v-row>
            <v-col
              cols="1"
              align-self="center"
            >
              <v-icon
                v-if="item.data && item.data.icon"
                class="text-white"
              >
                {{ item.data.icon }}
              </v-icon>
              <div v-else>
                <v-icon
                  v-if="item.type === 'error'"
                  class="text-white"
                >
                  mdi-alert-circle
                </v-icon>
                <v-icon
                  v-else-if="item.type === 'warn'"
                  class="text-white"
                >
                  mdi-alert
                </v-icon>
                <v-icon
                  v-else-if="item.type === 'success'"
                  class="text-white"
                >
                  mdi-check
                </v-icon>
                <v-icon
                  v-else
                  class="text-white"
                >
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
    </slot>
  </notifications>
</template>

<script>
export default {
  name: 'VueNotification',
};
</script>

<style scoped>

</style>
