<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop is-3-widescreen">
          <form class="box" @submit.prevent="handleLogin">
            <div class="field">
              <label for="email" class="label">Email</label>
              <div class="control has-icons-left">
                <input v-model="email" type="email" placeholder="e.g. bob@example.com" class="input" required>
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
              </div>
            </div>

            <div class="field">
              <label for="password" class="label">Password</label>
              <div class="control has-icons-left">
                <input v-model="password" type="password" placeholder="*******" class="input" required>
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
            </div>

            <div class="field">
              <button type="submit" class="button is-success">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getSession, useLogin } from '@/model/session';

const router = useRouter();
const session = getSession();
const { login } = useLogin();
const email = ref('');
const password = ref('');
const isLoggedIn = ref(false);

onMounted(() => {
  if (session.user) {
    isLoggedIn.value = true;
    // Add logic if needed for when user is already logged in
  }
});

const handleLogin = async () => {
  // Here you'd add your login logic using the login function from useLogin
  // For example: await login(email.value, password.value);
  // Redirect after login or handle errors
};
</script>

<style scoped>
/* Additional CSS if needed */
</style>
