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
       <select v-model="newUser.role">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select> 
        <button class="button is-primary" @click="addNewUser">Add User</button> 
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
          <!--<button class="button is-danger" @click="deleteExistingUser(user.id)">Delete</button>-->
        </div>
      </div>
    </div>
    <div v-else>
      <p>You must be logged in and have administrative privileges to view this page.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getSession } from '@/model/session';
import { useRouter } from 'vue-router';
import { type User, addUser, deleteUser, getUsers } from '@/model/users';

const router = useRouter();
const users = ref<User[]>();

const newUser = ref<User>({
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  role: "",
});

const session = getSession();
const isAdmin = session.user?.role === 'admin';

onMounted(async () => {
  if (isAdmin) {
    users.value = await getUsers();
  }
});


// Delete an existing user
const addNewUser = async () => {
  await addUser(newUser.value);
  users.value = await getUsers();
};

// Get the current user from the session
</script>

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