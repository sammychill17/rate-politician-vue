import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import AddPolitician from './components/AddPolitician.vue';
import RatePolitician from './components/RatePolitician.vue';
import PoliticianList from './components/PoliticianList.vue'; 

const routes = [
  { path: '/', component: Home },
  { path: '/add-politician', component: AddPolitician },
  { path: '/rate-politician', component: RatePolitician },
  { path: '/politician-list', component: PoliticianList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
