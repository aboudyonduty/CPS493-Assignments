<!--InShaAllah-->

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted } from 'vue';
import { type Workout } from '@/model/workouts';
import { getSession } from '@/model/session';
import WorkoutForm from '@/components/WorkoutForm.vue';

const session = getSession();

interface WorkoutsByUser {
  [email: string]: Workout[];
}

const initialWorkoutsData: WorkoutsByUser = {
  
};

const savedWorkouts = localStorage.getItem('workouts');
const workoutsFromLocalStorage: WorkoutsByUser = savedWorkouts ? JSON.parse(savedWorkouts) : {};

const state = reactive({
  allWorkouts: { ...initialWorkoutsData, ...workoutsFromLocalStorage },
  currentWorkouts: session.user ? (workoutsFromLocalStorage[session.user.email] || initialWorkoutsData[session.user.email] || []) : [],
});

const handleAddWorkout = (workout: Workout) => {
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

onMounted(() => {
  const savedWorkouts = localStorage.getItem('workouts');
  if (savedWorkouts) {
    state.allWorkouts = { ...initialWorkoutsData, ...JSON.parse(savedWorkouts) };
    if (session.user) {
      state.currentWorkouts = state.allWorkouts[session.user.email] || [];
    }
  }
});

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
        <div class="workout-item" v-for="workout in currentWorkouts">
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

.center-button {
  display: flex;
  justify-content: center;
  margin: 3rem 0;
}

.button.is-primary {
  background-color: #007aff;
  border-radius: 5px;
  padding: 1rem 2rem;
  font-weight: 500;
  border: none;
  color: white;
  transition: background-color 0.2s ease;
}

.button.is-primary:hover {
  background-color: #005ed4;
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

.modal-card {
  border: none;
  border-radius: 8px;
}

.modal-card-head {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #f7f7f7; 
}

.modal-card-title {
  font-weight: 500;
  color: #333;
}
</style>
