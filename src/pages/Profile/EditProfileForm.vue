<template>
  <card>
    
    <h3 slot="header" class="title">Edit Profile</h3>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <base-input
          label="Email address"
          type="email"
          placeholder="mike@email.com"
          v-model="email"
          disabled
        >
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <base-input
          label="First Name"
          v-model="firstName"
          placeholder="First Name"
        >
        </base-input>
      </div>
      <div class="col-md-6 pl-md-1">
        <base-input
          label="Last Name"
          v-model="lastName"
          placeholder="Last Name"
        >
        </base-input>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <base-input
          label="Address"
          v-model="address"
          placeholder="Home Address"
        >
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 pr-md-1">
        <base-input label="Postal Code" placeholder="ZIP Code" v-model="zip">
        </base-input>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-md-9 pr-md-1">
        <label class="control-label">
          About
        </label>
        <textarea
          class="form-control w-100 textbox"
          cols="2"
          rows="3"
          placeholder="Describe yourself"
          v-model="description"
        >
        </textarea>
      </div>
    </div>
    <label class="control-label">
      Tips
    </label>
    <div class="row" v-for="(tip, index) in tips" :key="index">
      <div class="col-md-8">
        <ul>
          <li>
            <textarea
              rows="3"
              cols="80"
              class="form-control"
              placeholder="Key in any relevant tips"
              v-model="tip.words"
            >
            </textarea>
          </li>
        </ul>
      </div>
      <div class="col-md-4">
        <i
          class="tim-icons icon-trash-simple add m-auto"
          @click="remove(index)"
        ></i>
      </div>
    </div>
    <button @click="addTip" class="btn btn-black btn-sm">
      <i class="tim-icons icon-simple-add add m-auto"></i>
    </button>
    <div @click="save" class="mt-4" >
        <vue-loading-button
          :loading="isLoading"
          style="font-size: 18px;"
          class="btn btn-primary "
          
          >{{Save}}</vue-loading-button
        >
        </div>
  </card>
</template>
<script>
import API from "../../api/API";
export default {
  props: {
    tips: [],
    firstName: null,
    lastName: null,
    address: null,
    zip: null,
    email: null,
    description: null
  },
  data() {
    return {
      Save: "Save",
      isLoading: false
      
    };
  },

  methods: {
    addTip() {
      this.tips.push({ words: "" });
    },
    async save() {
      this.isLoading = true;
      const token = window.localStorage.getItem("token");
      var name = this.firstName + " " + this.lastName;
      var address = this.address;
      var zip = this.zip;
      var description = this.description;
      try {
        const res1 = await API.updateProfile(
          { name, address, zip, description },
          token
        );
        const res = await API.addTip({ tips: this.tips }, token);
        
        this.Save = "Saved!"
        this.$emit("modal", "Successfully Saved!")
        this.isLoading = false;
      } catch (err) {
        this.$emit("modal", "Error has occurred. Please try again")
        
        console.log(err);
      }
    },
    remove(val) {
      this.tips.splice(val, 1);
    }
  }
};
</script>
<style>
.add {
  color: white;
  cursor: pointer;
}

.textbox {
  border: 1px solid #2b3553 !important;
  border-radius: 6px !important;
  padding-left: 17px !important;
}

label {
  font-size: 15px !important;
}
</style>
