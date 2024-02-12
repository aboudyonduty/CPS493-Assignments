<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getSession, useLogin } from '@/model/session';

const router = useRouter();
const session = getSession();
const { logout } = useLogin();

// Reactivity check (if needed)
onMounted(() => {
  // Code to ensure session is reactive, if necessary
});

// Navigate to LoginView
const navigateToSignUp = () => {
  router.push({ name: 'SignUpView' });
};
</script>


<template>
  <div class="has-text-right" v-if="session.user">
  </div>
  <div class="buttons" v-else>
    <button class="button" @click="navigateToSignUp">
      <span>Sign Up</span>
    </button>
  </div>
</template>


<style scoped>
/* Your styles here */
</style>
