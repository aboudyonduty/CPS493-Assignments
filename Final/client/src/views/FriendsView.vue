<!-- بسم الله -->

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { type Workout, getWorkoutsById } from '@/model/workouts';
import { getSession } from '@/model/session';
import { getUsers } from '@/model/users';

const session = getSession();
const allUsersWorkoutsData = ref<{ [name: string]: Workout[] }>({});
const isLoggedIn = ref(false);
const id = session.user?.id || 0;
const email = ref('');
const name = ref('');
const lastname = ref('');

//Displays all the Users except for the one that is logged in and their workouts 

onMounted(async () => {
  if (session.user) {
    isLoggedIn.value = true;
    const users = await getUsers();
    const allUsersWorkouts = await Promise.all(
      users
        .filter((user) => user.id !== id)
        .map(async (user) => {
          const workouts = await getWorkoutsById(user.id as number);
          return { [user.username]: workouts };
        })
    );
    allUsersWorkoutsData.value = Object.assign({}, ...allUsersWorkouts);
  }
});
const formatDate = (dateString : string) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  
  return `${month}-${day}-${year}`;
};
</script>

<template>
  <div class="container">
    <h2>Friends' Workouts</h2>
    <div v-if="isLoggedIn">
      <div v-for="(workouts, userName) in allUsersWorkoutsData" :key="userName">
        <h3 v-if="workouts.length > 0">{{ userName }}'s Workouts</h3>
        <div class="workout-grid" v-if="workouts.length > 0">
          <div class="workout-item" v-for="workout in workouts" :key="workout.id">
            <!-- Workout -->
            <div class="workout-detail-section">
              <span class="workout-label">Workout:</span>
              <span class="workout-data">{{ workout.workoutName }}</span>
            </div>

            <!-- Date -->
            <div class="workout-detail-section">
              <span class="workout-label">Date:</span>
              <span class="workout-data">{{ formatDate(workout.date) }}</span>
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

.workout-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
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
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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

@media (max-width: 600px) {
  .workout-item {
    flex: 0 0 100%;
  }
}
</style>

