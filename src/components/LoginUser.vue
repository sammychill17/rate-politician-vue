<template>
  <div class="login flex flex-col gap-5 mt-16">
    <h2 class="text-center text-4xl font-bold">Login</h2>
    <form @submit.prevent="loginUser" class="form ">
      <label for="user_name">Username:</label>
      <input v-model="formData.user_name" type="text" required />

      <label for="password">Password:</label>
      <input v-model="formData.password" type="password" required />

      <div>
        <button type="submit" class="bg-[#4caf50]">Login</button>
      </div>
      
      <div v-if="loginError" class="text-red-500 ">{{ loginError }}</div>
    </form>
    <router-link to="/sign-up" class="w-full text-center text-lg">Don't have an account? Register here</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios'; // Import axios


const formData = ref({
  user_name: '',
  password: '',
});
const loginError = ref(null);

const loginUser = async () => {
  try {
    // Make an API call to log in the user
    const response = await axios.post('http://localhost:3000/api/login', formData);
 
    const token = response.data.token;

    // Save the token in localStorage or a cookie for authentication
    localStorage.setItem('token', token);
    localStorage.setItem('username',response.data.username);

    //  redirect the user to the homepage
    window.location.href = '/';

  } catch (error) {
    console.error('Error logging in:', error);
    //  show an error message to the user
    loginError.value = error.response.data.message || 'An error occurred while logging in';
    
  }
};
</script>


<style scoped>
.login {
  animation: fadeInUp 0.5s ease-out both;
}

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



button:hover {
  background-color: #45a049;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Add more styles as needed */
</style>
