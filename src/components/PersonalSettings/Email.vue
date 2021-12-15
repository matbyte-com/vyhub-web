<template>
  <v-card>
    <v-card-title>
      <v-icon left>mdi-email</v-icon>
      {{ $t('_personalSettings.email') }}
    </v-card-title>
    <v-card-text class="body-1">
      <div v-if="!showInput">
        <div v-if="user.email != null">
          {{ user.email }}
        </div>
        <div v-else>{{ $t('_personalSettings.noEmailSpecified') }}</div>
      </div>
      <v-text-field v-else v-model="emailModel" hide-details="auto" ref="textfield"
                    :label="$t('_personalSettings.email')" :rules="[validator]"
                    @keydown.enter="updateMail"/>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="primary" @click="this.showInputFunc" v-if="!showInput">
        <v-icon left>mdi-pencil</v-icon>
        {{ $t('edit') }}
      </v-btn>
      <v-btn v-else text color="success" @click="this.updateMail">
        <v-icon left>mdi-check</v-icon>
        {{ $t('update') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import openapi from '@/api/openapi';

export default {
  name: 'Email',
  data() {
    return {
      showInput: false,
      emailModel: null,
      user: {},
      validator: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || 'Invalid e-mail.';
      },
    };
  },
  props: {
    userProp: {},
  },
  beforeMount() {
    this.getUser();
    if (this.userProp) { this.user = this.userProp; }
  },
  methods: {
    showInputFunc() {
      this.emailModel = this.user.email;
      this.showInput = true;
      this.$nextTick(() => {
        this.$refs.textfield.focus();
      });
    },
    async getUser() {
      if (this.userProp) { return; }
      (await openapi).user_getCurrentUser().then((rsp) => {
        this.user = rsp.data;
      });
    },
    async updateMail() {
      if (!this.$refs.textfield.valid) { return; }
      (await openapi).user_patchUser(this.$store.getters.user.id, { email: this.emailModel })
        .then((rsp) => {
          this.showInput = false;
          this.$notify({
            title: this.$t('_personalSettings.messages.emailUpdated'),
            type: 'success',
          });
          this.user = rsp.data;
        }).catch((err) => {
          this.$notify({
            title: `${this.$t('unexpectedError')} ${err.response.status}`,
            text: err.response.data.detail,
            type: 'error',
          });
        });
    },
  },
};
</script>

<style scoped>

</style>
