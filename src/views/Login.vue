<template>
  <div>
    <h1>Login</h1>
    <input type="text" placeholder="Username" v-model="username" />
    <input type="text" placeholder="Password" v-model="password" />
    <input type="button" @click="login" value="Login" />
    <p v-if="msg">{{ msg }}</p>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService';

export default {
  name: 'Login.vue',
  data() {
    return {
      username: '',
      password: '',
      msg: '',
    };
  },
  methods: {
    async login() {
      try {
        const credentials = {
          username: this.username,
          password: this.password,
        };

        AuthService.login(credentials, (response) => {
          this.msg = response.msg;

          // eslint-disable-next-line prefer-destructuring
          const token = response.access_token;

          this.$store.dispatch('api_token', token);

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
