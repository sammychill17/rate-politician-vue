<template>
    <div id="app" class="">
        <header class="dynamic-header ">
            <div class="header-content">
                <h1 class="font-mono font-bold text-6xl py-10 text-[#faeb44]">Rate Politician</h1>
                <nav class="bg-gray-800 bg-opacity-70 mx-auto container max-w-7xl">
                    <div class=" px-2 sm:px-6 lg:px-8">
                        <div class="relative flex h-16 items-center justify-between">
                            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                <!-- Mobile menu button-->
                                <button type="button"
                                    class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    aria-controls="mobile-menu" aria-expanded="false">
                                    <span class="absolute -inset-0.5"></span>
                                    <span class="sr-only">Open main menu</span>
                                    <!--Icon when menu is closed.    Menu open: "hidden", Menu closed: "block" -->
                                    <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                    <!--Icon when menu is open. Menu open: "block", Menu closed: "hidden" -->
                                    <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div class="flex flex-shrink-0 items-center">
                                    <img class="h-8 w-auto" src="./assets/img/RP.jpg" alt="Your Company" />
                                </div>
                                <div class="hidden sm:ml-6 sm:block">
                                    <div class="flex space-x-4">
                                        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                                        <router-link to="/" @click="makeActive('home')"
                                            :class="{ 'text-white hover:text-gray-300': page === 'home', 'text-gray-300 hover:text-white': page !== 'home' }"
                                            class="hover:bg-gray-900 rounded-md px-3 py-2 text-base font-medium"
                                            aria-current="page">Home</router-link>
                                        <router-link v-if="isLoggedIn" to="/get-politicians" @click="makeActive('all')"
                                            :class="{ 'text-white hover:text-gray-300': page === 'all', 'text-gray-300 hover:text-white': page !== 'all' }"
                                            class=" hover:bg-gray-700 rounded-md px-5 py-2 text-base font-medium">All</router-link>
                                        <router-link v-if="isLoggedIn" to="/add-politician" @click="makeActive('add')"
                                            :class="{ 'text-white hover:text-gray-300': page === 'add', 'text-gray-300 hover:text-white': page !== 'add' }"
                                            class=" hover:bg-gray-700  rounded-md px-5 py-2 text-base font-medium">Add</router-link>
                                        <router-link v-if="isLoggedIn" to="/rate-politician" @click="makeActive('rate')"
                                            :class="{ 'text-white hover:text-gray-300': page === 'rate', 'text-gray-300 hover:text-white': page !== 'rate' }"
                                            class=" hover:bg-gray-700  rounded-md px-5 py-2 text-base font-medium">Rate</router-link>
                                    </div>
                                </div>
                            </div>
                            <div v-if="isLoggedIn" class="search">
                                <input type="text" v-model="searchQuery" @click="searchPage"
                                    @keyup.enter="searchPoliticians" placeholder="Search politicians..."
                                    class="search-bar text-black" />
                            </div>
                            <div v-if="!isLoggedIn" class="flex">
                                <router-link to="/sign-in" 
                                :class="{ 'text-white hover:text-gray-300': page === 'rate', 'text-gray-300 hover:text-white': page !== 'rate' }"
                                 class="over:bg-gray-700  rounded-md px-5 py-2 text-base font-medium">Login</router-link>
                                <router-link to="/sign-up" 
                                :class="{ 'text-white hover:text-gray-300': page === 'rate', 'text-gray-300 hover:text-white': page !== 'rate' }"
                                 class="over:bg-gray-700  rounded-md px-5 py-2 text-base font-medium">Register</router-link>
                            </div>
                            <div v-if="isLoggedIn" class=" flex items-center pr-2 gap-5 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <User  />
                                <Logout  class="flex justify-center cursor-pointer" />
                            </div>
                        </div>
                    </div>

                    <!-- Mobile menu, show/hide based on menu state. -->
                    <div class="sm:hidden" id="mobile-menu">
                        <div class="space-y-1 px-2 pb-3 pt-2">
                            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                            <router-link to="/"
                                class="hover:bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                                aria-current="page">Home</router-link>
                            <router-link v-if="isLoggedIn" to="/get-politicians"
                                class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">All</router-link>
                            <router-link v-if="isLoggedIn" to="/add-politician"
                                class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Add</router-link>
                            <router-link v-if="isLoggedIn" to="/rate-politician"
                                class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Rate</router-link>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
        <main class="w-full lg:w-3/4 xl:w-2/3 mx-auto">
            <router-view></router-view>
        </main>
    </div>
</template>

<script setup>
import { ref, computed, provide } from "vue";
import Logout from "./components/LogoutUser.vue";
import User from "./components/UserComponent.vue";
import axios from "axios";
import { useRouter } from "vue-router";



const searchQuery = ref("");
const router = useRouter();
const searchResults = ref([]);
const page = ref(null);

const isLoggedIn = computed(() => {
    return localStorage.getItem("token") !== null;
});
const makeActive = (current) => {
    page.value = current;
}
const searchPage = () => {
    router.push("/search-politicians");
};
const searchPoliticians = async () => {
    try {
        // Make an API call to search for politicians
        const response = await axios.get(
            `http://127.0.0.1:3000/api/searchPoliticians`,
            {
                params: { query: searchQuery.value },
            }
        );
        searchResults.value = response.data;
    } catch (error) {
        console.error("Error searching for politicians:", error);
    }
};

provide("search_results", searchResults);
</script>

<style scoped>
.dynamic-header {
    background-image: url("./assets/img/buildings.jpg");
    background-size: cover;
    background-position: center;
    color: #fff;
    text-align: center;
    padding: 50px 0;
    transition: background-image 0.5s ease-in-out;
}




.search {
    width: 33%;
}

.search-bar {
    width: 90%;
    padding: 10px;
    margin-left: 20px;
    border: 1px solid #fff;
    border-radius: 5px;
    outline: none;
}
</style>
