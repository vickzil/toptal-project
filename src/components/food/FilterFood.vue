<template>
  <div class="foodList_filter">
    <h5>Filter foods</h5>
    <hr />
    <form class="form form-inline" v-on:submit.prevent="filterFoods">
      <div class="form-group">
        <label for="">Date from</label>
        <input type="date" v-model="startDate" class="form-control" />
      </div>
      <div class="form-group">
        <label for="" style="display: block">Date To</label>
        <input type="date" v-model="endDate" class="form-control" />
      </div>
      <div class="form-group form-group-button">
        <button type="submit" class="btn btn-sm btn-dark text-light border">
          <span v-if="!loading">Filter</span>
          <span class="loader" v-if="loading"></span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  computed: {
    foodEntries: {
      get() {
        return this.$store.state.foodEntries;
      },

      set(value) {
        return (this.$store.state.foodEntries = value);
      },
    },
  },
  data() {
    return {
      startDate: "",
      endDate: "",
      loading: false,
    };
  },

  methods: {
    filterFoods: function () {
      if (!this.startDate || !this.endDate) {
        return false;
      }

      let allFoods = localStorage.getItem("foods")
        ? JSON.parse(localStorage.getItem("foods"))
        : null;

      if (allFoods && allFoods.length > 0) {
        let endDate = new Date(this.endDate);
        let stateDate = new Date(this.startDate);

        let result = allFoods.filter((d) => {
          var newDate = new Date(d.date);
          return stateDate < newDate && newDate < endDate;
        });

        this.foodEntries = result;

        console.log(result);
      } else {
        alert("There are no food entry yet");
      }

      return true;
    },
  },
};
</script>

<style scoped>
[class*="loader"]:before {
  content: "Filtering...";
}
.foodList_filter {
  background: #fff;
  padding: 15px;
  margin-bottom: 50px;
  border-radius: 10px;
}

.foodList_filter h5 {
  font-family: "Questrial", sans-serif;
  font-weight: bold;
  font-size: 17px;
}

.foodList_filter form .form-group label {
  margin-right: 10px;
}

.foodList_filter form .form-group {
  margin-right: 30px;
}

@media screen and (max-width: 530px) {
  form.form-inline {
    flex-flow: column wrap;
  }
  form.form-inline .form-group {
    width: 100%;
  }

  .form-group-button {
    text-align: center;
  }
}
</style>
