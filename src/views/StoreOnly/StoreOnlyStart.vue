<script setup>
import {computed, ref, onMounted} from "vue";
import openapiCached from "../../api/openapiCached";
import {useStore} from "vuex";
import openapi from "../../api/openapi";
import {useDisplay} from "vuetify";
import {useRoute} from "vue-router";

onMounted(() => {
  fetchRecommendedPackets();
  fetchCategories();
})

const recommendedPackets = ref(false);
const categories = ref(null);
const store = useStore();
const display = ref(useDisplay());
const route = useRoute();

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
        this.$router.replace({name: 'StoreCategory', params: {categoryId: this.categories[0].id}});
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
    <v-row justify="center">
      <v-col
        cols="11"
        sm="11"
        md="8"
        lg="8"
        xl="7"
      >
        <div class="position-relative">
          <!-- App Bar / Toolbar -->
          <div
            class="toolbar elevation-1 rounded-lg"
          >
            <div
              v-if="categories == null"
              style="width: 100%; min-height: 68px"
              class="v-skeleton-loader__bone"
            />
            <div
              v-else
              style="min-height: 68px"
              class="d-flex justify-center align-center flex-wrap toolbar-column-gap mx-3 py-3"
            >
              <router-link
                class="font-weight-bold nav-button"
                :to="{ name: 'Store' }"
                :class="{ 'button-active' : route.name === 'Store', 'nav-button-light': store.state.theme?.light_header, 'nav-button': !store.state.theme?.light_header}"
              >
                {{ $t('home') }}
              </router-link>
              <router-link
                v-for="cat in categories"
                :key="cat.id"
                class="font-weight-bold nav-button text-no-wrap"
                :class="{ 'button-active' : route.params.categoryId === cat.name, 'nav-button-light': store.state.theme?.light_header, 'nav-button': !store.state.theme?.light_header}"
                :to="{ name: 'StoreCategory',
                       params: {categoryId: cat.name }}"
              >
                {{ cat.name }}
              </router-link>
            </div>
          </div>
        </div>
        <!-- Categories -->
        <Swiper
          v-if="categories != null && route.name === 'Store'"
          :number-of-elements="categories.length"
          :per-page-custom="[2,3,4,5,5]"
          class="mt-3 vh-store-start-categories"
        >
          <swiper-slide
            v-for="cat in categories"
            :key="cat.id"
          >
            <v-card
              class="category-card mb-1"
              :to=" { name: 'StoreCategory',
                      params: {categoryId: cat.name }}"
            >
              <v-img
                v-if="cat.image_url"
                :src="cat.image_url"
                class="img-rounded ma-2"
                min-height="90px"
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
              <div class="text-center text-h5 mb-2">
                {{ cat.name }}
              </div>
            </v-card>
          </swiper-slide>
        </Swiper>
        <!-- Skeleton Loaders -->
        <div
          v-if="categories == null && route.name === 'Store'"
          class="d-flex justify-center mt-3"
        >
          <v-card
            v-for="i in 3"
            :key="i"
            class="mx-1"
            width="250px"
          >
            <v-skeleton-loader
              class=""
              type="card"
            />
          </v-card>
        </div>
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
              v-if="!display.smAndDown && anyShopStatsEnabled"
              class="card-rounded"
            >
              <ShopStatsSide />
            </v-card>
            <div
              class="card-rounded"
              :class="{ 'mt-3':!display.smAndDown && anyShopStatsEnabled }"
            >
              <RecommendedPacketsSide
                :flat="false"
                :store-only="true"
              />
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
  color: rgb(var(--v-theme-primary)) !important;
}

.nav-button {
  cursor: pointer;
  transition: all 0.2s;
  font-size: large;
  color: white;
  text-decoration: none;
}

.nav-button-light {
  color: black;
  cursor: pointer;
  transition: color 0.2s;
  font-size: large;
  text-decoration: none;
}

.nav-button:hover {
  color: rgb(var(--v-theme-primary));
}

.toolbar {
  background-color: rgb(var(--v-theme-header));
  min-height: 68px;
  margin-top: -35px;
  width: 100%;
}

.toolbar-column-gap {
  column-gap: 18px;
}
</style>
