<!-- بسم الله -->

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { type Workout, getWorkoutsById } from "@/model/workouts";
import { getSession } from "@/model/session";
import { getUsers } from "@/model/users";

const router = useRouter();
const session = getSession();
const allUsersWorkoutsData = ref<{ [name: string]: Workout[] }>({});
const isLoggedIn = ref(session.user != null);
const id = session.user?.id || 0;

onMounted(async () => {
  if (!isLoggedIn.value) {
    router.push("/login"); // Redirect to login if not logged in
    return;
  }

  try {
    const users = await getUsers();
    const allUsersWorkouts = await Promise.all(
      users
        .filter((user) => user.id !== id)
        .map(async (user) => {
          try {
            const workouts = await getWorkoutsById(user.id as number);
            return { [user.username]: workouts };
          } catch (error) {
            console.error("Error fetching workouts", error);
            return { [user.username]: [] };
          }
        })
    );
    allUsersWorkoutsData.value = Object.assign({}, ...allUsersWorkouts);
  } catch (error) {
    console.error("Error fetching users", error);
  }
});
</script>

<template>
  <div class="container">
    <h2>Friends' Workouts</h2>
    <div v-if="isLoggedIn">
      <div v-for="(workouts, userName) in allUsersWorkoutsData" :key="userName">
        <h3 v-if="workouts.length > 0">{{ userName }}'s Workouts</h3>
        <div class="workout-grid" v-if="workouts.length > 0">
          <div
            class="workout-item"
            v-for="workout in workouts"
            :key="workout.id"
          >
            <!-- Workout -->
            <div class="workout-detail-section">
              <span class="workout-label">Workout:</span>
              <span class="workout-data">{{ workout.workoutName }}</span>
            </div>

            <!-- Date -->
            <div class="workout-detail-section">
              <span class="workout-label">Date:</span>
              <span class="workout-data">{{ workout.date }}</span>
            </div>

            <!-- Duration -->
            <div class="workout-detail-section">
              <span class="workout-label">Duration:</span>
              <span class="workout-data">{{ workout.duration }} mins</span>
            </div>

            <!-- Calories -->
            <div class="workout-detail-section">
              <span class="workout-label">Calories:</span>
              <span class="workout-data">{{ workout.calories }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Please login to view this page.</p>
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

h3 {
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: 2rem;
  margin-bottom: 1rem;
  animation: fadeIn 0.5s ease;
}

.workout-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

/* Slide-up Animation for Workout Items */
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

.workout-item {
  flex: 0 0 calc(50% - 1rem);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #fafafa;
  border-radius: 8px;
  border: 1px solid #eaeaea;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: slideUp 0.5s ease;
}

.workout-detail-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.workout-label {
  font-weight: 500;
  color: #777;
}

.workout-data {
  font-size: 0.9rem;
  color: #333;
}

/* Fade-in Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 600px) {
  .workout-item {
    flex: 0 0 100%;
  }
}
</style>
