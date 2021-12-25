<template>
  <div class="header_user" v-if="user">
    <h5>
      Welcome <span class="for-green"> {{ user.name }}!</span>
    </h5>
    <a href="javascript:;" class="delete" @click="logoutUser"> Logout </a>
  </div>
</template>

<script>
import "@/mixins";
export default {
  computed: {},

  methods: {
    logoutUser: function () {
      this.$store.dispatch("setUserName", null);
      setTimeout(() => {
        location.reload();
      }, 100);
    },
  },
};
</script>

<style scoped>
.header_user {
  text-align: right;
  width: 100%;
  top: 20px;
  position: absolute;
  right: 20px;
  color: #fff;
}

.header_user h5 {
  font-size: 17px;
}

.header_user h5 {
  font-size: 17px;
}

.header_user a {
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

.header_user a:hover {
  transform: scale(1.1);
}
</style>
