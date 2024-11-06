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
        this.$router.replace({ name: 'StoreCategory', params: { categoryId: this.categories[0].id } });
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
    <StoreOnlyHeaderButtons />
    <StoreOnlyHeaderPicture />
    <!-- App Bar -->
    <v-row justify="center">
      <v-col
        cols="11"
        sm="11"
        md="8"
        lg="7"
      >
        <div>
          <v-toolbar
            elevation="3"
            style="margin-top: -35px"
            class="overflow-hidden"
            rounded="lg"
            color="header"
          >
            <div
              v-if="categories == null"
              style="width: 100%; height: 65px"
              class="v-skeleton-loader__bone"
            />
            <div
              v-else
              class="d-flex justify-center flex-grow-1"
            >
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
        <!-- TODO Skeleton Loader -->
        <Swiper
          v-if="categories != null && $route.name === 'Store'"
          :number-of-elements="categories.length"
          :per-page-custom="[2,3,4,5,5]"
          style="min-height: 200px"
          class="mt-3 vh-store-start-categories"
        >
          <swiper-slide
            v-for="cat in categories"
            :key="cat.id"
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
          </swiper-slide>
        </Swiper>
        <v-row class="my-3">
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
            >
              <ShopStatsSide />
            </v-card>
            <div
              class="card-rounded"
              :class="{ 'mt-3':!$vuetify.display.smAndDown && anyShopStatsEnabled }"
            >
              <RecommendedPacketsSide :flat="false" />
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
      </v-col>
    </v-row>
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
