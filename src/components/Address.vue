<template>
  <div
    style="cursor: pointer;"
    @click="toggleVisibility"
  >
    <div class="font-weight-bold">
      {{ address.name }}
    </div>
    <transition
      enter-active-class="animate__animated animate__fadeIn animate__faster"
      mode="out-in"
      :duration="300"
      leave-active-class="animate__animated animate__fadeOut animate__faster"
    >
      <div
        v-if="!hidden || shown"
        key="1"
      >
        <v-row>
          <v-col
            cols="10"
            style="font-size: 0.9em; line-height: 1.3em"
          >
            <div>{{ address.street_and_number }}</div>
            <div>{{ address.addition }}</div>
            <div>{{ address.zip_code }} {{ address.city }}, {{ address.state }}</div>
            <div>{{ address.country.name }}</div>
            <div v-if="address.vat_number != null">
              {{ address.vat_number }}
            </div>
          </v-col>
          <v-col
            v-if="incognito"
            cols="2"
            class="d-flex align-center"
          >
            <v-btn
              icon="mdi-eye"
              variant="text"
              class="ml-1"
            />
          </v-col>
        </v-row>
      </div>
      <div
        v-else
        key="2"
      >
        <v-row>
          <v-col cols="10">
            <v-skeleton-loader
              boilerplate
              type="paragraph"
            />
          </v-col>
          <v-col cols="2">
            <v-btn
              icon="mdi-eye"
              variant="text"
              class="ml-1"
            />
          </v-col>
        </v-row>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    address: Object,
    hidden: {
      type: Boolean,
      default: false,
    },
    incognito: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      shown: false,
    };
  },
  beforeMount() {
    if (localStorage.getItem('hideSensitiveInformation')) {
      this.shown = false;
    } else {
      this.shown = true;
    }
  },
  methods: {
    toggleVisibility() {
      if (this.shown) {
        localStorage.setItem('hideSensitiveInformation', 'true');
        this.shown = false;
      } else {
        localStorage.removeItem('hideSensitiveInformation');
        this.shown = true;
      }
    },
  },
};
</script>
