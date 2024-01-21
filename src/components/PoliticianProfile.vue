<template>
  <div class="w-full ">
    <h2 class="text-center text-5xl font-bold py-20 font-mono">Politician Profile</h2>
    <div v-if="politician" class=" w-3/4 flex flex-row m-auto justify-evenly gap-2"> 
      <div class="px-2">
        <img v-if="politician.image_url" :src="/uploads/+politician.image_url" width="200" height="200"
        class="rounded-xl" alt="Politician Image" />
        <img v-else src="/uploads/5856.jpg" width="200" height="200" class="rounded-xl drop-shadow-xl">
      </div>

      <div class="flex flex-col p-4 gap-2 border-4 border-teal-500 border-l-[20px] rounded-xl shadow-xl">
        <h3 class="text-4xl font-bold text-black">{{ politician.first_name }} {{ politician.last_name }}</h3>
        <p class="flex justify-between"><strong>Political Affiliation:</strong> {{ politician.political_affiliation }}</p>
        <p class="flex justify-between"><strong>Position:</strong> {{ politician.position }}</p>
        <p class="flex flex-col justify-between"><strong>Brief Bio:</strong> {{ politician.bio }}</p>
      </div>
     
      <p class="flex flex-col p-4 border-4 border-teal-500 border-r-[20px] rounded-xl shadow-xl">
        <strong class="px-2">Average Rating:</strong> 
        <span class="  font-bold text-5xl px-2 py-4 align-middle text-center">{{ politician.average_rating.toFixed(1) }}</span>
      </p>
    </div>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from "axios";

const route = useRoute();
const politicianId = ref(null);
const politician = ref(null);

onMounted(() => {
  // Fetch politician data based on the route parameter 'id'
  politicianId.value = route.params.id;

  fetchPolitician();
});

const fetchPolitician = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:3000/api/politicianProfile/${politicianId.value}`);
    console.log(response.data);
    politician.value = response.data;
  } catch (error) {
    console.error('Error fetching politician:', error);
  }
};
</script>

<style scoped>

</style>
