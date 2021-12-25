<template>
  <transition name="fade">
    <div class="">
      <FoodList v-if="user" :foods="userFood" />
      <AuthenticateUser v-if="!user" />
    </div>
  </transition>
</template>

<script>
import FoodList from "../components/food/FoodList.vue";
import AuthenticateUser from "../components/Authenticate/AuthenticateUser.vue";
import "@/mixins";
export default {
  computed: {
    userFood() {
      let foods = [];
      if (this.user && this.foodEntries.length > 0) {
        foods = this.foodEntries.filter(
          (food) => food.user.toLowerCase() == this.user.name.toLowerCase()
        );

        if (foods.length) {
          // Sort food by date
          foods = foods.sort(function (a, b) {
            return a.date > b.date ? -1 : 1;
          });

          // Group food by date
          foods = this.groupFoodArray(foods);
        }
      }

      return foods;
    },
  },
  components: {
    FoodList,
    AuthenticateUser,
  },

  methods: {
    setCurrentPage() {
      this.$store.state.currentPage = this.$router.history.current.name;
    },
  },

  mounted() {
    this.setCurrentPage();
  },
};
</script>
