<template>
  <v-dialog v-model="isOpen" max-width="500px">
    <v-card>
      <v-card-title class="text-h5 mb-8">Excluir este contato?</v-card-title>
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
    contactId: String,
  },
  computed: {
    isOpen: {
      get() {
        return this.dialogDelete;
      },
      set(val) {
        if (!val) this.$emit("close");
      },
    },
  },
  methods: {
    closeDeleteDialog() {
      this.$emit("close");
    },
    deleteItemConfirm() {
      this.axios
        .delete(`${this.BASE_URL}/contacts/${this.contactId}`)
        .then((response) => {
          this.Swal.fire(
            "Sucesso!",
            "Contato excluído com sucesso!",
            "success"
          );
          this.$emit("delete", this.contactId);
          this.$emit("close");
        })
        .catch((error) => {
          this.Swal.fire("Opss...", "Erro ao excluir contato!", "error");
        });
    },
  },
};
</script>