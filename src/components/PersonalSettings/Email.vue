<template>
  <v-card v-if="user != null" class="vh-email flex-grow-1 d-flex flex-column card-rounded"
          :outlined="outlined">
    <v-card-title>
      <v-icon left>mdi-email</v-icon>
      {{ $t('email') }}
    </v-card-title>
    <v-card-text class="body-1 mb-0 pb-0">
      <div v-if="!showInput">
        <div v-if="user.email != null">
          {{ user.email }}
        </div>
        <div v-else>{{ $t('_personalSettings.noEmailSpecified') }}</div>
      </div>
      <v-text-field v-else v-model="emailModel" hide-details="auto" ref="textfield"
                    :label="$t('email')" :rules="[validator]"
                    @keydown.enter="updateMail"/>
    </v-card-text>
    <v-spacer />
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
  props: {
    user: null,
    outlined: null,
  },
  data() {
    return {
      showInput: false,
      emailModel: null,
      validator: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || 'Invalid e-mail.';
      },
    };
  },
  methods: {
    showInputFunc() {
      this.emailModel = this.user.email;
      this.showInput = true;
      this.$nextTick(() => {
        this.$refs.textfield.focus();
      });
    },
    async updateMail() {
      if (!this.$refs.textfield.valid) { return; }
      (await openapi).user_editUser(this.$store.getters.user.id, { email: this.emailModel })
        .then(() => {
          this.showInput = false;
          this.$notify({
            title: this.$t('_messages.updateSuccess'),
            type: 'success',
          });
          this.$emit('user-changed');
        });
    },
  },
};
</script>

<style scoped>

</style>
