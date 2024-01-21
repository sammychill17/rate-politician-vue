<template>
  <div class="my-5 container w-3/4 m-auto">
    <h2 class="text-4xl text-center font-bold py-4">Search Politicians</h2>
    <table class="table table-auto w-full text-center" v-if="searchResults.length > 0">
      <thead>
        <tr>
          <th class="w-1/6">First Name</th>
          <th class="w-1/6">Last Name</th>
          <th class="w-1/6">Political affiliation</th>
          <th class="w-1/6">Position</th>
          <th class="w-1/6">Rating</th>
          <th class="w-1/6">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="politician in searchResults" :key="politician.id">

          <td class="w-1/6">{{ politician.first_name }}</td>
          <td class="w-1/6">{{ politician.last_name }}</td>
          <td class="w-1/6"> {{ politician.political_affiliation }}</td>
          <td class="w-1/6"> {{ politician.position }}</td>
          <td class="w-1/6"> {{ politician.rating }}</td>
          <td class="w-1/6 underline"><router-link :to="'/politician-profile/' + politician.id">View</router-link></td>

        </tr>
      </tbody>

    </table>
    <p v-else>No matching politicians found.</p>
    
  </div>
</template>

<script setup>
import { inject } from 'vue';

const searchResults = inject('search_results');


</script>
