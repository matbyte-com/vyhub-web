<template>
  <div>
    <div class="d-flex flex-row flex-wrap justify-center vh-home-community-stats">
      <v-card v-for="stat in stats" :key="stat.title"
              class="ml-3 mt-3 stat-card card-rounded" hover>
        <v-card-text class="d-flex align-center">
          <div>
            <v-icon class="number" size="50px">{{ stat.icon }}</v-icon>
          </div>
          <div class="ml-3">
            <div class="text-h5">{{ stat.title }}</div>
            <div class="text-h4 text-center number">{{ currentCount[stat.key] }}</div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import openapi from '@/api/openapi';

export default {
  name: 'CommunityStats',
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

.stat-card:hover .number {
  color: var(--v-primary-base);
}
</style>
