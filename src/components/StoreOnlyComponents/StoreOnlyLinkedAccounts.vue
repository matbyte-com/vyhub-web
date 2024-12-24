<script setup lang="ts">
import UserService from "../../services/UserService";
import {useStore} from "vuex";

const store = useStore();
</script>

<template>
  <v-card
    class="vh-cart-accounts card-rounded mt-3"
  >
    <v-card-title class="d-flex">
      <v-icon start>
        mdi-account-group
      </v-icon>
      {{ $t('_shop.labels.yourAccounts') }}
    </v-card-title>
    <v-card-text v-if="store.getters.isLoggedIn">
      <div class="d-flex flex-wrap">
        <v-chip
          class="ma-1"
          variant="outlined"
        >
          <v-icon start>
            {{ UserService.userTypeIcons[store.state.user.type] }}
          </v-icon>
          {{ store.state.user.username }}
        </v-chip>
        <div
          v-for="acc in store.state.user.linked_users"
          v-if="store.state.user.linked_users"
          :key="acc.id"
          class="ma-1"
        >
          <v-chip
            variant="outlined"
          >
            <v-icon start>
              {{ UserService.userTypeIcons[acc.type] }}
            </v-icon>
            {{ acc.username }}
          </v-chip>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
