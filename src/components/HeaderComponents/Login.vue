<template>
  <div>
    <DialogForm  :form-schema="formSchema" @submit="login"
             :cancel-text="$t('header.labels.close')"
             :submit-text="$t('header.labels.login')"
             ref="loginDialog">
    </DialogForm>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService';
import DialogForm from '@/components/DialogForm.vue';
import loginFormSchema from '@/forms/LoginForm';
import Axios from 'axios';
import store from '@/store';
import api from '@/api/api';

export default {
  name: 'Login.vue',
  components: {
    DialogForm,
  },
  data() {
    return {
      formSchema: loginFormSchema,
    };
  },
  watch: {
    $route() {
      this.checkLoginNeeded();
    },
  },
  methods: {
    async login() {
      try {
        const data = this.$refs.loginDialog.getData();

        AuthService.login(data.email, data.password, (token) => {
          this.$store.dispatch('login', { token });
          Axios.defaults.headers.common.Authorization = `Bearer ${store.state.token}`;
          api.http.defaults.headers.common.Authorization = `Bearer ${store.state.token}`;
          api.throttledHttp.defaults.headers.common.Authorization = `Bearer ${store.state.token}`;

          AuthService.fetchUserData((user) => {
            // console.log(data);
            this.$store.dispatch('setUserData', { user });
            this.$refs.loginDialog.closeAndReset();
            this.$router.push('/');
          }, (error) => {
            this.$refs.loginDialog.setErrorMessage(`Error in phase 3: ${error}`);
          });
        }, (phase, error) => {
          this.$refs.loginDialog.setErrorMessage(`Error in phase ${phase}: ${error}`);
        });
      } catch (error) {
        this.$refs.loginDialog.setErrorMessage(error.response.data.msg);
      }
    },
    checkLoginNeeded() {
      if (this.$route.query.login === 'true') {
        this.showLoginDialog();
      }
    },
    showLoginDialog() {
      this.$refs.loginDialog.show();
    },
  },
};
</script>

<style scoped>

</style>
