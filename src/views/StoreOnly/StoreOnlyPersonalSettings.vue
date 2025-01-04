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
  <div>
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
        <StoreOnlyLinkedAccounts />
        <v-row dense>
          <v-col>
            <Email
              :user="userCopy"
              class="mt-3 fill-height"
              @user-changed="refreshUser"
            />
          </v-col>
          <v-col>
            <EmailNotifications
              :user="userCopy"
              class="mt-3 fill-height"
              @user-changed="refreshUser"
            />
          </v-col>
        </v-row>
        <PurchasesDashboard
          :flat="false"
          :headline="true"
          class="mt-5"
          :user="userCopy"
        />
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>

</style>
