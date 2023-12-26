<template>
  <div class="hero-body">
    <div class="column is-half is-offset-one-quarter">
      <div class="box">
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              v-model="email"
              class="input"
              type="email"
              placeholder="Email"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input
              v-model="password"
              class="input"
              type="password"
              placeholder="Password"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div class="field is-grouped">
          <p class="control">
            <button @click="doLogin" class="button is-success">Login</button>
          </p>
          <p class="control">
            <button @click="doSignUp" class="button is-light">Sign Up</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getSession, useLogin, useSignUp} from '@/model/session';

const router = useRouter();
const session = getSession();
const { login } = useLogin();
const { signUp } = useSignUp();
const email = ref('');
const password = ref('');
const username = ref('');
const firstName = ref('');
const lastName = ref('');

const isLoggedIn = ref(false);


const doLogin = () => {
  login(email.value, password.value);
}

const doSignUp = () => {
  signUp(email.value, password.value, username.value,firstName.value, lastName.value);
}
</script>

<style scoped>
/* Additional CSS if needed */
</style>
