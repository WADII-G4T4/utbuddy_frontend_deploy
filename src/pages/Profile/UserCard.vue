<template>
  <card type="user">
    <p class="card-text"></p>
    <div class="author">
      <div class="block block-one"></div>
      <div class="block block-two"></div>
      <div class="block block-three"></div>
      <div class="block block-four"></div>
      <a href="#">
        <img
          class="avatar"
          v-if="gender == 'M'"
          src="img/anime3.png"
          alt="..."
        />
        <img class="avatar" v-else src="img/anime6.png" alt="..." /><br />
        <form @submit.prevent="save_picture" enctype="multipart/form-data">
          <input
            v-if="edit_photo"
            class="mx-auto pl-5 text-center"
            @change="uploadFile"
            ref="file"
            type="file"
          />
          <base-button
            v-if="!edit_photo"
            slot="footer"
            type="primary"
            fill
            @click.prevent="edit_photo = true"
            >Upload</base-button
          >
          <base-button
            v-if="edit_photo"
            slot="footer"
            type="primary"
            fill
            @click="save_picture"
            >Upload</base-button
          >
        </form>
        <base-button slot="footer" type="primary" fill @click="get"
          >Upload</base-button
        >
        <h3 class="title">{{ name }}</h3>
      </a>

      <p class="description" v-if="!edit_occupation">
        {{ occupation }}
        <i
          class="tim-icons icon-pencil pencil ml-2"
          @click="edit_occupation = !edit_occupation"
        ></i>
      </p>
      <base-input
        v-model="change_occupation"
        placeholder="Occupation"
        v-if="edit_occupation"
      >
      </base-input>
      <base-button
        v-if="edit_occupation"
        slot="footer"
        type="primary"
        fill
        @click="save_occupation"
        >Save</base-button
      >
      <p class="description mt-2" v-if="!edit_status">
        <span class="mr-2" v-if="!status">How are you feeling?</span>
        <span v-else class="mr-2">{{ status }}</span>
        <i
          class="tim-icons icon-pencil pencil "
          @click="edit_status = !edit_status"
        ></i>
      </p>
      <base-input
        v-model="change_status"
        placeholder="Status"
        v-if="edit_status"
      >
      </base-input>
      <base-button
        v-if="edit_status"
        slot="footer"
        type="primary"
        fill
        @click="save_status"
        >Save</base-button
      >
    </div>
    <p></p>
    <p class="card-description"></p>
    <div slot="footer" class="button-container">
      <base-button icon round class="btn-facebook">
        <i class="fab fa-facebook"></i>
      </base-button>
      <base-button icon round class="btn-twitter">
        <i class="fab fa-twitter"></i>
      </base-button>
      <base-button icon round class="btn-google">
        <i class="fab fa-google-plus"></i>
      </base-button>
    </div>
  </card>
</template>
<script>
import API from "../../api/API";
import BaseButton from "../../components/BaseButton.vue";
export default {
  components: {
    BaseButton
  },
  props: {
    name: null,
    occupation: null,
    gender: null,
    status: null,
    email: null
  },
  data() {
    return {
      edit_occupation: false,
      edit_status: false,
      change_occupation: null,
      change_status: null,
      edit_photo: false,
      images: null,
      image_name: null
    };
  },
  methods: {
    uploadFile() {
      this.images = this.$refs.file.files[0];
      console.log(this.images);
      const token = window.localStorage.getItem("token");
      this.images.name = token + this.images.name.split(".")[0];
      this.image_name = this.images.name;
    },
    async save_occupation() {
      this.edit_occupation = !this.edit_occupation;
      const token = window.localStorage.getItem("token");
      var occupation = this.change_occupation;
      try {
        const res = await API.occupation({ occupation }, token);
        this.occupation = occupation;
      } catch (err) {
        console.log(err);
      }
    },
    async save_status() {
      this.edit_status = !this.edit_status;
      const token = window.localStorage.getItem("token");
      var status = this.change_status;
      try {
        const res = await API.status({ status }, token);
        this.status = status;
      } catch (err) {
        console.log(err);
      }
    },
    async save_picture() {
      const formData = new FormData();
      formData.append("file", this.images);

      const token = window.localStorage.getItem("token");
      try {
        const res = await API.uploadPic(formData, token);
        const res1 = await API.updatePic({ picture: this.image_name }, token);
      } catch (err) {
        console.log(err);
      }
    },
    async get() {
      const token = window.localStorage.getItem("token");
      try {
        const res = await API.getPic({ name: "Profile Picture.jpg" }, token);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
<style>
.pencil {
  cursor: pointer;
}
</style>
