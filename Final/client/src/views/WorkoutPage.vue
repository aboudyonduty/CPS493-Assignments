<!-- بسم الله -->

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { type Workout, getWorkoutsById, deleteWorkout } from "@/model/workouts";
import { getSession } from "@/model/session";
import WorkoutForm from "@/components/WorkoutForm.vue";

const session = getSession();

const state = reactive({
  workouts: [] as Workout[],
  isModalActive: false,
});
const currentWorkouts = ref(state.workouts);

const openModal = () => {
  state.isModalActive = true;
};

const closeModal = () => {
  state.isModalActive = false;
};

const handleAddWorkout = async () => {
  closeModal();
  if (session.user) {
    currentWorkouts.value = await getWorkoutsById(session.user.id as number);
  }
};

const handleDeleteWorkout = async (Workout: Workout) => {
  await deleteWorkout(Workout._id as string);
  if (session.user) {
    currentWorkouts.value = await getWorkoutsById(session.user.id as number);
  }
};

onMounted(async () => {
  if (session.user) {
    const id = session.user.id;
    currentWorkouts.value = await getWorkoutsById(id as number);
  }
});
</script>
<template>
  <div class="container">
    <h2>Your Workouts</h2>

    <div v-if="session.user">
      <div class="center-button">
        <button class="button is-primary" @click="openModal">
          Add Workout
        </button>
      </div>

      <div class="workout-list">
        <div
          class="workout-item"
          v-for="workout in currentWorkouts"
          :key="workout.id"
        >
          <div class="workout-detail-section">
            <span class="workout-label">Workout:</span>
            <span class="workout-data">{{ workout.workoutName }}</span>
          </div>

          <div class="workout-detail-section">
            <span class="workout-label">Date:</span>
            <span class="workout-data">{{ workout.date }}</span>
          </div>

          <div class="workout-detail-section">
            <span class="workout-label">Duration:</span>
            <span class="workout-data">{{ workout.duration }} mins</span>
          </div>

          <div class="workout-detail-section">
            <span class="workout-label">Calories:</span>
            <span class="workout-data">{{ workout.calories }}</span>
          </div>

          <!-- Delete Button -->
          <button class="delete-button" @click="handleDeleteWorkout(workout)">
            Delete
          </button>
        </div>
      </div>

      <div :class="{ 'is-active': state.isModalActive }" class="modal">
        <div class="modal-background" @click="closeModal"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Add Workout</p>
            <button
              class="delete"
              aria-label="close"
              @click="closeModal"
            ></button>
          </header>
          <section class="modal-card-body">
            <WorkoutForm @workout-added="handleAddWorkout" />
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
  font-family: "Helvetica Neue", Arial, sans-serif;
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

.delete-button {
  padding: 0.5rem 1rem;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  align-self: flex-end;
}

.delete-button:hover {
  background-color: #ff2d2f;
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

.modal {
  transition: opacity 0.5s ease;
}

.modal.is-active {
  animation: fadeIn 0.5s ease;
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
  animation: slideUp 0.5s ease;
}

/* Enhanced Button Hover Effect */
.button.is-primary:hover,
.delete-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
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
</style>
