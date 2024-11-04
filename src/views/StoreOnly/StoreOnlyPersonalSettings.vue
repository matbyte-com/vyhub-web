<script setup>
import openapi from "../../api/openapi";
import {ref} from "vue";
import {useStore} from "vuex";

const emit = defineEmits(['user-changed']);
const store = useStore();

const user = store.state.user;
const userCopy = ref(user);

async function refreshUser(fromChange = true) {
  (await openapi).user_getUser(user.id).then((rsp) => {
    userCopy.value = rsp.data;
  });

  if (fromChange) {
    emit('user-changed');
  }
}

</script>

<template>
  <StoreOnlyHeaderButtons />
  <StoreOnlyHeaderPicture />
  <v-row
    justify="center"
    class="mb-3"
  >
    <v-col
      cols="11"
      sm="11"
      md="8"
      lg="7"
    >
      <Email
        :user="userCopy"
        class="mt-3"
        @user-changed="refreshUser"
      />
      <EmailNotifications
        :user="userCopy"
        class="mt-3"
        @user-changed="refreshUser"
      />
      <PurchasesDashboard
        :flat="false"
        :headline="true"
        class="mt-3"
        :user="userCopy"
      />
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
