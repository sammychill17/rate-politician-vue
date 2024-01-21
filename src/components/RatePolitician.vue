<template>
  <div class="my-2 w-full lg:w-1/2 xl:w-1/4 mx-auto">
    <h2 class="text-4xl text-center font-bold py-2">Rate Politician</h2>
    <div class="mx-auto flex justify-center">
      <label for="politicianSelect" sr-only="Select Politician"></label>
      <select v-model="selectedPolitician" id="politicianSelect" @change="fetchPoliticianDetails" class="p-4 w-full  text-xl">
        <option value="" disabled>Select Politician</option>
        <option v-for="politician in politicians" :key="politician.id" :value="politician.id" class="py-2">
          {{ politician.first_name }} {{ politician.last_name }}
        </option>
      </select>
    </div>


    <div v-if="showRatingForm" class=" flex flex-col justify-center justify-items-center gap-5 my-10">
      <div class="flex flex-col justify-center justify-items-center justify-content-center ">
        <label for="rating">Rate {{ selectedPoliticianDetails.first_name }} {{
          selectedPoliticianDetails.last_name }}:</label>
        <select v-model="selectedRating" id="rating" class="p-4 w-full  mx-auto text-xl">
          <option value="1">1 (Poor)</option>
          <option value="2">2</option>
          <option value="3">3 (Average)</option>
          <option value="4">4</option>
          <option value="5">5 (Excellent)</option>
        </select>
      </div>


      <div class="flex flex-col justify-center">
        <label for="review">Review:</label>
        <textarea id="review" v-model="rating.review" rows="8" cols="50"></textarea>
      </div>
      <div class="w-full mx-auto flex justify-center">
        <button @click="submitRating">Submit Rating</button>
      </div>
     
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const politicians = ref([]);
const selectedPolitician = ref('');
const selectedPoliticianDetails = ref({});
const selectedRating = ref('');
const showRatingForm = ref(false);
const rating = ref({ review: '' });

onMounted(async () => {
  // Fetch the list of politicians
  try {
    const response = await fetch('http://localhost:3000/api/getPoliticians');
    if (response.ok) {
      politicians.value = await response.json();
    } else {
      console.error('Failed to fetch politicians');
    }
  } catch (error) {
    console.error('Error fetching politicians:', error);
  }
});

const fetchPoliticianDetails = async () => {
  // Fetch details of the selected politician
  try {
    const response = await fetch(`http://localhost:3000/api/politicianProfile/${selectedPolitician.value}`);
    if (response.ok) {
      selectedPoliticianDetails.value = await response.json();
      showRatingForm.value = true;
    } else {
      console.error('Failed to fetch politician details');
    }
  } catch (error) {
    console.error('Error fetching politician details:', error);
  }
};

const submitRating = async () => {
  // Submit the rating to the backend
  try {
    const response = await fetch('http://localhost:3000/api/ratePolitician', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        politicianId: selectedPolitician.value,
        rating: selectedRating.value,
        review: rating.value.review,
      }),
    });

    if (response.ok) {
      console.log('Rating submitted successfully');

      window.location.reload();
    } else {
      console.error('Failed to submit rating');
    }
  } catch (error) {
    console.error('Error submitting rating:', error);
  }
};
</script>
