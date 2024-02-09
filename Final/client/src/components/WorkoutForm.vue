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
          <div class="control">
            <button class="button is-primary">Add Workout</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref} from 'vue';
import { getSession } from '@/model/session';
import { type Workout, addWorkout, getWorkouts } from '@/model/workouts';

const session = getSession();
const workouts = ref<Workout[]>();

const id = session.user?.id || 0;
const workoutName = ref("");
const duration = ref(0);
const date = ref("");
const calories = ref(0);
const newWorkout = ({
  id: id,
  workoutName: workoutName.value,
  duration: duration.value,
  date: date.value,
  calories: calories.value,
});


const submitWorkout = () => {
  const workout: Workout = {
    id: id,
    workoutName: workoutName.value,
    duration: duration.value,
    date: date.value,
    calories: calories.value,
  };
  addWorkout(workout);
};


</script>

<style>
/* Add any custom styles or overrides here */
</style>