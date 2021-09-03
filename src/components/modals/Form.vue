<template>
  <v-dialog v-model="isOpen" max-width="610px">
    <v-card>
      <v-card-title
        class="text-h6 mb-3 card-title"
        v-text="title"
      ></v-card-title>
      <v-card-text class="px-3">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container fluid>
            <v-row>
              <v-col class="pb-0" cols="10">
                <label for="">Nome</label>
                <v-text-field
                  background-color="#F8F8F8"
                  height="36px"
                  v-model="item.name"
                  placeholder="Nome"
                  outlined
                  dense
                  required
                  class="required-input"
                  :rules="[(v) => !!v || 'Campo obrigatório']"
                  hide-details="auto"
                ></v-text-field>
              </v-col>

              <v-col class="pb-0" cols="10">
                <label for="">E-mail</label>
                <v-text-field
                  background-color="#F8F8F8"
                  height="36px"
                  v-model="item.email"
                  placeholder="E-mail"
                  outlined
                  dense
                  required
                  class="required-input"
                  :rules="[(v) => !!v || 'Campo obrigatório']"
                  hide-details="auto"
                ></v-text-field>
              </v-col>

              <v-col class="pb-0" cols="6">
                <label for="">Telefone</label>
                <v-text-field
                  background-color="#F8F8F8"
                  height="36px"
                  v-model="item.phone"
                  placeholder="Telefone"
                  outlined
                  dense
                  required
                  class="required-input"
                  :rules="[(v) => !!v || 'Campo obrigatório']"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col class="pb-0" cols="1"></v-col>
              <v-col class="pb-0" cols="6">
                <label for="">Celular</label>
                <v-text-field
                  background-color="#F8F8F8"
                  height="36px"
                  placeholder="Celular"
                  v-model="item.mobile"
                  outlined
                  dense
                  required
                  class="required-input"
                  :rules="[(v) => !!v || 'Campo obrigatório']"
                  hide-details="auto"
                ></v-text-field>
              </v-col>

              <v-col class="pb-0" cols="11">
                <label for="">Endereço</label>
                <v-text-field
                  background-color="#F8F8F8"
                  height="36px"
                  placeholder="Endereço"
                  v-model="item.address"
                  outlined
                  dense
                  hide-details="auto"
                ></v-text-field>
              </v-col>

              <v-col class="pb-0" cols="6">
                <label for="">Bairro</label>
                <v-text-field
                  background-color="#F8F8F8"
                  height="36px"
                  placeholder="Bairro"
                  v-model="item.district"
                  outlined
                  dense
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col class="pb-0" cols="3">
                <label for="">Estado</label>
                <v-text-field
                  background-color="#F8F8F8"
                  height="36px"
                  placeholder="Estado"
                  v-model="item.state"
                  outlined
                  dense
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
      title: "Adicionar novo contato",
      item: {},
    };
  },
  computed: {
    isOpen: {
      get(){
        return this.dialog
      },
      set(val){
        if(!val) this.$emit("close")
      }
    }
  },
  watch: {
    contactId(val) {
      if (val) {
        this.getItem();
        this.title = "Editar contato";
      } else {
        this.title = "Adicionar novo contato";
        this.item = {}
        this.$refs.form.reset()
      }
    },
  },
  methods: {
    getItem() {
      this.axios
        .get(`${this.BASE_URL}/contacts/${this.contactId}`)
        .then((response) => {
          this.item = response.data;
        });
    },
    closeDialog() {
      this.$refs.form.reset()
      this.$emit("close");
    },
    saveDialog() {
      if (this.$refs.form.validate()) {
        if (this.contactId) {
          this.axios
            .put(`${this.BASE_URL}/contacts/${this.contactId}`, this.item)
            .then((response) => {
              this.item = response.data  
              this.Swal.fire(
                "Sucesso!",
                "Contato atualizado com sucesso!",
                "success"
              );
              this.$emit("update", this.item);
              this.item = {};
              this.$emit("close");
            })
            .catch((error) => {
              this.Swal.fire("Opss...", "Erro ao atualizar contato!", "error");
            });
        } else {
          this.axios
            .post(`${this.BASE_URL}/contacts`, this.item)
            .then((response) => {
              this.item = response.data
              this.Swal.fire(
                "Sucesso!",
                "Contato adicionado com sucesso!",
                "success"
              );
              this.$emit("add", this.item);
              this.item = {};
              this.$emit("close");
            })
            .catch((error) => {
              this.Swal.fire("Opss...", "Erro ao adicionar contato!", "error");
            });
        }
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
.required-input >>> .v-input__slot::after,
.required-input >>> .v-input__slot::before,
.required-input >>> .error--text {
  color: #ad2213 !important;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.4px;
  padding-top: 5px;
}
.required-input.error--text >>> .v-input__slot fieldset{
  border: 1px solid #AD2213 !important;
}
.required-input >>> .v-text-field__details{
  padding-left: 0 !important;
}
</style>