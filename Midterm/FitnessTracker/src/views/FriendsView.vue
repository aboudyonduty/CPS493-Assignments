<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { type Workout } from '@/model/workout';
import { getUserByEmail } from '@/model/users'; // Assuming you have this function to get user details by email.

// Defining the expected type for the workouts data ref
const allUsersWorkoutsData = ref<{ [name: string]: Workout[] }>({});

onMounted(() => {
  const allWorkoutsByEmail = JSON.parse(localStorage.getItem('workouts') || '{}') as { [email: string]: Workout[] };

  // Transform the data to the new format
  for (let email in allWorkoutsByEmail) {
    const user = getUserByEmail(email);
    if (user) {
      const userName = `${user.firstName} ${user.lastName}`;
      allUsersWorkoutsData.value[userName] = allWorkoutsByEmail[email];
    }
  }
});
</script>
<template>
  <div class="friends-view-page">

    <!-- Iterate through each user's workouts -->
    <div v-for="(workouts, userName) in allUsersWorkoutsData" :key="userName" class="user-workouts">

      <!-- User Name Header -->
      <h3>{{ userName }}'s Workouts</h3>

      <!-- Display Workouts for this User -->
      <div v-for="workout in workouts" :key="workout.id" class="workout-item">
        <div><strong>Name: </strong> {{ workout.name }}</div>
        <div><strong>Workout: </strong> {{ workout.workoutName }}</div> <!-- changed from workout.type to workout.workoutName -->
        <div><strong>Date: </strong>{{ workout.date }}</div>
        <div><strong>Duration: </strong> {{ workout.duration }} mins</div>
        <div><strong>Calories: </strong> {{ workout.calories }}</div>
        <hr>
      </div>

    </div>

  </div>
</template>

<style>
/* Add any styles you need for this page, making it similar to the Workout page */
.workout-item {
  padding: 10px;
  border: 1px solid #e0e0e0;
  margin-bottom: 10px;
  border-radius: 5px;
}
.user-workouts {
  margin-bottom: 20px;
}
h3 {
  color: #4CAF50;
  margin-bottom: 10px;
}
</style>

