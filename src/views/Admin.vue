<template>
  <div class="">
    <div class="backHome">
      <router-link
        v-if="user && user.isAdmin"
        class="btn bg-dark text-light"
        to="/"
        >Back to home</router-link
      >
    </div>
    <FoodList v-if="user" :foods="allFood" />
    <AuthenticateUser v-if="!user" />
  </div>
</template>

<script>
import FoodList from "../components/food/FoodList.vue";
import AuthenticateUser from "../components/Authenticate/AuthenticateUser.vue";
import "@/mixins";
export default {
  computed: {
    allFood() {
      let foods = [];
      if (this.user && this.foodEntries.length > 0) {
        // Sort food by date
        foods = this.foodEntries.slice(0).sort(function (a, b) {
          return a.date > b.date ? -1 : 1;
        });
        // Group food by date
        foods = this.groupFoodArray(foods);
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

<style scoped>
.backHome {
  width: 1050px;
  margin: 50px auto 30px;
}

@media screen and (max-width: 1100px) {
  .backHome {
    width: 95%;
  }
}
</style>
