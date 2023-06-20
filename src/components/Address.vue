<template>
    <div @click="toggleVisibility" style="cursor: pointer;">
      <div class="font-weight-bold">{{ address.name }}</div>
      <transition enter-active-class="animate__animated animate__fadeIn animate__faster"
                  mode="out-in" :duration="300"
                  leave-active-class="animate__animated animate__fadeOut animate__faster">
        <div v-if="!hidden || shown" key="1">
          <v-row>
            <v-col cols="10">
              <div>{{ address.street_and_number }}</div>
              <div>{{ address.addition }}</div>
              <div>{{ address.zip_code }} {{ address.city }}, {{ address.state }}</div>
              <div>{{ address.country.name }}</div>
              <div v-if="address.vat_number != null">{{ address.vat_number }}</div>
            </v-col>
            <v-col cols="2" class="d-flex align-center">
              <v-btn icon class="ml-1">
                <v-icon>
                  mdi-eye
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
        <div v-else key="2">
          <v-row>
            <v-col cols="10">
              <v-skeleton-loader boilerplate type="paragraph" />
            </v-col>
            <v-col cols="2">
              <v-btn icon class="ml-1">
                <v-icon>
                  mdi-eye
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </transition>
    </div>
</template>

<script>
export default {
  name: 'Address',
  data() {
    return {
      shown: false,
    };
  },
  props: {
    address: Object,
    hidden: {
      type: Boolean,
      default: false,
    },
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
