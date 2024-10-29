<script setup>
import {computed, ref, onMounted} from "vue";
import openapiCached from "../../api/openapiCached";
import {useStore} from "vuex";
import openapi from "../../api/openapi";
import {useRoute} from "vue-router";

onMounted(() => {
  fetchRecommendedPackets();
  fetchCategories();
})

const recommendedPackets = ref(false);
const categories = ref(null);
const store = useStore();

async function fetchRecommendedPackets() {
  (await openapiCached).shop_getPackets({recommended: true, limit: 1}).then((rsp) => {
    if (rsp.data !== null && rsp.data.length > 0) {
      recommendedPackets.value = true;
    }
  })
}

async function fetchCategories() {
  (await openapi).packet_getCategories()
    .then((rsp) => {
      categories.value = rsp.data.filter((cat) => cat.enabled);
      // Redirect if there is only on category TODO Fix Redirect!?
      if (categories.value.length === 1) {
        this.$router.replace({ name: 'ShopCategory', params: { categoryId: this.categories[0].id } });
      }
    });
}

const anyShopStatsEnabled = computed(() => {
  if (!store.state.shopConfig) {
    return false;
  }

  if (!store.state.shopConfig.show_widgets_on_shop_page) {
    return false;
  }

  return store.state.shopConfig.last_donators_enabled
    || store.state.shopConfig.top_donators_enabled
    || store.state.shopConfig.donation_goal_enabled;
})

</script>

<template>
  <div>
    <!-- Header Picture -->
    <div
      style="height: 30vh"
      class="d-flex justify-center align-center"
    >
      Picture
    </div>
    <!-- App Bar -->
    <v-container>
      <div>
        <v-toolbar
          style="margin-top: -50px"
          rounded="lg"
          color="header"
        >
          <div class="d-flex justify-center flex-grow-1">
            <a
              v-for="cat in categories"
              :key="cat.id"
              class="font-weight-bold ml-5 nav-button"
              :class="{ 'button-active' : $route.params.categoryId == cat.name}"
              @click="$router.push({ name: 'StoreCategory',
                                     params: {categoryId: cat.name }})"
            >
              {{ cat.name }}
            </a>
          </div>
        </v-toolbar>
      </div>
      <!-- Categories -->
      <v-row
        v-if="$route.name === 'Store'"
        class="mt-3 vh-store-start-categories"
        justify="center"
      >
        <v-col
          v-for="cat in categories"
          :key="cat.id"
          cols="3"
        >
          <v-card
            class="category-card"
            :to=" { name: 'StoreCategory',
                    params: {categoryId: cat.name }}"
          >
            <v-card-text>
              <v-img
                v-if="cat.image_url"
                :src="cat.image_url"
                class="ma-1 img-rounded"
                max-height="300px"
              />
              <v-sheet
                v-else
                class="mb-1 bg-transparent"
                height="200px"
              >
                <div
                  class="d-flex align-center justify-center"
                  style="height: 100%;"
                >
                  <v-icon
                    color="primary"
                    size="150"
                  >
                    mdi-gift
                  </v-icon>
                </div>
              </v-sheet>
              <div class="text-center text-h5">
                {{ cat.name }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mt-3">
        <!-- Sidebar -->
        <v-col
          v-if="anyShopStatsEnabled || recommendedPackets"
          cols="12"
          md="4"
          lg="3"
          class="d-flex flex-column"
        >
          <v-card
            v-if="!$vuetify.display.smAndDown && anyShopStatsEnabled"
            class="card-rounded"
            flat
          >
            <ShopStatsSide />
          </v-card>
          <div
            class="card-rounded"
            :class="{ 'mt-6':!$vuetify.display.smAndDown && anyShopStatsEnabled }"
          >
            <RecommendedPacketsSide />
          </div>
        </v-col>
        <!-- Main Content -->
        <v-col>
          <transition
            mode="out-in"
            enter-active-class="animate__animated animate__fadeIn animate__faster"
          >
            <router-view />
          </transition>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.category-card {
  transition: color 0.2s;
}
.category-card:hover {
  color: rgb(var(--v-theme-primary));
}

.button-active {
  transition: none;
  color: rgb(var(--v-theme-primary));
}

.nav-button {
  cursor: pointer;
  transition: color 0.2s;
  font-size: large;
}

.nav-button:hover {
  color: rgb(var(--v-theme-primary));
}
</style>
