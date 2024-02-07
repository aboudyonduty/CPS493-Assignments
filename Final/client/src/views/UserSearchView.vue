<script>
import { ref } from 'vue';

export default {
  setup() {
    const searchQuery = ref('');
    const searchResults = ref([]);

    const fetchResults = async () => {
      if (searchQuery.value.length > 2) {
        const url = `http://localhost:3000/api/users?search=${searchQuery.value}`;
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Server responded with ' + response.status);
          }
          const users = await response.json();
          searchResults.value = users;
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      } else {
        searchResults.value = [];
      }
    };

    return {
      searchQuery,
      searchResults,
      fetchResults,
    };
  },
};
</script>
<template>
  <section class="section">
    <div class="container">
      <h1 class="title">User Search</h1>
      <input 
        v-model="searchQuery" 
        @input="fetchResults" 
        class="input is-medium" 
        type="text" 
        placeholder="Search for users..." 
      />
      <div v-if="searchResults.length" class="results">
        <h2 class="subtitle">Search Results:</h2>
        <ul>
          <li v-for="user in searchResults" :key="user._id">
            {{ user.firstName }} {{ user.lastName }}
          </li>
        </ul>
      </div>
      <div v-else-if="searchQuery.length > 0" class="no-results">
        No users found.
      </div>
    </div>
  </section>
</template>


<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}

.results, .no-results {
  margin-top: 1em;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 0.5em 0;
  border-bottom: 1px solid #eee;
}

li:last-child {
  border-bottom: none;
}
</style>
