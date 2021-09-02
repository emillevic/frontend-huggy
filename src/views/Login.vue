<template>
  <v-container>
    <v-row class="justify-center align-center">
      <v-col class="text-center">
        <h1>Login</h1>
        <v-btn color="primary" @click="login()">Fazer login com a Huggy</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  methods: {
    login() {
      const config = require('/config.json')
      this.axios.post('https://auth.huggy.app/oauth/access_token', config).then((response) => {
        console.log(response);
        this.items = response.data.items;
      });
      this.$router.push("/contatos");
    },
  },
};
</script>
