<script setup lang="ts">
import { ref, reactive, toRefs, onMounted } from 'vue';
import { type Workout } from '@/model/workout';
import { getSession } from '@/model/session';
import WorkoutForm from '@/components/WorkoutForm.vue';

const session = getSession();

interface WorkoutsByUser {
  [email: string]: Workout[];
}

// This is your initial data structure.
const initialWorkoutsData: WorkoutsByUser = {
  'aoali726@gmail.com': [
    { id: 1, date: "2023-10-22", workoutName: "Run", name:"Poop", duration: 30, calories: 10 },
    // ... other workouts for user1
  ],
  'superswag2077@icloud.com': [
    { id: 1, date: "2023-08-17", workoutName: "Run", name:"bob", duration: 60, calories: 10 },
    // ... other workouts for user2
  ]
  // ... other users
};

const state = reactive({
  allWorkouts: { ...initialWorkoutsData },
  currentWorkouts: session.user ? (initialWorkoutsData[session.user.email] || []) : [],
});

const handleAddWorkout = (workout: Workout) => {
  workout.id = Date.now();
  state.currentWorkouts.unshift(workout);
  if (session.user) {
    state.allWorkouts[session.user.email] = state.currentWorkouts;
  }
  saveWorkoutsToLocalStorage();
  closeModal();
};

const saveWorkoutsToLocalStorage = () => {
  localStorage.setItem('workouts', JSON.stringify(state.allWorkouts));
};

const loadWorkoutsFromLocalStorage = () => {
  const savedWorkouts = localStorage.getItem('workouts');
  if (savedWorkouts) {
    // Merge saved workouts with the initial data.
    state.allWorkouts = { ...initialWorkoutsData, ...JSON.parse(savedWorkouts) };
    if (session.user) {
      state.currentWorkouts = state.allWorkouts[session.user.email] || [];
    }
  }
};

onMounted(loadWorkoutsFromLocalStorage);

const { allWorkouts, currentWorkouts } = toRefs(state);
const isModalActive = ref(false);
const openModal = () => isModalActive.value = true;
const closeModal = () => isModalActive.value = false;

</script>

<template>
  <div class="container">
    <h2>Your Workouts</h2>
    
    <div v-if="session.user">
      <!-- Trigger Modal Button -->
      <div class="center-button">
        <button class="button is-primary" @click="openModal">Add Workout</button>
      </div>
      
      <!-- Displaying Workouts -->
      <div class="workout-list">
        <div class="workout-item" v-for="workout in currentWorkouts" :key="workout.id">
          <!-- Name -->
          <div class="workout-detail-section">
            <span class="workout-label">Name:</span>
            <span class="workout-data">{{ workout.name }}</span>
          </div>

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

      <!-- Workout Form Modal -->
      <div v-bind:class="{ 'is-active': isModalActive }" class="modal">
        <div class="modal-background" @click="closeModal"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Add Workout</p>
            <button class="delete" aria-label="close" @click="closeModal"></button>
          </header>
          <section class="modal-card-body">
            <WorkoutForm @new-workout="handleAddWorkout" />
          </section>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Please login to view Workouts!</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
  color: #333;
}

h2 {
  border-bottom: 2px solid #ccc;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}

.center-button {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.workout-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.workout-item {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f4f4f4;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.workout-detail-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.workout-label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.workout-data {
  font-size: 0.9rem;
}
</style>