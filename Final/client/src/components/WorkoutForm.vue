<!-- بسم الله -->

<script setup lang="ts">
import { ref } from "vue";
import { getSession } from "@/model/session";
import { type Workout, addWorkout } from "@/model/workouts";

const session = getSession();
const emit = defineEmits(["workout-added"]);

const id = session.user?.id || 0;
const workoutName = ref("");
const duration = ref(0);

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const year = today.getFullYear();
  return `${year}-${month}-${day}`;
};

const date = ref(getCurrentDate());
const calories = ref(0);

const resetForm = () => {
  workoutName.value = "";
  duration.value = 0;
  date.value = getCurrentDate(); // Reset to current date
  calories.value = 0;
};
const submitWorkout = async () => {
  const workout: Workout = {
    id: id,
    workoutName: workoutName.value,
    duration: duration.value,
    date: date.value,
    calories: calories.value,
  };
  try {
    await addWorkout(workout);
    resetForm(); // Reset form fields after successful submission
    emit("workout-added");
  } catch (error) {
    console.error("Error adding workout:", error);
  }
};
</script>

<template>
  <section class="section">
    <div class="container">
      <form @submit.prevent="submitWorkout" class="box">
        <!-- Workout Name -->
        <div class="field">
          <label class="label">Workout Name</label>
          <div class="control has-icons-left">
            <input
              class="input"
              type="text"
              placeholder="E.g., Morning Run"
              v-model="workoutName"
              required
            />
            <span class="icon is-small is-left">
              <i class="fas fa-dumbbell"></i>
            </span>
          </div>
        </div>

        <!-- Duration Worked Out -->
        <div class="field">
          <label class="label">Duration Worked Out (minutes)</label>
          <div class="control">
            <input
              class="input"
              type="number"
              placeholder="Duration"
              v-model="duration"
              required
            />
          </div>
        </div>

        <!-- Date Worked Out -->
        <div class="field">
          <label class="label">Date Worked Out</label>
          <div class="control">
            <input class="input" type="date" v-model="date" required />
          </div>
        </div>

        <!-- Calories Burned (optional) -->
        <div class="field">
          <label class="label">Calories Burned (optional)</label>
          <div class="control">
            <input
              class="input"
              type="number"
              placeholder="Calories"
              v-model="calories"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <div class="field">
          <div class="control has-text-centered">
            <button class="button is-primary">Add Workout</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<style></style>
