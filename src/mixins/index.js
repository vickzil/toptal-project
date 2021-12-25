import Vue from "vue";

import { mapGetters } from "vuex";
Vue.mixin({
  computed: {
    ...mapGetters([
      "isAdmin",
      "foodEntries",
      "user",
      "calorieLimit",
      "currentPage",
    ]),
  },
  methods: {
    capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    removeTimeZone(datestring) {
      let finalDate = "";

      if (datestring.split("+").length > 1) {
        let b = datestring.split("T");
        finalDate = b[0];
      } else {
        let b = datestring.split("T");

        if (b.length > 1) {
          b.pop();
          finalDate = b.join("-");
        }
      }

      return finalDate;
    },

    formateDateNTime: function (date) {
      var d = new Date(date);
      var hours = d.getHours();
      var minutes = d.getMinutes();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      let returnedDate;

      returnedDate =
        d.getDate() +
        "/" +
        (d.getMonth() + 1) +
        "/" +
        d.getFullYear() +
        "  " +
        strTime;

      return returnedDate;
    },

    formateDateAndTimeByName: function (newDate) {
      const d = new Date(newDate);
      const year = d.getFullYear(); // 2019
      const date = d.getDate();
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      var hours = d.getHours();
      var minutes = d.getMinutes();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;

      const dayIndex = d.getDay();
      const dayName = days[dayIndex];

      const monthIndex = d.getMonth();
      const monthName = months[monthIndex];

      const formatted = `${dayName}, ${date} ${monthName} ${year}, ${strTime}`;

      return formatted;
    },

    shuffleArray: function (array) {
      var ctr = array.length,
        temp,
        index;
      while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = array[ctr];
        array[ctr] = array[index];
        array[index] = temp;
      }
      return array;
    },

    groupFoodArray: function (array) {
      const groups = array.reduce((groups, food) => {
        const date = this.removeTimeZone(food.date);

        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(food);
        return groups;
      }, {});

      const groupArrays = Object.keys(groups).map((date) => {
        return {
          date,
          foods: groups[date],
        };
      });

      return groupArrays;
    },
  },
});
