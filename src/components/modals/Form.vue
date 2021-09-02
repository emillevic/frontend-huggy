<template>
  <v-dialog v-model="dialog" max-width="610px">
    <v-card>
      <v-card-title class="text-h6 mb-3 card-title"
        v-text="title"></v-card-title
      >
      <v-card-text class="px-3">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container fluid>
            <v-row>
              <v-col cols="10">
                <label for="">Nome</label>
                <v-text-field
                  background-color="#F8F8F8"
                  height="36px"
                  v-model="item.name"
                  placeholder="Nome"
                  outlined
                  dense
                  required
                  hide-details="auto"
                ></v-text-field>
              </v-col>

              <v-col cols="10">
                <label for="">E-mail</label>
                <v-text-field
                  background-color="#F8F8F8"
                  height="36px"
                  v-model="item.email"
                  placeholder="E-mail"
                  :rules="emailRules"
                  outlined
                  dense
                  required
                  hide-details="auto"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <label for="">Telefone</label>
                <v-text-field
                  background-color="#F8F8F8"
                  height="36px"
                  v-model="item.phone"
                  placeholder="Telefone"
                  outlined
                  dense
                  required
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="1"></v-col>
              <v-col cols="6">
                <label for="">Celular</label>
                <v-text-field
                  background-color="#F8F8F8"
                  height="36px"
                  placeholder="Celular"
                  v-model="item.cellphone"
                  outlined
                  dense
                  required
                  hide-details="auto"
                ></v-text-field>
              </v-col>

              <v-col cols="11">
                <label for="">Endereço</label>
                <v-text-field
                  background-color="#F8F8F8"
                  height="36px"
                  placeholder="Endereço"
                  v-model="item.address"
                  outlined
                  dense
                  required
                  hide-details="auto"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <label for="">Bairro</label>
                <v-text-field
                  background-color="#F8F8F8"
                  height="36px"
                  placeholder="Bairro"
                  v-model="item.district"
                  outlined
                  dense
                  required
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <label for="">Estado</label>
                <v-text-field
                  background-color="#F8F8F8"
                  height="36px"
                  placeholder="Estado"
                  v-model="item.state"
                  outlined
                  dense
                  required
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions class="card-actions">
        <v-spacer></v-spacer>
        <v-btn color="#505050" text @click="closeDialog">Cancelar</v-btn>
        <v-btn
          color="#321BDE"
          class="white--text btn-confirm"
          @click="saveDialog"
          >Salvar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    dialog: Boolean,
    contactId: String,
  },
  data() {
    return {
      valid: true,
      title: 'Adicionar novo contato',
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      item: {},
    };
  },
  watch: {
    contactId(val) {
      if(val) {
        this.getItem()
        this.title = "Editar contato"
      } else{
        this.title = "Adicionar novo contato"
      }
    }
  },
  methods: {
    getItem() {
      this.axios
        .get(`${this.BASE_URL}/contacts/${this.contactId}`)
        .then((response) => {
          console.log(response)
          this.item = response.data;
        });
    },
    closeDialog() {
      this.$emit("close");
    },
    saveDialog() {
      if (this.contactId) {
        this.axios
          .put(`${this.BASE_URL}/contacts/${this.contactId}`, this.item)
          .then((response) => {
            this.$emit("close");
          });
      } else {
        this.axios
          .post(`${this.BASE_URL}/contacts`, this.item)
          .then((response) => {
            this.$emit("close");
          });
      }
    },
  },
};
</script>

<style scoped>
.card-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e1e1e1;
}
.v-text-field {
  border-radius: 8px;
  border-color: #e1e1e1;
}
input,
.v-input__slot,
.v-text-field--outlined >>> fieldset {
  border-color: #e1e1e1 !important;
}
label {
  color: #262626;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.4px;
}
.btn-confirm {
  border-radius: 8px;
}
.card-actions {
  border-top: 1px solid #e1e1e1;
}
.card-actions button {
  text-transform: capitalize;
  letter-spacing: 1.25px;
  line-height: 18px;
}
</style>