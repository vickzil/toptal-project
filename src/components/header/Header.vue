<template>
  <header>
    <HeaderUser />
    <div class="header-content">
      <div class="star">
        <i class="fa fa-star for-rating"></i>
        <i class="fa fa-star for-rating"></i>
        <i class="fa fa-star for-rating"></i>
        <i class="fa fa-star for-rating"></i>
        <i class="fa fa-star for-gray"></i>
      </div>
      <h1>Toptal<span class="for-green"> Foods</span></h1>
      <p>{{ currentPage }} Page</p>

      <router-link
        v-if="user && user.isAdmin && currentPage !== 'Admin'"
        class="btn bg-light text-dark"
        to="/admin"
        >Admin Page</router-link
      >
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <polygon
        class="svg--sm"
        fill="#f2f2f2"
        points="0,0 30, 100 65,21 90,100 100,75 100,100 0,100"
      />
      <polygon
        class="svg--lg"
        fill="#f2f2f2"
        points="0,0 15,100 33,21 45,100 50,75 55,100 72,20 85,100 95,50 100,80 100,100 0,100"
      />
    </svg>
  </header>
</template>

<script>
import HeaderUser from "./HeaderUser.vue";
export default {
  components: {
    HeaderUser,
  },
};
</script>

<style scoped></style>
