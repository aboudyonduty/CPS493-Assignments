<!-- بسم الله -->

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import LoginBadge from "./LoginBadge.vue";
const isActive = ref(false);
</script>

<template>
  <nav
    class="navbar is-dark has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <RouterLink class="navbar-item" to="/">
        <img
          alt="Vue logo"
          class="logo"
          src="@/assets/SuperSaiyanFitness.png"
          width="32"
          height="32"
        />
      </RouterLink>
      <a
        role="button"
        class="navbar-burger burger"
        :class="{ 'is-active': isActive }"
        @click="isActive = !isActive"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div
      id="navbarBasicExample"
      class="navbar-menu"
      :class="{ 'is-active': isActive }"
    >
      <div class="navbar-start">
        <RouterLink class="navbar-item" to="/">My Activity</RouterLink>
        <RouterLink class="navbar-item" to="/FriendsActivity"
          >Friends Activity</RouterLink
        >
        <RouterLink class="navbar-item" to="/UserAdminView"
          >Admin/User</RouterLink
        >
        <RouterLink class="navbar-item" to="/SearchView">Search</RouterLink>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <LoginBadge />
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar.is-dark {
  background-color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.router-link-active {
  font-weight: bold;
  color: #00d1b2 !important;
  border-bottom: 3px solid #00d1b2;
}
.navbar-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.logo {
  margin-right: 10px;
}
</style>
