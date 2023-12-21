<!--InShaAllah-->

<template>
  <div class="container">
    <h2 v-if="isAdmin">Users Administration</h2>

    <div v-if="isAdmin">
      <!-- Add User Form -->
      <div class="add-user-form">
        <input v-model="newUser.firstName" placeholder="First Name" />
        <input v-model="newUser.lastName" placeholder="Last Name" />
        <input v-model="newUser.email" placeholder="Email" />
        <input v-model="newUser.username" placeholder="Username" />
        <input v-model="newUser.password" type="password" placeholder="Password" />
        <!-- <select v-model="newUser.role">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select> -->
        <!-- <button class="button is-primary" @click="addUser">Add User</button> -->
      </div>

      <!-- User List -->
      <div class="user-list">
        <div class="user-item" v-for="user in users" :key="user.email">
          <!-- User Details -->
          <div class="user-detail-section">
            <span class="user-label">First Name:</span>
            <span class="user-data">{{ user.firstName }}</span>
          </div>
          <div class="user-detail-section">
            <span class="user-label">Last Name:</span>
            <span class="user-data">{{ user.lastName }}</span>
          </div>
          <div class="user-detail-section">
            <span class="user-label">Email:</span>
            <span class="user-data">{{ user.email }}</span>
          </div>
          <div class="user-detail-section">
            <span class="user-label">Username:</span>
            <span class="user-data">{{ user.username }}</span>
          </div>
          <div class="user-detail-section">
            <span class="user-label">Role:</span>
            <span class="user-data">{{ user.role }}</span>
          </div>
          <!-- Delete User -->
          <button class="button is-danger" @click="deleteUser(user.email)">Delete</button>
        </div>
      </div>
    </div>

    <div v-else-if="isLoggedIn">
      <p>You are logged in, but you need administrative privileges to view this page.</p>
    </div>

    <div v-else>
      <p>You must be logged in and have administrative privileges to view this page.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { getUsers, type User } from '@/model/users';
import { getSession } from '@/model/session'; 
const session = getSession();
const USER_STORAGE_KEY = 'users-data';

const isAdmin = ref(false);
const isLoggedIn = ref(false);
const users = ref<User[]>([]);

const newUser = ref({
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
});

onMounted(() => {
  isLoggedIn.value = !!session.user;
  // isAdmin.value = session.user && session.user.role === 'admin';

  const storedUsers = localStorage.getItem(USER_STORAGE_KEY);
  console.log(storedUsers);
  if (storedUsers) {
    users.value = JSON.parse(storedUsers);
  } else {
    const fetchedUsers = getUsers();
    //users.value = fetchedUsers;
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(fetchedUsers));
  }
});
/*onMounted(() => {
  const session = getSession();
  isLoggedIn.value = !!session.user;
  isAdmin.value = session.user && session.user.role === 'admin';

  const storedUsers = localStorage.getItem(USER_STORAGE_KEY);
  if (storedUsers) {
    users.value = JSON.parse(storedUsers);
  } else {
    const fetchedUsers = getUsers();
    users.value = fetchedUsers;
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(fetchedUsers));
  }
// });*/

// const addUser = () => {
//   const existingUser = users.value.find(user => user.email === newUser.value.email);
//   if (existingUser) {
//     alert('A user with this email already exists.');
//     return;
//   }

//   users.value.unshift({
//     ...newUser.value
//   });

//   localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users.value));

//   // Reset the form
//   newUser.value = {
//     firstName: '',
//     lastName: '',
//     email: '',
//     username: '',
//     password: '',
//     role: 'user'
//   };
// };

const deleteUser = (userEmail: string) => {
  if (window.confirm('Are you sure you want to delete this user?')) {
    users.value = users.value.filter(user => user.email !== userEmail);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users.value));
  }
};

watch(users, (newUsers) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUsers));
});
</script>

<style scoped>
/* Your CSS styles here */
</style>


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