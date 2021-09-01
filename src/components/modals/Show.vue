<template>
  <v-dialog v-model="dialogShow" max-width="600px" content-class="show-dialog">
    <v-card>
      <v-card-title class="card-title">
        <div>
          <v-avatar>
            <img :src="contact.photo_small" />
          </v-avatar>
          <b class="text-h6 ms-5" v-text="contact.name"></b>
        </div>
        <div class="card-title-icons">
          <v-icon size="20" class="mr-7" color="#505050"> mdi-delete </v-icon>
          <v-icon size="20" class="mr-7" color="#505050"> mdi-pencil </v-icon>
          <v-icon size="20" @click="closeShowDialog()" class="mr-3" color="#505050"> mdi-close </v-icon>
        </div>
      </v-card-title>
      <v-card-text>
        <v-container class="show-content">
          <v-row>
            <v-col cols="2" class="d-flex justify-end">
              <b class="grey--text darken-1"> Email </b>
            </v-col>
            <v-col cols="9">
              <span class="contact-info" v-text="contact.email"></span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2" class="d-flex justify-end">
              <b class="grey--text darken-1"> Endereço </b>
            </v-col>
            <v-col cols="9">
              <span class="contact-info" v-text="contact.address"></span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2" class="d-flex justify-end">
              <b class="grey--text darken-1"> Bairro </b>
            </v-col>
            <v-col cols="9">
              <span class="contact-info" v-text="contact.district"></span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2" class="d-flex justify-end">
              <b class="grey--text darken-1"> Cidade </b>
            </v-col>
            <v-col cols="9">
              <span class="contact-info" v-text="contact.city"></span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2" class="d-flex justify-end">
              <b class="grey--text darken-1"> Estado </b>
            </v-col>
            <v-col cols="9">
              <span class="contact-info" v-text="contact.state"></span>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ShowDialog",
  props: {
    dialogShow: Boolean,
    contact: Object,
  },
  methods: {
    closeShowDialog(){
      this.$emit('close')
    }
  }
};
</script>

<style scoped>
.show-dialog{
  border-radius: 12px !important;
}
.v-avatar img {
  width: 32px;
  height: 32px;
  object-fit: cover;
}
.show-content .row {
  justify-content: center;
}
.card-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e1e1e1;
  margin-bottom: 0.75rem;
}
.contact-info {
  color: #262626;
}
</style>