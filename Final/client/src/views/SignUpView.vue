<template>
  <section class="section">
    <div class="container">
      <div class="column is-6 is-offset-3">
        <h1 class="title has-text-centered">Sign Up</h1>
        <div class="box">
          <form @submit.prevent="submitSignUp">

            <!-- Row 1: First Name and Last Name -->
            <div class="columns">
              <div class="column field">
                <label class="label">First Name</label>
                <div class="control has-icons-left">
                  <input class="input" type="text" placeholder="First Name" v-model="user.firstName" required>
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
              </div>
              
              <div class="column field">
                <label class="label">Last Name</label>
                <div class="control has-icons-left">
                  <input class="input" type="text" placeholder="Last Name" v-model="user.lastName" required>
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
              </div>
            </div>

            <!-- Row 2: Username and Email -->
            <div class="columns">
              <div class="column field">
                <label class="label">Username</label>
                <div class="control has-icons-left">
                  <input class="input" type="text" placeholder="Username" v-model="user.username" required>
                  <span class="icon is-small is-left">
                    <i class="fas fa-user-circle"></i>
                  </span>
                </div>
              </div>
              
              <div class="column field">
                <label class="label">Email</label>
                <div class="control has-icons-left">
                  <input class="input" type="email" placeholder="Email" v-model="user.email" required>
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                  </span>
                </div>
              </div>
            </div>

            <!-- Row 3: Password and Verify Password -->
            <div class="columns">
              <div class="column field">
                <label class="label">Password</label>
                <div class="control has-icons-left">
                  <input class="input" type="password" placeholder="Password" v-model="user.password" required>
                  <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                </div>
              </div>

              <div class="column field">
                <label class="label">Verify Password</label>
                <div class="control has-icons-left">
                  <input class="input" type="password" placeholder="Verify Password" v-model="verifyPassword" required>
                  <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="field">
                <div class="control">
                  <button class="button is-primary is-fullwidth">Sign Up</button>
                </div>
              </div>
            </form>

            <!-- Login Redirect -->
            <p class="has-text-centered">
              Already have an account? 
              <a @click="goToLoginPage" class="login-prompt">Login!</a>
            </p>
          </div>
        </div>
      </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSignUp } from '@/model/session';

const router = useRouter();
const { signUp } = useSignUp();
const user = ref({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
});
const verifyPassword = ref('');

const submitSignUp = () => {
  if (user.value.password !== verifyPassword.value) {
    alert('Passwords do not match!');
    return;
  }

  signUp({ ...user.value, _id: '', role: 'user' });
};

const goToLoginPage = () => {
  router.push({ name: 'LoginView' });
};


</script>

<style scoped>
/* You can add custom styles here if needed */
.field.is-grouped {
  display: flex;
  justify-content: space-between;
}

.login-prompt {
  color: #3273dc;
  cursor: pointer;
}

.login-prompt:hover {
  text-decoration: underline;
}
</style>
