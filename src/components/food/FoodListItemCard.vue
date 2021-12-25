<template>
  <div class="foodList_card" v-if="food">
    <div class="foodList_card_header">
      <div class="foodList_card_header_top">
        <h4>{{ food.name }}</h4>
      </div>
      <span>by {{ food.user }}</span>
    </div>

    <div class="foodList_card_body_center calories">
      <p>
        Calories
        <span>{{ food.calorie }}</span>
      </p>
    </div>

    <div class="foodList_card_body_center">
      <p>
        <i class="bx bx-calendar"></i>
        <span>{{ formateDateNTime(food.date) }}</span>
      </p>
    </div>

    <div
      class="foodList_card_body_footer"
      v-if="user.isAdmin && currentPage == 'Admin'"
    >
      <a href="javascript:;" @click="EditFood(food)">
        <span>Edit </span>
      </a>
      <a href="javascript:;" class="delete" @click="deleteFood(food)">
        <span>Delete </span>
      </a>
    </div>
  </div>
</template>

<script>
import "@/mixins";
export default {
  props: ["food"],

  methods: {
    EditFood: function (food) {
      this.$store.state.isEditting = true;
      this.$store.state.foodName = food.name;
      this.$store.state.foodId = food.id;
      this.$store.state.calorie = food.calorie;

      setTimeout(() => {
        this.$store.dispatch("setFoodModal", true);
      }, 300);
    },
    deleteFood: function (food) {
      if (confirm("Are you sure you want to delete this food?")) {
        this.$store.dispatch("deleteFood", food);
      }
    },
  },
};
</script>

<style scoped>
.foodList_card {
  background: #fff;
  padding: 15px 25px 10px;
  border-radius: 8px;
}

body.dark-mode .foodList_card {
  background: #2f3a44;
  color: #fff;
}

.foodList_card p {
  margin-bottom: 0px;
}

.foodList_card_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.foodList_card_header_top {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.foodList_card_header h4 {
  cursor: pointer;
  transition: all 200ms ease-in-out;
}

.foodList_card_header h4:hover {
  color: #09b963 !important;
}

.foodList_card_header h4 {
  font-weight: 800;
  font-size: 16px;
  color: #5c5c5c;
}

body.dark-mode .foodList_card_header h4 {
  color: #c9c9c9;
}

.foodList_card_header span {
  font-weight: 800;
  font-size: 14px;
}

.foodList_card_body_center {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
}

.foodList_card_body_center i,
.foodList_card_body_footer i {
  margin-right: 10px;
  font-size: 15px;
}

.foodList_card_body_center span,
.foodList_card_body_footer span {
  font-size: 15px;
}

.foodList_card_body_center.calories span {
  color: #09b963;
}

.foodList_card_body_footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  font-family: "Vollkorn", sans-serif;
}

.foodList_card_body_footer a {
  display: inline-block;
  background: #fff;
  color: #09b963;
  padding: 3px 18px;
  border-radius: 10px;
  border: 1px solid #ced4ed;
  font-size: 11px;
  font-weight: bold;
  text-decoration: none;
  transition: all 300ms ease-in-out;
}

.foodList_card_body_footer a.delete {
  background: #b92309;
  color: #fff;
  border: 1px solid #ced4ed;
}

.foodList_card_body_footer a:hover {
  background: #09b963;
  color: #fff;
}

.foodList_card_body_footer a.delete:hover {
  background: #fff;
  color: #222;
  border: 1px solid #b92309;
}

.foodList_card_body_footer a span {
  font-size: 11px;
}
</style>
