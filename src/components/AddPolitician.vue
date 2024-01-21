<template>
  <div class="form flex flex-col gap-5 mt-16">
    <h1 class="text-center text-4xl font-bold">Add Politician</h1>
    <form @submit.prevent="submitForm" class="px-20" enctype="multipart/form-data">
      <div>
        <label for="first_name">First Name:</label>
        <input type="text" id="first_name" v-model="politician.first_name" required>
      </div>
      <div>
        <label for="last_name">Last Name:</label>
        <input type="text" id="last_name" v-model="politician.last_name" required>
      </div>
      <div>
        <label for="affiliation">Political Affiliation:</label>
        <input type="text" id="affiliation" v-model="politician.political_affiliation" required>
      </div>
      <div>
        <label for="position">Position:</label>
        <input type="text" id="position" v-model="politician.position" required>
      </div>
      <div>
        <label for="bio">Brief Bio:</label>
        <textarea id="bio" v-model="politician.brief_bio"></textarea>
      </div>
      <div>
        <label for="image">Politician's Potrait(less 10MB)</label>
        <input type="file" id="image" ref="image" @change="handleImageUpload" accept="image/*">
      </div>
      <button type="submit">Submit</button>
      <div v-if="addError" class="text-red-500 ">{{ addError }}</div>
      <div v-if="addSuccess" class="text-green-500 ">{{ addSuccess }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const politician = ref({
  first_name: '',
  last_name: '',
  political_affiliation: '',
  position: '',
  brief_bio: null,
  image: null,
});
const addError = ref(null);
const addSuccess = ref(null);

async function submitForm() {
  // const sanitizedPolitician = Object.fromEntries(
  //   Object.entries(politician.value).map(([key, value]) => [key, value === undefined ? null : value])
  // );
  const formData = new FormData();

  // Add politician data to FormData
  formData.append('first_name', politician.value.first_name);
  formData.append('last_name', politician.value.last_name);
  formData.append('political_affiliation', politician.value.political_affiliation);
  formData.append('position', politician.value.position);
  formData.append('brief_bio', politician.value.brief_bio);

  // Add image file to FormData
  if (politician.value.image) {
    formData.append('image', politician.value.image);
  }

  try {
    const response = await fetch('http://localhost:3000/api/addPolitician', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      console.log('Politician added successfully');
      addSuccess.value = 'Politician added successfully';
    } else {
      console.log(response);
     addError.value ='Failed to add politician';
      console.log('Failed to add politician');
    }
  } catch (error) {
    addError.value = error.response.data.message || 'An error occurred while adding the politician';
    console.error('Error adding politician:', error);
  
  }

  politician.value = {
    first_name: '',
    last_name: '',
    political_affiliation: '',
    position: '',
    brief_bio: null,
    image: null,

  };
}

function handleImageUpload(event) {
  const fileInput = event.target;
  if (fileInput.files.length > 0) {
    politician.value.image = fileInput.files[0];
  }
}
</script>

<style scoped>
input,
select,
textarea {
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>

  