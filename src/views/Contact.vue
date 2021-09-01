<template>
  <v-container>
    <show-dialog :dialogShow="dialogShow" :contact="selectedItem" @close="closeShowDialog" />

    <h3 class="mb-6">Contatos</h3>
    <v-row class="justify-space-between align-center elevation-5 rounded-lg">
      <v-col cols="3">
        <v-text-field
          outlined
          dense
          label="Buscar Contato"
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-btn color="primary">Adicionar Contato</v-btn>
      </v-col>
      <v-col cols="12" class="text-center">
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="5"
          class="elevation-1"
        >
          <template slot="no-data">
            <empty-table />
          </template>
          <template v-slot:item.name="{ item }">
            <div class="p-2 d-flex justify-start align-center">
              <img width="32" height="32" :src="item.photo_small" alt="" />
              <span class="ps-3" v-text="item.name"></span>
            </div>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="openShowDialog(item.id)">
              mdi-eye
            </v-icon>
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EmptyTable from "../components/EmptyTable";
import ShowDialog from "../components/modals/Show";

export default {
  name: "Contact",
  components: {
    EmptyTable,
    ShowDialog,
  },
  data() {
    return {
      headers: [
        { text: "Nome", value: "name" },
        { text: "Email", value: "email" },
        { text: "Telefone", value: "phone" },
        { text: "Actions", value: "actions" },
      ],
      q: false,
      items: [],
      selectedItem: {},
      dialogShow: false,
    };
  },
  watch: {
    dialogShow(val) {
      val || this.closeShowDialog();
    },
  },
  mounted() {
    this.list();
  },
  methods: {
    list(q = false) {
      var url = `${this.BASE_URL}/contacts`;
      if (q) {
        url += `?q=${this.search}`;
      }
      this.axios.get(url).then((response) => {
        console.log(response);
        this.items = response.data;
      });
    },
    openShowDialog(contact_id) {
      this.dialogShow = true;
      this.axios
        .get(`${this.BASE_URL}/contacts/${contact_id}`)
        .then((response) => {
          console.log(response);
          this.selectedItem = response.data;
        });
    },
    closeShowDialog() {
      this.dialogShow = false;
      this.selectedItem = {};
    },
  },
};
</script>