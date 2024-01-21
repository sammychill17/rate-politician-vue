<template>
  <div>
    <section class="news-section">
      <h2 class="text-4xl font-bold my-2 py-2 text-center border-b-2 border-yellow-500">Real-time News</h2>
      <div class="my-2 flex flex-row flex-wrap gap-5 w-fit mx-auto">
        <article v-for="(article, index) in newsArticles" :key="index" class="min-w-64 max-w-96 shadow-xl py-4 px-2 flex flex-col justify-between gap-2">
          <h3 class="text-2xl font-bold line-clamp-2">{{ article.title }}</h3>
          <p class="line-clamp-4">{{ article.description }}</p>
          <a :href="article.url" target="_blank" class="text-yellow-900 hover:text-green-500 hover:underline cursor-pointer">Read More</a>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const newsArticles = ref([]);
let updateInterval;

onMounted(() => {
  // window.particlesJS.load('particles-js', './particles-config.json', () => {
  //   console.log('particles.js loaded - callback');
  // });

  fetchNewsArticles();
  updateInterval = setInterval(fetchNewsArticles, 60000);
});

onUnmounted(() => {
  clearInterval(updateInterval);
});

const fetchNewsArticles = async () => {
  const API_KEY = 'pub_36142aaa6d579ee671ab1c4a916268a1b8e3f';
  const ENDPOINT = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=politics&language=en`;

  try {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    newsArticles.value = data.results || [];
  } catch(error) {
    console.error('Error fetching news:', error);
  }
};
</script>

<style scoped>
  /* Component styles here */
</style>
