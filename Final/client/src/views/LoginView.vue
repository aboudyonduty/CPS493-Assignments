<template>
  <section class="section">
    <div class="container">
      <div class="column is-6 is-offset-3">
        <h1 class="title has-text-centered">Login</h1>
        <div class="box">

          <!-- Email Field -->
          <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left">
              <input v-model="email" class="input" type="email" placeholder="Email" required>
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
          </div>

          <!-- Password Field -->
          <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-left">
              <input v-model="password" class="input" type="password" placeholder="Password" required>
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </div>
          </div>

          <!-- Login Button -->
          <div class="field">
            <p class="control">
              <button @click="doLogin" class="button is-success is-fullwidth">Login</button>
            </p>
          </div>

          <!-- Sign Up Prompt -->
          <div class="has-text-centered">
            <p>Don't have an account? <a @click="navigateToSignUp" class="signup-prompt">Sign Up!</a></p>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getSession, useLogin } from '@/model/session';

const router = useRouter();
const session = getSession();
const { login } = useLogin();
const email = ref('');
const password = ref('');

const navigateToSignUp = () => {
  router.push({ name: 'SignUpView' });
};

const doLogin = () => {
  login(email.value, password.value);
}
</script>

<style scoped>
/* You can adjust these styles to match the sign-up page more closely */
.section {
  padding: 40px;
}

.box {
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1);
}

.title {
  margin-bottom: 20px;
}

.field:not(:last-child) {
  margin-bottom: 15px;
}

.button.is-fullwidth {
  margin-top: 10px;
}
</style>
