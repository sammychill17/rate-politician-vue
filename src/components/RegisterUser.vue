<template>
  <div class="register-user flex flex-col gap-5 mt-16">
    <h2 class="text-center text-4xl font-bold">Register</h2>
    <form @submit.prevent="registerUser" class="form px-20">
      <div>
        <label for="first_name">First Name:</label>
        <input v-model="form.first_name" type="text" required />
      </div>

      <div>
        <label for="last_name">Last Name:</label>
        <input v-model="form.last_name" type="text" required />
      </div>

      <div>
        <label for="username">Username:</label>
        <input v-model="form.username" id="username" type="text" required />
      </div>

      <div>
        <label for="email_address">Email Address:</label>
        <input v-model="form.email_address" type="email" required />
      </div>

      <div>
        <label for="password">Password:</label>
        <input v-model="form.password" type="password" required />
      </div>

      <div>
        <button type="submit">Register</button>
      </div>
      <div v-if="registrationError" class="text-red-500 ">{{ registrationError }}</div>
    </form>
    <router-link to="/sign-in" class="w-full text-center text-lg">Already have an account? Login here</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const form = ref({
  first_name: '',
  last_name: '',
  username: '',
  email_address: '',
  password: '',
});
const registrationError = ref(null);
const router = useRouter();

const registerUser = async () => {
  try {
    // Make an API call to register a new user
    await axios.post('http://localhost:3000/api/register', form);
    //  redirect the user to the sign-in page
    router.push('/sign-in');
  } catch (error) {
    console.error('Error registering user:', error.response);
    // show an error message to the user
    registrationError.value = error.response.data.message || 'An error occurred while registering the user';
  }
};

</script>


<style scoped>

input, select, textarea {
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
