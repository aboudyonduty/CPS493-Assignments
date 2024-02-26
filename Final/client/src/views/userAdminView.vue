<!--InShaAllah-->
<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { getSession } from "@/model/session";
import {
  type User,
  addUser,
  getUsers,
  deleteUser,
  updateUserRole,
} from "@/model/users";
import { deleteAllWorkoutsById } from "@/model/workouts";

const users = ref<User[]>();

const newUser = ref<User>({
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  role: "",
});

const session = getSession();
const isAdmin = session.user?.role === "admin";

onMounted(async () => {
  if (isAdmin) {
    users.value = await getUsers();
  }
});

// Add a user
const addNewUser = async () => {
  try {
    await addUser(newUser.value);
    // Reset newUser fields after successful addition
    newUser.value = {
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      role: "",
    };
    users.value = await getUsers();
    // Optionally, show a success message to the user
  } catch (error) {
    console.error("Error adding user:", error);
    // Handle the error (e.g., show an error message)
  }
};

// Delete a user
const deleteExistingUser = async (User: User) => {
  console.log(User._id);
  await deleteUser(User._id as string);
  await deleteAllWorkoutsById(User.id as number);
  users.value = await getUsers();
};

// Update a user's role
const updateUser = async (user: User, newRole: string) => {
  await updateUserRole(user, newRole);
  users.value = await getUsers();
};

const isFormIncomplete = computed(() => {
  return (
    !newUser.value.firstName ||
    !newUser.value.lastName ||
    !newUser.value.email ||
    !newUser.value.username ||
    !newUser.value.password ||
    !newUser.value.role
  );
});
</script>

<template>
  <div class="container">
    <h2 v-if="isAdmin">Users Administration</h2>

    <div v-if="isAdmin">
      <!-- Add User Form -->
      <form @submit.prevent="addNewUser" class="add-user-form">
        <input v-model="newUser.firstName" placeholder="First Name" required />
        <input v-model="newUser.lastName" placeholder="Last Name" required />
        <input
          v-model="newUser.email"
          type="email"
          placeholder="Email"
          required
        />
        <input v-model="newUser.username" placeholder="Username" required />
        <input
          v-model="newUser.password"
          type="password"
          placeholder="Password"
          required
        />
        <select v-model="newUser.role" required>
          <option value="" disabled>Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          class="button is-primary"
          :disabled="isFormIncomplete"
        >
          Add User
        </button>
      </form>

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
            <select v-model="user.role" @change="updateUser(user, user.role)">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <!-- Delete User -->
          <button class="button is-danger" @click="deleteExistingUser(user)">
            Delete
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>
        You must be logged in and have administrative privileges to view this
        page.
      </p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1000px;
  margin: 4rem auto;
  padding: 2rem;
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #555;
}

h2 {
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 2rem;
}

.add-user-form {
  display: flex;
  justify-content: center; /* Aligns children (form elements) in the center */
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 3rem;
}

input,
select,
button {
  padding: 8px;
  margin-bottom: 1rem;
  border: 1px solid #eaeaea;
  border-radius: 5px;
}

.button.is-primary,
.button.is-danger {
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  border: none;
  color: white;
  transition: background-color 0.2s ease;
}

.button.is-primary {
  background-color: #007aff;
}

.button.is-primary:hover {
  background-color: #005ed4;
}

.button.is-danger {
  background-color: #ff4c4c;
}

.button.is-danger:hover {
  background-color: #e02b2b;
}

.user-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.user-item {
  flex: 0 0 calc(50% - 1rem);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #fafafa;
  border-radius: 8px;
  border: 1px solid #eaeaea;
}

.user-detail-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-label {
  font-weight: 500;
  color: #777;
}

.user-data {
  font-size: 0.9rem;
  color: #333;
}

@media (max-width: 600px) {
  .user-item {
    flex: 0 0 100%;
  }
}
</style>
