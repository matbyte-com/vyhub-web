<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="400px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" depressed dark v-bind="attrs" v-on="on">
            {{ $t("login") }}
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ $t("login") }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-col>
                <v-text-field v-bind:label="$t('email')" required v-model="email" />
              </v-col>
              <v-col>
                <v-text-field
                  type="password"
                  v-bind:label="$t('password')"
                  required
                  v-model="password">
                </v-text-field>
              </v-col>
              <v-col>
                <p v-if="msg">{{ msg }}</p>
              </v-col>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary darken-1" text @click="dialog = false">
              {{ $t("close") }}
            </v-btn>
            <v-btn color="primary darken-1" text @click="login">
              {{ $t("login") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService';

export default {
  name: 'Login.vue',
  data() {
    return {
      dialog: false,
      email: '',
      password: '',
      msg: '',
    };
  },
  methods: {
    async login() {
      try {
        AuthService.login(this.email, this.password, (response) => {
          this.msg = response.msg;

          // eslint-disable-next-line prefer-destructuring
          const token = response.access_token;

          this.$store.dispatch('api_token', token);
          this.dialog = false;
          this.$router.push('/');
        });
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    },
  },
};
</script>

<style scoped>

</style>
