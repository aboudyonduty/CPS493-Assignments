<!--InShaAllah-->

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { getUsers, type User } from '@/model/users';
import { getSession } from '@/model/session'; 

const USER_STORAGE_KEY = 'users-data';

const isAdmin = ref(false);
const isLoggedIn = ref(false);
const users = ref<User[]>([]);

onMounted(() => {
  const session = getSession();
  isLoggedIn.value = !!session.user;
  if (session.user && session.user.role === 'admin') {
    isAdmin.value = true;
  }

  const storedUsers = localStorage.getItem(USER_STORAGE_KEY);
  if (storedUsers) {
    users.value = JSON.parse(storedUsers);
  } else {
    const fetchedUsers = getUsers();
    users.value = fetchedUsers;
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(fetchedUsers));
  }
});

const newUser = ref({
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  role: 'user' as 'user' | 'admin'
});

const addUser = () => {
  users.value.unshift({
    id: Date.now(),
    ...newUser.value
  });

  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users.value));

  // Reset the form
  newUser.value = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    role: 'user'
  };
};

const deleteUser = (userId: number) => {
  if (window.confirm('Are you sure you want to delete this user?')) {
    users.value = users.value.filter(user => user.id !== userId);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users.value));
  }
};

// Watching for changes in users data
watch(users, (newUsers) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUsers));
});
</script>

<template>
  <div class="container">
    <h2 v-if="isAdmin">Users Administration</h2>

    <div v-if="isAdmin">
      <div class="add-user-form">
        <input v-model="newUser.firstName" placeholder="First Name">
        <input v-model="newUser.lastName" placeholder="Last Name">
        <input v-model="newUser.email" placeholder="Email">
        <input v-model="newUser.username" placeholder="Username">
        <input v-model="newUser.password" type="password" placeholder="Password">
        <select v-model="newUser.role">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button class="button is-primary" @click="addUser">Add User</button>
      </div>

      <!-- Displaying Users -->
      <div class="user-list">
        <div class="user-item" v-for="user in users" :key="user.id">
          <!-- First Name -->
          <div class="user-detail-section">
            <span class="user-label">First Name:</span>
            <span class="user-data">{{ user.firstName }}</span>
          </div>

          <!-- Last Name -->
          <div class="user-detail-section">
            <span class="user-label">Last Name:</span>
            <span class="user-data">{{ user.lastName }}</span>
          </div>

          <!-- Email -->
          <div class="user-detail-section">
            <span class="user-label">Email:</span>
            <span class="user-data">{{ user.email }}</span>
          </div>

          <!-- Username -->
          <div class="user-detail-section">
            <span class="user-label">Username:</span>
            <span class="user-data">{{ user.username }}</span>
          </div>

          <!-- Role -->
          <div class="user-detail-section">
            <span class="user-label">Is Admin:</span>
            <span class="user-data">{{ user.role === 'admin' ? 'Yes' : 'No' }}</span>
          </div>

          <!-- Actions -->
          <div class="user-detail-section">
            <button class="button is-danger" @click="user.id !== undefined ? deleteUser(user.id) : null">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="isLoggedIn">
      <!--Catches user attempting to view Admin Page While not being an Admin-->
      <p>You are logged in, but you need administrative privileges to view this page.</p>
    </div>

    <div v-else>
      <!--Catches user attempting view Admin Page While not being LoggedIn-->
      <p>You must be logged in and have administrative privileges to view this page.</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1000px;
  margin: 4rem auto;
  padding: 2rem;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #555;
}

h2 {
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 2rem;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.user-item {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1.5rem;
  background-color: #fafafa;
  border-radius: 8px;
  border: 1px solid #eaeaea;
}

.user-detail-section {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.user-label {
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #777;
}

.user-data {
  font-size: 1rem;
  color: #333;
}

.add-user-form {
  display: flex;
  gap: 10px;
  margin-top: 3rem;
  flex-wrap: wrap;
}

input, select {
  padding: 8px;
  margin-bottom: 1rem;
  border: 1px solid #eaeaea;
  border-radius: 5px;
}

.button.is-primary {
  background-color: #007aff;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  border: none;
  color: white;
  transition: background-color 0.2s ease;
}

.button.is-primary:hover {
  background-color: #005ed4;
}

.button.is-danger {
  background-color: #ff4c4c;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  border: none;
  color: white;
  transition: background-color 0.2s ease;
}

.button.is-danger:hover {
  background-color: #e02b2b;
}
</style>