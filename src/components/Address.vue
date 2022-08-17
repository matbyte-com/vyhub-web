<template>
    <div @click="shown = !shown" style="cursor: pointer;">
      <div class="font-weight-bold">{{ address.name }}</div>
      <div v-if="!hidden || shown">
        <div>{{ address.street_and_number }}</div>
        <div>{{ address.addition }}</div>
        <div>{{ address.zip_code }} {{ address.city }}, {{ address.state }}</div>
        <div>{{ address.country.name }}</div>
        <div v-if="address.vat_number != null">{{ address.vat_number }}</div>
      </div>
      <div v-else>
        <v-row>
          <v-col cols="10">
            <v-skeleton-loader boilerplate type="paragraph">
            </v-skeleton-loader>
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
};
</script>
