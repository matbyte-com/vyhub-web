<template>
  <div>
    {{ packets }}
  </div>
</template>

<script>
import axios from 'axios';
import store from '@/store';

const uuid = store.getters.user.id;
const customerURL = `${process.env.VUE_APP_BACKEND_CUSTOMER_URL}`;

export default {
  name: 'Packets.vue',
  data() {
    return {
      packets: [],
    };
  },
  beforeMount() {
    axios.get(`${customerURL}/user/${uuid}/packets`).then((response) => { this.userAccounts = response.data; this.componentLoaded = true; });
  },
};
</script>

<style scoped>

</style>
