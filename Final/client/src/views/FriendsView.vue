<!--InShaAllah-->

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { type Workout } from '@/model/workout';
import { getSession } from '@/model/session';
import { getUserByEmail } from '@/model/users';

const allUsersWorkoutsData = ref<{ [name: string]: Workout[] }>({});
const isLoggedIn = ref(false);
const email = ref('');
const name = ref('');
const lastname = ref('');

onMounted(async () => {
  const session = getSession();
  if (session.user) {
    // email.value = session.user.email;
    // name.value = session.user.firstName;
    // lastname.value = session.user.lastName;
    isLoggedIn.value = true;

    const allWorkoutsByEmail = JSON.parse(localStorage.getItem('workouts') || '{}') as { [email: string]: Workout[] };

    for (let email in allWorkoutsByEmail) {
      // Skip if it's the logged-in user's email
      if (email === session.user.email) continue;
      console.log(email);

      const user = await getUserByEmail(email);
      if (user) {
        const userName = `${user.firstName} ${user.lastName}`;
        allUsersWorkoutsData.value[userName] = allWorkoutsByEmail[email];
      }
    }
  }
});
</script>

<template>
  <div class="container">
    <h2>Friends' Workouts</h2>

    <div v-if="isLoggedIn">
      <!-- Displaying Friends' Workouts -->
      <div class="workout-list" v-for="(workouts, userName) in allUsersWorkoutsData" :key="userName">
        <h3>{{ userName }}'s Workouts</h3>
        <div class="workout-item" v-for="workout in workouts" :key="workout.email">
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
  font-family: 'Helvetica Neue', Arial, sans-serif;
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
}
.workout-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.workout-item {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1.5rem;
  background-color: #fafafa;
  border-radius: 8px;
  border: 1px solid #eaeaea;
}
.workout-detail-section {
  display: flex;
  flex-direction: column;
  align-items: start;
}
.workout-label {
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #777;
}
.workout-data {
  font-size: 1rem;
  color: #333;
}
</style>