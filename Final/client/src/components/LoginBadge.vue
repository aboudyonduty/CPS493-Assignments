<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getSession, useLogin } from '@/model/session';

const router = useRouter();
const session = getSession();
const { logout } = useLogin();

// Reactivity check (if needed)
onMounted(() => {
  // Code to ensure session is reactive, if necessary
});

// Navigate to LoginView
const navigateToLogin = () => {
  router.push({ name: 'LoginView' });
};

// LogOut
const doLogout = () => {
  logout();
};
</script>


<template>
  <div class="has-text-right" v-if="session.user">
    Welcome, {{ session.user.firstName }} {{ session.user.lastName }} <br>
    <small>
      {{ session.user.email }}
      <a class="button is-small is-light is-warning" @click.prevent="doLogout">
        <span class="icon">
          <i class="fas fa-sign-out-alt"></i>
        </span>
      </a>
    </small>
  </div>
</template>


<style scoped>
/* Your styles here */
</style>
