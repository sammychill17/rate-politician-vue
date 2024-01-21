<template>
  <div class="my-5 container w-3/4 m-auto">
    <h2 class="text-4xl text-center font-bold py-4">Politicians List</h2>
    <table class=" table-fixed w-full text-center" v-if="politicians.length > 0">
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
        <tr v-for="(politician,index) in politicians" :key="politician.id" 
        :class="{'bg-gray-200':index % 2===0,'bg-gray-50':index%2!==0 }" class="h-12">

          <td class="w-1/6">{{ politician.first_name }}</td>
          <td class="w-1/6">{{ politician.last_name }}</td>
          <td class="w-1/6"> {{ politician.political_affiliation }}</td>
          <td class="w-1/6"> {{ politician.position }}</td>
          <td class="w-1/6"> {{ politician.average_rating.toFixed(1) }}</td>
          <td class="w-1/6 hover:underline text-teal-500"><router-link :to="'/politician-profile/' + politician.id">View</router-link></td>

        </tr>
      </tbody>

    </table>

    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const politicians = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/getPoliticians');
    if (response.ok) {
      const data = await response.json();
      politicians.value = data;
    } else {
      console.error('Failed to fetch politicians');
    }
  } catch (error) {
    console.error('Error fetching politicians:', error);
  }
});
</script>
