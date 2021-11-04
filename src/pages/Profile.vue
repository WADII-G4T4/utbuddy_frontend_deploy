<template>
  <div class="row">
    <div class="col-md-8">
      <edit-profile-form
        :tips="tips"
        :firstName="firstName"
        :lastName="lastName"
        :address="address"
        :zip="zip"
        :email="email"
        :description="description"
      >
      </edit-profile-form>
    </div>
    <div class="col-md-4">
      <user-card
        :name="name"
        :occupation="occupation"
        :gender="gender"
        :status="status"
      ></user-card>
    </div>
  </div>
</template>
<script>
import API from "../api/API";
import EditProfileForm from "./Profile/EditProfileForm";
import UserCard from "./Profile/UserCard";
export default {
  components: {
    EditProfileForm,
    UserCard
  },
  data() {
    return {
      
      tips: [],
      firstName: null,
      lastName: null,
      address: null,
      zip: null,
      email: null,
      name: null,
      occupation: null,
      gender: null,
      status: null,
      description: null
    };
  },
  async mounted() {
    const token = window.localStorage.getItem("token");
    try {
      const res = await API.findTip(token);
      this.tips = res.data[0].tips;
    } catch (error) {}
    try {
      const res1 = await API.findProfile(token);

      const { name, address, zip, email, occupation, gender, status, description } = res1.data[0];

      this.firstName = name.split(" ")[0];
      this.lastName = name.split(" ")[1];
      this.address = address;
      this.zip = zip;
      this.email = email;
      this.name = name;
      this.occupation = occupation;
      this.gender = gender;
      this.status = status;
      this.description = description
      
    } catch (error) {
      console.log(error);
    }
  }
};
</script>
<style></style>
