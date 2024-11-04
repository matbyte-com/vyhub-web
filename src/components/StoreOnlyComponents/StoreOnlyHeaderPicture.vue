<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "StoreOnlyHeaderPicture"
})
</script>

<template>
  <v-img
    height="30vh"
    class="vh-store-header-img"
    cover
    src="https://picsum.photos/1500/300"
  >
    <div class="d-flex justify-center mt-15">
      <BuilderJoinServer />
      <v-img
        class="vh-store-header-logo"
        style="max-width: 100px; max-height: 100px"
        src="https://picsum.photos/300/300"
      />
    </div>
  </v-img>
</template>

<style scoped>

</style>
