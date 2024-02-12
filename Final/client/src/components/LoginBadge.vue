<!-- بسم الله -->

<script setup lang="ts">
import { getSession, useLogin } from "@/model/session";

const session = getSession();
const { logout } = useLogin();

// LogOut
const doLogout = () => {
  logout();
};
</script>

<template>
  <div class="has-text-right" v-if="session.user">
    Welcome, {{ session.user.firstName }} {{ session.user.lastName }} <br />
    <small>
      {{ session.user.username }}
      <a class="button is-small is-light is-warning" @click.prevent="doLogout">
        <span class="icon">
          <i class="fas fa-sign-out-alt"></i>
        </span>
      </a>
    </small>
  </div>
</template>

<style scoped></style>
