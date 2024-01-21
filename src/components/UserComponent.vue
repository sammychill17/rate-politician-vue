<template>
    <div class="">
      <div  class="py-2 capitalize text-[#faeb44] font-mono font-bold text-2xl text-center rounded flex justify-content-center ">{{username}}</div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';

const username = ref(null);

onMounted(() => {
     username.value =localStorage.getItem("username");
     console.log(username);
  });


  </script>
  