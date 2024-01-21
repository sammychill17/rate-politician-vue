import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import './assets/styles.css';


import AddPolitician from './components/AddPolitician.vue';
import RatePolitician from './components/RatePolitician.vue';
import Home from './components/NewsComponent.vue'; 
import Register from './components/RegisterUser.vue';
import LoginUser from './components/LoginUser.vue'
import SearchPoliticians from './components/SearchPoliticians.vue';
import PoliticianProfile from './components/PoliticianProfile.vue';
import PoliticiansList from './components/PoliticiansList.vue';
import LogoutUser from './components/LogoutUser.vue';

const routes = [
    { path: '/', component: Home }, 
    { path: '/add-politician', component: AddPolitician },
    { path: '/rate-politician', component: RatePolitician },
    { path: '/sign-up', component: Register },
    { path: '/sign-in', component: LoginUser },
    {path: '/search-politicians',component:SearchPoliticians},
    {path:'/politician-profile/:id',component:PoliticianProfile},
    {path: '/get-politicians',component:PoliticiansList},
    { path: '/logout', component: LogoutUser },
    
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    // Check if the route requires authentication
    if (to.meta.requiresAuth) {
      const token = localStorage.getItem('token');
  
      // If the user is not authenticated, redirect to the login page
      if (!token) {
        next('/sign-in');
      } else {
        next();
      }
    } else {
      next();
    }
  });

const app = createApp(App);
app.use(router);
app.mount('#app');
