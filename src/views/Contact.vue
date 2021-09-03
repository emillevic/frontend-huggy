<template>
  <div>
    <show-dialog
      :dialogShow="dialogShow"
      :contact="showItem"
      @close="closeShowDialog"
      @delete="openDeleteDialog"
      @update="openDialog"
    />
    <delete-dialog
      :dialogDelete="dialogDelete"
      :contactId="selectedItem.id"
      @close="closeDeleteDialog"
      @delete="deleteContact"
    />
    <form-dialog
      :dialog="dialog"
      :contactId="selectedItem.id"
      @close="closeDialog"
      @update="updateContact"
      @add="addContact"
    />
    <v-container class="pb-0">
      <h3 class="mb-6 font-weight-medium">Contatos</h3>
    </v-container>
    <v-container class="elevation-5 white">
      <v-row class="justify-space-between">
        <v-col cols="23" lg="3">
          <v-text-field
            background-color="#F8F8F8"
            height="36px"
            outlined
            hide-details="auto"
            dense
            v-model="search"
            label="Buscar Contato"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="2" class="mr-6 text-center">
          <v-btn color="primary" class="pl-3" @click="openDialog()">
            <v-icon class="pr-2">mdi-plus</v-icon>
            Adicionar Contato</v-btn
          >
        </v-col>
      </v-row>
      <v-row class="container-table">
        <v-col cols="12" class="text-center pa-0">
          <v-data-table
            hide-default-footer
            :headers="headers"
            :items="items"
            :search="search"
            :header-props="headerProps"
            @click:row="handleRowClick"
          >
            <template slot="no-data">
              <div
                class="empty-table-container d-flex align-center justify-center"
              >
                <empty-table />
              </div>
            </template>
            <template v-slot:item.name="{ item }">
              <div class="p-2 d-flex justify-start align-center">
                <v-avatar width="32" height="32">
                  <img :src="item.photo_small" alt="" />
                </v-avatar>
                <span class="ps-3" v-text="item.name"></span>
              </div>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click.stop="openDialog(item.id)">
                mdi-pencil
              </v-icon>
              <v-icon small @click.stop="openDeleteDialog(item.id)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import EmptyTable from "../components/EmptyTable";
import ShowDialog from "../components/modals/Show";
import DeleteDialog from "../components/modals/Delete";
import FormDialog from "../components/modals/Form";

export default {
  name: "Contact",
  components: {
    EmptyTable,
    ShowDialog,
    DeleteDialog,
    FormDialog,
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "Nome", value: "name" },
        { text: "Email", value: "email" },
        { text: "Telefone", value: "phone" },
        { text: "", value: "actions", sortable: false },
      ],
      headerProps: {
        sortByText: "Ordernar por",
      },
      q: false,
      items: [],
      showItem: {},
      selectedItem: {},
      dialogShow: false,
      dialogDelete: false,
      dialog: false,
    };
  },
  watch: {
    dialog(val) {
      val || this.closeDialog();
    },
    dialogShow(val) {
      val || this.closeShowDialog();
    },
    dialogDelete(val) {
      val || this.closeDeleteDialog();
    },
  },
  mounted() {
    this.list()
  },
  methods: {
    list(q = false) {
      this.axios.get(`${this.BASE_URL}/contacts`).then((response) => {
        this.items = response.data;
      });
    },
    handleRowClick(row) {
      this.openShowDialog(row.id);
    },
    openDialog(contact_id = null) {
      this.dialog = true;
      if (contact_id) {
        this.axios
          .get(`${this.BASE_URL}/contacts/${contact_id}`)
          .then((response) => {
            this.selectedItem = response.data;
          });
      }
    },
    openShowDialog(contact_id) {
      this.dialogShow = true;
      this.axios
        .get(`${this.BASE_URL}/contacts/${contact_id}`)
        .then((response) => {
          this.showItem = response.data;
        });
    },
    openDeleteDialog(contact_id) {
      this.dialogDelete = true;
      this.selectedItem = { id: contact_id };
    },
    closeShowDialog() {
      this.dialogShow = false;
      this.selectedItem = {};
    },
    closeDialog() {
      this.dialog = false;
      this.selectedItem = {};
    },
    closeDeleteDialog() {
      this.dialogDelete = false;
      this.selectedItem = {};
    },
    updateContact(item) {
      this.items.forEach((el, index) => {
        if (el.id === item.id) {
          this.items.splice(index, 1, item);
        }
      });
    },
    addContact(item) {
      this.items.push(item);
    },
    deleteContact(id) {
      this.items.forEach((el, index) => {
        if (el.id === id) {
          this.items.splice(index, 1);
        }
      });
    },
  },
};
</script>

<style scoped>
.container-table,
.empty-table-container {
  min-height: calc(100vh - 200px);
}
.container {
  border-radius: 16px;
}
.v-text-field,
.v-btn {
  border-radius: 8px;
}

.v-btn {
  text-transform: unset;
}
@media screen and (max-width: 992px) {
  .container-table,
  .empty-table-container {
    min-width: calc(100vw - 40px);
  }
}
</style>