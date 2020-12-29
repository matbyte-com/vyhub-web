<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="400px">
        <!--<template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" depressed dark v-bind="attrs" v-on="on" class="mr-3 lighten-1">
            {{ $t("login") }}
          </v-btn>
        </template>-->
        <v-card>
          <v-card-title>
            <span class="headline">{{ $t("login") }}</span>
          </v-card-title>
          <v-card-text>
            <GenForm :form-schema="formSchema" :form-model="formModel" @submit="login"
                     :error-message="errorMessage" :cancel-text="null" :submit-text="null"
                     @cancel="dialog = false"
                     ref="loginForm">
            </GenForm>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="$refs.loginForm.submitForm()">
              {{ $t("login") }}
            </v-btn>
            <v-btn color="lighten-5" text @click="$refs.loginForm.cancelForm()">
              {{ $t("close") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService';
import GenForm from '@/components/GenForm.vue';
import loginFormSchema from '@/forms/LoginForm';

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
        AuthService.login(this.formModel.email, this.formModel.password, (response) => {
          this.msg = response.msg;

          const token = response.access_token;
          // eslint-disable-next-line prefer-destructuring
          const user = response.user;

          this.$store.dispatch('api_token', { token, user });

          this.$router.push('/');
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
