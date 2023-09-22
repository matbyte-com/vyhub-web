<template>
  <div class="vh-home-features">
    <v-row justify="center" v-if="$vuetify.breakpoint.mdAndUp">
      <v-col cols="6" md="4" lg="3" v-for="(card, index) in cards" :key="index"
             class="d-flex flex-column">
        <v-card class="grow-on-hover feature-card flex-grow-1 card-rounded text-center mt-8">
          <div class="icon-wrapper">
            <v-card class="icon-rounded d-inline-block pa-1 v-card-non-transparent" flat>
              <v-icon size="75">{{ card.icon }}</v-icon>
            </v-card>
          </div>
          <v-card-text class="text-center d-flex flex-column" style="height: 100%">
            <h3 class="text-h5 mt-13">{{ card.title }}</h3>
            <p v-html="card.content"></p>
            <v-spacer />
            <div>
              <v-btn depressed color="primary"
                     :href="(!utils.localLink(card) ? card.link : null)"
                     :to="utils.localLink(card) ? utils.getLocalLink(card) : null">
                {{ card.btnText }}
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <Swiper :number-of-elements="cards.length" :per-page-custom="[1,2,3,3,3]" v-else>
      <swiper-slide v-for="(card, index) in cards" :key="index">
        <div class="pt-10">
          <v-card class="grow-on-hover feature-card flex-grow-1 card-rounded text-center"
                  style="width: inherit">
            <div class="icon-wrapper">
              <v-card class="icon-rounded d-inline-block pa-1 v-card-non-transparent" flat>
                <v-icon size="75">{{ card.icon }}</v-icon>
              </v-card>
            </div>
            <v-card-text class="text-center d-flex flex-column"
                         style="height: 100%; width: inherit">
              <h3 class="text-h5 mt-13">{{ card.title }}</h3>
              <p v-html="card.content"></p>
              <v-spacer />
              <div>
                <v-btn depressed color="primary"
                       :href="(!utils.localLink(card) ? card.link : null)"
                       :to="utils.localLink(card) ? utils.getLocalLink(card) : null">
                  {{ card.btnText }}
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </swiper-slide>
    </Swiper>
  </div>
</template>

<script>
import Swiper from '@/components/Swiper.vue';

export default {
  name: 'ColumnCards',
  components: { Swiper },
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

.icon-rounded {
  border-radius: 50%;
  border: solid;
  border-width: 5px;
  border-color: var(--v-primary-base);
  margin-left: auto;
  margin-right: auto;
}

.icon-wrapper {
  width: 100%;
  position: absolute;
  top: -35px;
}
</style>
