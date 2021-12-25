<template>
  <div class="foodList">
    <div class="foodList_header">
      <h3>Food Entries</h3>
      <a href="javascript:;" @click="showFoodModal"> Add new food entry </a>
    </div>
    <FilterFood />
    <div class="foodListGrid" v-if="foods.length > 0">
      <FoodListItem
        v-for="(food, index) in foods"
        :key="index"
        :allFood="food"
      />
    </div>
    <div class="foodListNoFood" v-else>
      {{
        user && user.isAdmin
          ? "There are no food entry yet"
          : "You have not added any food list"
      }}
    </div>
  </div>
</template>

<script>
import FoodListItem from "./FoodListItem.vue";
import FilterFood from "./FilterFood.vue";
export default {
  props: ["foods"],

  components: {
    FoodListItem,
    FilterFood,
  },

  data() {
    return {
      startDate: null,
      endDate: null,
      emptyfields: true,
    };
  },

  methods: {
    showFoodModal: function () {
      this.$store.dispatch("setFoodModal", true);
    },
  },
};
</script>

<style scoped>
.foodList {
  width: 1050px;
  margin: 90px auto;
}

.foodList_header {
  position: relative;
}

.foodList_header a {
  position: absolute;
  top: 0px;
  right: 0px;
  display: inline-block;
  background: #09b963;
  color: #fff;
  padding: 7px 28px;
  border-radius: 10px;
  border: 1px solid #ced4ed;
  font-size: 13px;
  font-weight: bold;
  text-decoration: none;
  transition: all 300ms ease-in-out;
}

.foodList h3 {
  margin-bottom: 50px;
  font-size: 26px;
}

.foodListGrid {
  display: block;
}

.foodListNoFood {
  text-align: center;
  margin-top: 40px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
}

@media screen and (max-width: 1100px) {
  .foodList {
    width: 95%;
  }
}

@media screen and (max-width: 650px) {
  .foodList h3 {
    font-size: 20px;
  }
}
</style>
