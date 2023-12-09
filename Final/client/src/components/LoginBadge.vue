<!--InShaAllah-->

<script setup lang="ts">
import { ref } from 'vue';
import { getSession, useLogin } from '@/model/session';

const session = getSession();
const { login, logout } = useLogin();

//list of all available users you can LogInto
const defaultUsers = ref([
  { id: 1, email: 'aoali726@gmail.com', password: '9uQFF1Lh', name: 'Abdullah Ali' },
  { id: 2, email: 'superswag2077@icloud.com', password: 'CQutx25i8r', name: 'Swagatron McSwaggy' },
  { id: 3, email: 'rshawe2@51.la', password: 'OWsTbMUgFc', name: 'Terrill Hills' },
  { id: 4, email: 'yraigatt3@nature.com', password: 'sRQxjPfdS', name: 'Miles Cummerata' },
]);
//looks to see if email and password match up in order to LogIn
const doLogin = (email: string, password: string) => {
  login(email, password);
}
//LogOut
const doLogout = () => {
  logout();
}
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
  <div class="buttons" v-else>
    <div class="dropdown is-hoverable is-right">
      <div class="dropdown-trigger">
        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
          <span>Log in</span>
          <span class="icon is-small">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <a 
            v-for="user in defaultUsers" 
            :key="user.id" 
            class="dropdown-item"
            @click.prevent="doLogin(user.email, user.password)"
          >
            {{ user.name }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
