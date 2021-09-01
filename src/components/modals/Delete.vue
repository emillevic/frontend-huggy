<template>
  <v-dialog v-model="dialogDelete" max-width="500px">
    <v-card>
      <v-card-title class="text-h5 mb-8"
        >Excluir este contato?</v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#505050" text @click="closeDeleteDialog">Cancelar</v-btn>
        <v-btn color="#DE321B" text @click="deleteItemConfirm">Excluir</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DeleteDialog",
  props: {
    dialogDelete: Boolean,
    contact: Object,
  },
  methods: {
    closeDeleteDialog(){
      this.$emit('close')
    },
    deleteItemConfirm(){
        this.axios
        .delete(`${this.BASE_URL}/contacts/${contact.id}`)
        .then((response) => {
          this.$emit('close')
        });
    },
  }
};
</script>