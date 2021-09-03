<template>
  <div>
    <img src="@/assets/img/book.png" />
    <p>Ainda não há contatos</p>
    <v-btn color="primary" class="pl-3" @click="$emit('open')">
      <v-icon class="pr-2">mdi-plus</v-icon>
      Adicionar Contato</v-btn
    >
  </div>
</template>

<script>
export default {
  name: "EmptyTable",
};
</script>

<style scoped>
.v-btn {
  text-transform: unset;
}
</style>