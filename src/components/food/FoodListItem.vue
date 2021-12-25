<template>
  <div class="foodListItem">
    <div class="foodListItem_header">
      <h2>
        Date: <span>{{ allFood.date }}</span>
      </h2>
      <h2>
        Total calories: <span> {{ totalCalories }}</span>
        <span
          class="calorieLimit"
          :class="totalCalories > calorieLimit ? 'exceeded' : 'normal'"
          >{{
            totalCalories > calorieLimit ? "Exceeded limit" : "Normal limit"
          }}</span
        >
      </h2>
    </div>

    <div class="foodListItem_foods">
      <FoodListItemCard
        v-for="(food, index) in allFood.foods"
        :key="index"
        :food="food"
      />
    </div>
  </div>
</template>

<script>
import "@/mixins";
import FoodListItemCard from "./FoodListItemCard.vue";
export default {
  props: ["allFood"],
  computed: {
    totalCalories() {
      let calories = 0;

      if (this.allFood && this.allFood.foods.length > 0) {
        calories = this.allFood.foods.reduce((a, b) => +a + +b.calorie, 0);
      }
      return calories;
    },
  },
  components: {
    FoodListItemCard,
  },
};
</script>

<style scoped>
.foodListItem_foods {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px 30px;
  margin-bottom: 15px;
}

.foodListItem_header {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.foodListItem h2 {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
  font-family: "Vollkorn", sans-serif;
}

.foodListItem h2 span {
  color: #0bc5dd;
}

.foodListItem h2 span.calorieLimit {
  font-size: 13px;
  margin-left: 12px;
  text-transform: capitalize !important;
}

.foodListItem h2 span.calorieLimit.exceeded {
  color: #d84906;
}

.foodListItem h2 span.calorieLimit.normal {
  color: #06d872;
}

.foodListItem h2:last-child {
  margin-bottom: 30px;
}
/* 
.foodListItem h2:last-child {
  margin-bottom: 30px;
} */

@media screen and (max-width: 1000px) {
  .foodListItem_foods {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 650px) {
  .foodListItem_foods {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
