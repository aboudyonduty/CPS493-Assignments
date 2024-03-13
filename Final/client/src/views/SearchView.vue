<!-- بسم الله -->

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { getUsers, type User } from "@/model/users";
import { getWorkoutsById } from "@/model/workouts";

interface ExtendedUser extends User {
  workouts: number;
}

const users = ref<ExtendedUser[]>([]);

onMounted(async () => {
  try {
    const fetchedUsers = await getUsers();
    users.value = fetchedUsers.map((user) => ({ ...user, workouts: 0 })); // Initialize workouts to 0
    await calculateWorkouts();
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
});

const searchQuery = ref("");

const filterUsers = () => {
  const query = searchQuery.value.toLowerCase().trim();

  return users.value.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return (
      user.username.toLowerCase().startsWith(query) ||
      fullName.startsWith(query) ||
      user.email.toLowerCase().startsWith(query)
    );
  });
};

const calculateWorkouts = async () => {
  for (const user of users.value) {
    try {
      const workouts = await getWorkoutsById(user.id as number);
      user.workouts = workouts.length;
    } catch (error) {
      console.error(`Failed to fetch workouts for user ${user.id}:`, error);
    }
  }
};

const filteredUsers = computed(filterUsers);
</script>

<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-centered">User Search</h1>
      <div class="search-bar">
        <input
          class="input"
          type="text"
          placeholder="Search by name, username, or email"
          v-model="searchQuery"
          @input="filterUsers"
        />
      </div>
      <div class="user-results">
        <div v-for="user in filteredUsers" :key="user.id" class="user-item">
          <p><strong>Username:</strong> {{ user.username }}</p>
          <p><strong>Name:</strong> {{ user.firstName }} {{ user.lastName }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Workouts:</strong> {{ user.workouts }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  max-width: 1000px;
  margin: 4rem auto;
  padding: 2rem;
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #555;
}

.title {
  font-size: 2rem;
  font-weight: 500;
}

.search-bar {
  margin: 2rem 0;
}

.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  transition: box-shadow 0.3s ease;
}

.input:focus {
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
}

.user-results {
  margin-top: 1rem;
}

.user-item {
  padding: 1rem;
  background-color: #fafafa;
  border-radius: 8px;
  border: 1px solid #eaeaea;
  margin-bottom: 1rem;
  animation: slideUp 0.5s ease;
}

.user-item p {
  margin: 0.5rem 0;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
