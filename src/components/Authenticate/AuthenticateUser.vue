<template>
  <transition name="fade">
    <form v-on:submit.prevent="submit">
      <div class="form-group">
        <label for="">User Name</label>
        <input
          v-model.trim="userName"
          type="text "
          @input="validateForm"
          class="form-control"
          placeholder="Your name"
        />
        <div class="form-check mt-3">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="isuserAdmin"
            id="caloryCalculation"
          />
          <label class="form-check-label" for="caloryCalculation">
            Are you an Admin?
          </label>
        </div>
        <button :disabled="emptyFields" class="btn btn-success">Submit</button>
      </div>
    </form>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      emptyFields: true,
      loading: false,
      isuserAdmin: false,
    };
  },

  methods: {
    validateForm: function () {
      if (!this.userName) {
        this.emptyFields = true;
        return false;
      }

      this.emptyFields = false;
      return true;
    },
    submit: function () {
      let userData = {
        name: this.userName.toLowerCase(),
        isAdmin: this.isuserAdmin,
      };

      this.$store.dispatch("setUserName", userData);
      this.getFoodList();
    },

    getFoodList() {
      let allFoods = localStorage.getItem("foods")
        ? JSON.parse(localStorage.getItem("foods"))
        : null;

      if (allFoods) {
        this.$store.dispatch("saveAllFoods", allFoods);
      }
    },
  },
};
</script>

<style scoped>
form {
  width: 300px;
  margin: 120px auto 160px;
}

form label {
  font-weight: bold;
}

form button {
  width: 100%;
  margin-top: 20px;
}

@media screen and (max-width: 520px) {
  form {
    width: 90%;
  }
}
</style>
