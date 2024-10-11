<template>
  <div>
    <div class="vh-home-community-stats">
      <div
        v-if="$vuetify.display.smAndUp"
        class="d-flex flex-row flex-wrap justify-center"
      >
        <v-card
          v-for="stat in stats"
          :key="stat.title"
          class="ml-5 mt-10 stat-card card-rounded"
        >
          <div class="icon-wrapper text-center">
            <v-card
              class="icon-rounded d-inline-block pa-3 v-card-non-transparent"
              flat
            >
              <v-icon size="50">
                {{ stat.icon }}
              </v-icon>
            </v-card>
          </div>
          <v-card-text>
            <div class="mt-8">
              <div class="text-h5">
                {{ stat.title }}
              </div>
              <div class="text-h4 number text-center">
                {{ currentCount[stat.key] }}
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
      <Swiper
        v-else
        :number-of-elements="2"
        :per-page-custom="[1,1,2,3,4]"
      >
        <swiper-slide
          :key="1"
          style="height: 100%"
        >
          <v-card class="card-rounded">
            <v-card-text style="width: inherit">
              <v-card
                v-for="(stat, index) in stats.slice(0,2)"
                :key="stat.title"
                class="stat-card"
                border
                hover
                :class="{ 'mt-3' : index !== 0 }"
              >
                <v-card-text
                  class="d-flex align-center"
                  style="width: inherit"
                >
                  <div class="ml-3">
                    <div class="text-h5">
                      {{ stat.title }}
                    </div>
                    <div class="text-h4 number">
                      {{ currentCount[stat.key] }}
                    </div>
                  </div>
                  <v-spacer />
                  <div>
                    <v-icon
                      class="number"
                      size="70px"
                    >
                      {{ stat.icon }}
                    </v-icon>
                  </div>
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
        </swiper-slide>
        <swiper-slide
          :key="2"
          style="height: 100%"
        >
          <v-card class="card-rounded">
            <v-card-text style="width: inherit">
              <v-card
                v-for="(stat, index) in stats.slice(2)"
                :key="stat.title"
                class="stat-card card-rounded"
                hover
                border
                :class="{ 'mt-3' : index !== 0 }"
              >
                <v-card-text
                  class="d-flex align-center"
                  style="width: inherit"
                >
                  <div class="ml-3">
                    <div class="text-h5">
                      {{ stat.title }}
                    </div>
                    <div class="text-h4 number">
                      {{ currentCount[stat.key] }}
                    </div>
                  </div>
                  <v-spacer />
                  <div>
                    <v-icon
                      class="number"
                      size="70px"
                    >
                      {{ stat.icon }}
                    </v-icon>
                  </div>
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
        </swiper-slide>
      </Swiper>
    </div>
  </div>
</template>

<script>
import openapi from '@/api/openapi';

export default {
  props: {
    headline: {
      type: String,
      default: 'Community',
    },
  },
  data() {
    return {
      stats: [
        {
          title: this.$t('_component.onlinePlayers'),
          key: 'online_players',
          icon: 'mdi-gamepad-right',
        },
        {
          title: this.$t('_component.activePlayers'),
          key: 'active_users',
          icon: 'mdi-account-clock-outline',
        },
        {
          title: this.$t('_component.registeredPlayers'),
          key: 'registered_players',
          icon: 'mdi-account-group',
        },
        {
          title: this.$t('_component.hoursPlayed'),
          key: 'hours_played',
          icon: 'mdi-clock-fast',
        },
      ],
      currentCount: {
        online_players: 0,
        registered_players: 0,
        hours_played: 0,
        active_users: 0,
      },
      finalCount: {
        online_players: 0,
        registered_players: 0,
        hours_played: 0,
        active_users: 0,
      },
      tick_amount: {
        online_players: 2,
        registered_players: 2,
        hours_played: 2,
        active_users: 2,
      },
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).general_getCommunityStats().then((rsp) => {
        this.finalCount = rsp.data;
        this.calculateSpeed();
        Object.keys(this.finalCount).forEach((key, value) => {
          this.count(key, 0);
        });
      });
    },
    calculateSpeed() {
      Object.keys(this.finalCount).forEach((key, value) => {
        // Reduce the divider to make the speed go faster
        let speed = Math.floor(this.finalCount[key] / (7 * 10));
        if (speed <= 1) speed = 1;
        this.tick_amount[key] = speed;
      });
    },
    count(type, number) {
      this.currentCount[type] = number;
      if (number >= this.finalCount[type]) {
        return;
      }
      setTimeout(() => {
        this.count(type, number + this.tick_amount[type]);
      }, 10);
    },
  },
};
</script>

<style scoped>
.number {
  transition: all .2s ease-in-out;
}

.stat-card {
  transition: all .2s ease-in-out;
  overflow: visible;
}

.stat-card:hover {
  scale: 1.05;
}

.stat-card:hover .number, .stat-card:hover i{
  color: rgb(var(--v-theme-primary));
}
.icon-wrapper {
  width: 100%;
  position: absolute;
  top: -40px;
}
.icon-rounded {
  border-radius: 50%;
  border: solid;
  border-width: 5px;
  border-color: rgb(var(--v-theme-primary));
  margin-left: auto;
  margin-right: auto;
}

</style>
