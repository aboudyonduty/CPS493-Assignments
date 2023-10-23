<template>
  <div v-if="isAdmin" class="admin-view">
    <h2>Users Administration</h2>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Username</th>
          <th>Is Admin</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.role === 'admin' ? 'Yes' : 'No' }}</td>
          <td>
            <button @click="user.id !== undefined ? deleteUser(user.id) : null">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Add user form -->
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
      <button @click="addUser">Add User</button>
    </div>
  </div>
  <div v-else>
    <p>You are not authorized to view this page.</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getUsers, type User } from '@/model/users';

const isAdmin = ref(false);  // Initialized as false
const users = ref<User[]>([]);

onMounted(() => {
  const fetchedUsers = getUsers();

  // Assuming the first user in users.ts is the current user
  if (fetchedUsers.length) {
    isAdmin.value = fetchedUsers[0].role === 'admin';
  }

  users.value = fetchedUsers;
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
  users.value.push({
    id: Date.now(),
    ...newUser.value
  });

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
  }
};
</script>

<style scoped>
  .admin-view {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 10px;
    border: 1px solid #e0e0e0;
  }
  
  .add-user-form {
    margin-top: 20px;
    display: flex;
    gap: 10px;
  }
  
  input {
    padding: 5px;
  }
</style>
