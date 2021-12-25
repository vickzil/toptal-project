<template>
  <div id="app">
    <Header />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <AddFoodModal />
    <Footer />
  </div>
</template>

<script>
import "./assets/css/style.css";
import Header from "./components/header/Header.vue";
import Footer from "./components/footer/Footer.vue";
import AddFoodModal from "./components/modal/AddFoodModal.vue";
export default {
  components: {
    Header,
    AddFoodModal,
    Footer,
  },

  methods: {
    getUser: function () {
      let localUser = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null;

      if (localUser) {
        this.$store.dispatch("setUserName", localUser);
        this.getFoodList();
      }
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

  mounted() {
    this.getUser();
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  /* transform: scale(0.9); */
}
</style>
