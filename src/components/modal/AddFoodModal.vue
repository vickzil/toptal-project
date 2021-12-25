<template>
  <div class="foodModal" v-if="user && foodModal">
    <div class="foodModal-overlay" @click="closeFoodModal"></div>
    <div class="foodModal-card vivify popInBottom">
      <div class="close-foodModal-button">
        <i class="bx bx-x" @click="closeFoodModal"></i>
      </div>

      <div class="foodModal-body">
        <h4>{{ isEditting ? "Edit Food" : "Add Food" }}</h4>
        <form v-on:submit.prevent="addFood">
          <div class="form-group">
            <label for="">Food Name</label>
            <input
              type="text"
              @input="validateForm"
              class="form-control"
              v-model="foodName"
              placeholder="food name "
            />
          </div>
          <div class="form-group">
            <label for="">Food Calorie value</label>
            <input
              type="text"
              class="form-control"
              v-model="calorie"
              @input="validateForm"
              oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"
            />
          </div>

          <div class="foodModal-button text-center">
            <button :disabled="emptyFields" type="submit" class="">
              <span v-if="!loading">Submit</span>
              <span class="loader" v-if="loading"></span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import "@/mixins";
export default {
  computed: {
    ...mapState(["foodModal"]),
    foodName: {
      get() {
        return this.$store.state.foodName;
      },

      set(value) {
        return (this.$store.state.foodName = value);
      },
    },
    calorie: {
      get() {
        return this.$store.state.calorie;
      },

      set(value) {
        return (this.$store.state.calorie = value);
      },
    },
    isEditting: {
      get() {
        return this.$store.state.isEditting;
      },

      set(value) {
        return (this.$store.state.isEditting = value);
      },
    },
    foodId: {
      get() {
        return this.$store.state.foodId;
      },

      set(value) {
        return (this.$store.state.foodId = value);
      },
    },
  },

  data() {
    return {
      emptyFields: true,
      includeCalculation: true,
      loading: false,
    };
  },
  methods: {
    closeFoodModal: function () {
      this.$store.dispatch("setFoodModal", false);
      this.foodName = "";
      this.calorie = 0;
      this.isEditting = false;
      this.foodId = null;
    },

    validateForm: function () {
      if (!this.foodName || !this.calorie) {
        this.emptyFields = true;
        return false;
      }

      this.emptyFields = false;
      return true;
    },

    addFood: function () {
      this.loading = true;

      let foodData = {
        id: this.isEditting ? this.foodId : this.foodEntries.length + 1,
        name: this.foodName,
        calorie: this.calorie,
        date: new Date(),
        user: this.user.name.toLowerCase(),
        includeCalculation: this.includeCalculation,
      };

      setTimeout(() => {
        this.clearForm();
        if (this.isEditting) {
          this.$store.dispatch("EditFood", foodData);
        } else {
          this.$store.dispatch("addFood", foodData);
        }

        this.loading = false;
      }, 2000);
      setTimeout(() => {
        this.closeFoodModal();
      }, 2500);
    },

    clearForm: function () {
      this.foodName = "";
      this.calorie = 0;
      this.emptyFields = true;
      this.includeCalculation = true;
      this.loading = false;
    },
  },
};
</script>

<style scoped>
[class*="loader"]:before {
  content: "Submitting...";
}
/* food Modal */
.foodModal {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  bottom: 0 !important;
  width: 100% !important;
  height: 100% !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 9900 !important;
  transition: 800ms ease;
}

.foodModal-overlay {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  bottom: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background: rgba(61, 61, 63, 0.541);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 9910 !important;
  transition: 800ms ease;
  cursor: pointer;
}

.foodModal-card {
  position: relative !important;
  background: rgb(255, 255, 255);
  width: 400px;
  height: auto;
  padding: 17px 19px;
  display: block;
  border-radius: 30px;
  box-shadow: 3px 6px 10px 0 rgb(0 102 245 / 7%);
  z-index: 9940 !important;
}

.foodModal-card .close-foodModal-button {
  text-align: right;
}

.foodModal-card .close-foodModal-button i {
  color: #1e1d1d;
  font-size: 27px;
  cursor: pointer;
  padding: 2px;
}

.foodModal-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Vollkorn", sans-serif;
}

.foodModal-body h4 {
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  letter-spacing: -0.382609px;
  color: #09b963;
  margin-bottom: 12px;
}

.foodModal-body form {
  text-align: left;
  width: 100%;
  margin-top: 30px;
}

.foodModal-body form .form-group {
  margin-bottom: 30px;
}

.foodModal-body form label {
  font-size: 15px;
}

.foodModal-body p {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  letter-spacing: -0.382609px;
  color: #5f5f5f;
  width: 79%;
  margin: 4px auto 15px;
}

.foodModal .foodModal-body .foodModal-button {
  margin-top: 10px;
  margin-bottom: 30px;
}

.foodModal .foodModal-body .foodModal-button button {
  background: #09b963;
  color: #fff;
  border-radius: 40px;
  border: 1px solid #09b963;
  padding: 10px 30px;
  font-weight: bold;
  transition: all 300ms ease-in-out;
  font-size: 13px;
}

.foodModal .foodModal-body .foodModal-button button:focus {
  outline: none;
  outline-color: transparent;
}

.foodModal .foodModal-body .foodModal-button button:disabled {
  background: #8ad1af;
  border: 1px solid #8ad1af;
}

.foodModal .foodModal-body .foodModal-button button:hover {
  /* transform: scale(1.1); */
  background: #fff;
  color: #09b963;
}


@media screen and (max-width: 530px) {
  
.foodModal-card {
  width: 95%;
}
}
</style>
