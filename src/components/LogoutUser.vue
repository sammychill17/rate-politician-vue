<template>
    <div class="logout">
      <div @click="logout" class="py-1 shadow-2xl w-20  m-auto">
        <ArrowLeftStartOnRectangleIcon class="h-8 w-8 text-[#faeb44] " aria-hidden="true" />
      </div>
    </div>
  </template>
  
  <script setup>
import {  ArrowLeftStartOnRectangleIcon } from '@heroicons/vue/24/outline'
  const logout = () => {
    // Remove the token from localStorage or the cookie
    localStorage.removeItem('token');
    
    // Optionally, you can redirect the user or show a success message
    window.location.href = '/';

  };
  </script>
  