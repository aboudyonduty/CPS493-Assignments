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
              v-model="workout.workoutName"
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
              v-model="workout.duration"
              required
            />
          </div>
        </div>

        <!-- Date Worked Out -->
        <div class="field">
          <label class="label">Date Worked Out</label>
          <div class="control">
            <input class="input" type="date" v-model="workout.date" required />
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
              v-model="workout.calories"
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

<script lang="ts">
import { defineComponent } from 'vue';
import { Workout } from '@/model/workouts';  // adjust the path as necessary

export default defineComponent({
  data(): { workout: Workout } {
    return {
      workout: {
        _id: '', // This will typically be assigned by the database, so it might start empty
        email: '', // Set this from the user's session or authentication context
        workoutName: '',
        date: '',
        duration: 0,
        calories: 0
      }
    };
  },
  methods: {
    async submitWorkout() {
  try {
    const response = await fetch('/api/v1/workouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.workout)
    });

    if (response.ok) {
      console.log('Workout added successfully!');
      // Handle success - reset the form or show a success message
    } else {
      console.error('Failed to add workout:', await response.json());
      // Handle server errors
    }
  } catch (error) {
    console.error('Network error:', error);
    // Handle network errors
  }


      // Prepare the request options
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.workout)
      };

      try {
        // Send the POST request to your server endpoint
        const response = await fetch('/addWorkout', requestOptions);

        // Check if the request was successful
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData); // Log or handle the response from the server
          alert('Workout added successfully!');
          // Reset the form or handle the successful state
          this.workout = { name: '', duration: '', date: '', calories: '' };
        } else {
          // Handle server errors (e.g., response status is 5xx or 4xx)
          const errorData = await response.json();
          console.error('Failed to add workout:', errorData);
          alert('Failed to add workout. Please try again.');
        }
      } catch (error) {
        // Handle network errors
        console.error('Network error:', error);
        alert('Failed to add workout. Please check your connection and try again.');
      }
    }
  }
});
</script>

<style>
/* Add any custom styles or overrides here */
</style>