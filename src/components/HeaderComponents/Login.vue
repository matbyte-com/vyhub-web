<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="400px">
        <!--<template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" depressed dark v-bind="attrs" v-on="on" class="mr-3 lighten-1">
            {{ $t("login") }}
          </v-btn>
        </template>-->
        <!-- :cancel-text="null" :submit-text="null"-->
        <v-card>
          <v-card-title>
            <span class="headline">{{ $t("login") }}</span>
          </v-card-title>
          <v-card-text>
            <GenForm :form-schema="formSchema" :form-model="formModel" @submit="login"
                     :error-message="errorMessage" cancel-text="close" submit-text="login"
                     @cancel="dialog = false"
                     ref="loginForm">
            </GenForm>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService';
import GenForm from '@/components/GenForm.vue';
import loginFormSchema from '@/forms/LoginForm';
import Axios from 'axios';
import store from '@/store';

export default {
  name: 'Login.vue',
  components: {
    GenForm,
  },
  data() {
    return {
      dialog: null,
      formSchema: loginFormSchema,
      formModel: {},
      errorMessage: null,
    };
  },
  watch: {
    $route(to, from) {
      this.checkLoginNeeded();
    },
  },
  methods: {
    async login() {
      try {
        AuthService.login(this.formModel.email, this.formModel.password, (token) => {
          this.$store.dispatch('login', { token });
          Axios.defaults.headers.common.Authorization = `Bearer ${store.state.token}`;

          AuthService.fetchUserData((user) => {
            // console.log(data);
            this.$store.dispatch('setUserData', { user });
            this.dialog = false;
            this.$router.push('/');
          }, (error) => {
            this.errorMessage = `Error in phase 3: ${error}`;
          });
        }, (phase, error) => {
          this.errorMessage = `Error in phase ${phase}: ${error}`;
        });
      } catch (error) {
        this.errorMessage = error.response.data.msg;
      }
    },
    checkLoginNeeded() {
      if (this.$route.query.login === 'true') {
        this.dialog = true;
      }
    },
    showLoginDialog() {
      this.dialog = true;
    },
  },
};
</script>

<style scoped>

</style>
