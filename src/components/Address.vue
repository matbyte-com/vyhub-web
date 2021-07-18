<template>
    <div>
      <div class="font-weight-bold">{{ address.name }}</div>
      <div>{{ address.street_and_number }}</div>
      <div>{{ address.addition }}</div>
      <div>{{ address.zip_code }} {{ address.city }}, {{ address.state }}</div>
      <div>{{ address.country.name }}</div>
      <div v-if="address.vat_number != null">{{ address.vat_number }}</div>
    </div>
</template>

<script>
export default {
  name: 'Address',
  props: {
    address: Object,
  },
};
</script>
