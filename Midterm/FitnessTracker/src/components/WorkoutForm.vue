<!--InShaAllah-->

<script setup lang="ts">
import { ref } from 'vue';
import { getSession } from '@/model/session';

const session = getSession();

const newWorkout = ref({
  name: "",
  workoutName: "",
  date: "",
  duration: 0,
  calories: 0
});

const errors = ref([] as string[]);

const emit = defineEmits(['new-workout']);

const addWorkout = () => {
  errors.value = [];  // reset the errors

  // Validate the form fields
  if (!newWorkout.value.name) errors.value.push("Name is required.");
  if (!newWorkout.value.workoutName) errors.value.push("Workout Name is required.");
  if (!newWorkout.value.date) errors.value.push("Date is required.");
  if (!newWorkout.value.duration) errors.value.push("Duration is required.");

  // Only continue if there are no errors
  if (!errors.value.length) {
    emit('new-workout', newWorkout.value);
    newWorkout.value = { name: "", workoutName: "", date: "", duration: 0, calories: 0 };
  }
};
</script>

<template>
  <div class="card has-border-none">
    <header class="card-header">
      <p class="card-header-title">
        Add New Workout
      </p>
    </header>
    <div class="card-content">
      <div class="content">

        <!-- Display validation errors -->
        <div v-if="errors.length" class="notification is-light has-text-danger">
          <p v-for="error in errors" :key="error">{{ error }}</p>
        </div>

        <!-- Name Input -->
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input v-model="newWorkout.name" class="input" type="text" placeholder="Your Name" />
          </div>
        </div>

        <!-- Workout Name Input -->
        <div class="field">
          <label class="label">Workout Name</label>
          <div class="control">
            <input v-model="newWorkout.workoutName" class="input" type="text" placeholder="Name of the Workout" />
          </div>
        </div>

        <!-- Date Input -->
        <div class="field">
          <label class="label">Date</label>
          <div class="control">
            <input v-model="newWorkout.date" class="input" type="date" placeholder="Date" />
          </div>
        </div>

        <!-- Duration Input -->
        <div class="field">
          <label class="label">Duration (mins)</label>
          <div class="control">
            <input v-model="newWorkout.duration" class="input" type="number" placeholder="Duration" />
          </div>
        </div>

        <!-- Calories Input (optional) -->
        <div class="field">
          <label class="label">Calories (optional)</label>
          <div class="control">
            <input v-model="newWorkout.calories" class="input" type="number" placeholder="Calories" />
          </div>
        </div>

      </div>
    </div>
    <footer class="card-footer">
      <button class="card-footer-item button is-link" @click="addWorkout">Add Workout</button>
    </footer>
  </div>
</template>

<style scoped>
.card.has-border-none {
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.field {
  margin-bottom: 1rem;
}
.notification.is-light {
  background-color: #f5f5f5; 
}
</style>
