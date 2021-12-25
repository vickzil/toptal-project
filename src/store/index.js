import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentPage: "",
    foodModal: false,
    isAdmin: false,
    user: null,
    foodEntries: [],
    calorieLimit: 2.1,
    foodName: "",
    foodId: null,
    calorie: 0,
    isEditting: false,
  },
  mutations: {
    SAVE_ALL_FOOD(state, foods) {
      state.foodEntries = foods;
    },

    SET_FOOD_MODAL(state, status) {
      state.foodModal = status;
    },

    SET_ADMIN_STATUS(state, status) {
      state.isAdmin = status;
    },

    SET_USER_NAME(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(state.user));
    },

    ADD_FOOD(state, food) {
      let allFoods = localStorage.getItem("foods")
        ? JSON.parse(localStorage.getItem("foods"))
        : null;

      if (allFoods) {
        let newFood = [food, ...allFoods];

        localStorage.setItem("foods", JSON.stringify(newFood));
      } else {
        localStorage.setItem("foods", JSON.stringify([food]));
      }

      setTimeout(() => {
        let allFoods = JSON.parse(localStorage.getItem("foods"));
        state.foodEntries = allFoods;
      }, 1200);
    },

    EDIT_FOOD(state, food) {
      let allFoods = state.foodEntries;

      let removeFood = allFoods.filter((oldFood) => oldFood.id !== food.id);

      if (removeFood) {
        let newFood = [food, ...removeFood];
        localStorage.setItem("foods", JSON.stringify(newFood));

        setTimeout(() => {
          let allFoods = JSON.parse(localStorage.getItem("foods"));
          state.foodEntries = allFoods;
        }, 1200);
      }
    },

    DELETE_FOOD(state, food) {
      let allFoods = state.foodEntries;

      let deletedFood = allFoods.filter((oldFood) => oldFood.id !== food.id);

      if (deletedFood) {
        localStorage.setItem("foods", JSON.stringify(deletedFood));
        state.foodEntries = deletedFood;
      }
    },
  },
  getters: {
    foodEntries(state) {
      return state.foodEntries;
    },

    user(state) {
      return state.user;
    },

    isAdmin(state) {
      return state.isAdmin;
    },

    calorieLimit(state) {
      return state.calorieLimit;
    },

    currentPage(state) {
      return state.currentPage;
    },
  },
  actions: {
    setFoodModal({ commit }, status) {
      commit("SET_FOOD_MODAL", status);
    },

    setUserName({ commit }, user) {
      commit("SET_USER_NAME", user);
    },

    addFood({ commit }, food) {
      commit("ADD_FOOD", food);
    },

    saveAllFoods({ commit }, foods) {
      commit("SAVE_ALL_FOOD", foods);
    },

    setAdminStatus({ commit }, status) {
      commit("SET_ADMIN_STATUS", status);
    },

    EditFood({ commit }, food) {
      commit("EDIT_FOOD", food);
    },
    deleteFood({ commit }, food) {
      commit("DELETE_FOOD", food);
    },
  },
});
