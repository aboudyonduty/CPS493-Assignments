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
                    <input class="input" type="password" placeholder="Password" v-model="verifyPassword" required>
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
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: {
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          password: ''
        },
        verifyPassword: ''
      };
    },
    methods: {
      submitSignUp() {
        if (this.user.password !== this.verifyPassword) {
          alert("Passwords do not match.");
          return;
        }
        // Implement your sign-up logic here
        console.log('Submitted', this.user);
      }
    }
  };
  </script>
  
  <style scoped>
  /* You can add custom styles here if needed */
  </style>
  