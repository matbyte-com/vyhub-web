<template>
  <v-card
    v-if="user != null"
    class="vh-email flex-grow-1 d-flex flex-column card-rounded"
    :border="outlined"
  >
    <v-card-title>
      <v-icon start>
        mdi-email
      </v-icon>
      {{ $t('email') }}
    </v-card-title>
    <v-card-text class="text-body-1 mb-0 pb-0">
      <div v-if="!showInput">
        <div v-if="user.email != null">
          {{ user.email }}
        </div>
        <div v-else>
          {{ $t('_personalSettings.noEmailSpecified') }}
        </div>
      </div>
      <v-text-field
        v-else
        ref="textfield"
        v-model="emailModel"
        hide-details="auto"
        :label="$t('email')"
        :rules="[validator]"
        @keydown.enter="updateMail"
      />
    </v-card-text>
    <v-spacer />
    <v-card-actions>
      <v-btn
        v-if="!showInput"
        variant="text"
        color="primary"
        @click="showInputFunc"
      >
        <v-icon start>
          mdi-pencil
        </v-icon>
        {{ $t('edit') }}
      </v-btn>
      <v-btn
        v-else
        variant="text"
        color="success"
        @click="updateMail"
      >
        <v-icon start>
          mdi-check
        </v-icon>
        {{ $t('update') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import openapi from '@/api/openapi';

export default {
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
