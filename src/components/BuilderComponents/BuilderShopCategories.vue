<template>
  <div class="vh-home-shop-categories">
    <v-row
      v-if="categories"
      justify="center"
    >
      <v-col
        cols="11"
        sm="10"
        md="10"
        lg="9"
        xl="8"
        style="position: relative"
      >
        <Swiper
          :number-of-elements="categories.length"
          :per-page-custom="[1,2,3,3,3,3]"
        >
          <swiper-slide
            v-for="category in categories"
            :key="category.id"
            style="height: auto"
            class="py-2"
          >
            <v-card
              class="img-hover-zoom overflow-hidden card-rounded mx-auto
             d-flex flex-column"
              hover
              max-width="350px"
              height="95%"
              :to="{ name: 'ShopCategory', params: { categoryId: category.id} }"
            >
              <div
                v-if="category.image_url"
                class="category-image-square"
              >
                <img
                  class="category-image-blur"
                  :src="category.image_url"
                  alt=""
                  aria-hidden="true"
                >
                <img
                  class="category-image-fg"
                  :src="category.image_url"
                  :alt="category.name"
                >
              </div>
              <div
                v-else
                class="category-image-square d-flex align-center justify-center"
              >
                <v-icon
                  color="primary"
                  size="150"
                >
                  mdi-gift
                </v-icon>
              </div>
              <div class="text-center text-h5 mt-3 mx-1">
                {{ category.name }}
              </div>
              <v-spacer />
              <div class="text-center mt-3 pb-3">
                <v-btn
                  color="primary"
                  variant="flat"
                  :to="{ name: 'ShopCategory', params: { categoryId: category.id} }"
                >
                  {{ callToAction }}
                </v-btn>
              </div>
            </v-card>
          </swiper-slide>
        </Swiper>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import openapi from '@/api/openapi';

export default {
  props: {
    callToAction: { type: String, default: '' },
  },
  data() {
    return {
      categories: null,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const api = await openapi;
      api.packet_getCategories()
        .then((rsp) => {
          this.categories = rsp.data.filter((cat) => cat.enabled === true);
        });
    },
  },
};
</script>

<style scoped>
.category-image-square {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
}

.category-image-blur {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(18px) brightness(0.9);
  transform: scale(1.15);
}

.category-image-fg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform .3s ease;
}

/* Zoom the fitted image when the card is hovered */
.img-hover-zoom:hover .category-image-fg {
  transform: scale(1.08);
}

.grow-on-hover {
  transition: all .3s ease-in-out;
}
.grow-on-hover:hover {
  transform: scale(1.03);
}
</style>
