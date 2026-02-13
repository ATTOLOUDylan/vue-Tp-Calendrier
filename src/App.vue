<script setup>
import { useRouter } from 'vue-router';
import { authService } from './services/authService';
import { ref, onMounted } from 'vue';

const router = useRouter();
const user = ref(null);

onMounted(() => {
  // Récupération de l'objet stocké au login
  const storedUser = localStorage.getItem("currentUser");
  if (storedUser) {
    user.value = JSON.parse(storedUser); // On transforme le texte en objet
  }
});

const isLoggedOut = () => {
  authService.logOut();
  user.value = null; // On nettoie l'état local
  router.push("/");
};
</script>

<template>
  <div class="app-layout">
    <nav v-if="!$route.meta.hideNav">
      <div class="nav-brand">
        <div class="logo-container">
          <div class="logo-black-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="logo-svg">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <h1>Calendlys</h1>
        </div>
        <router-link :to="{ name: 'home' }">Tableau de bord</router-link>
      </div>
      
      <div class="nav-user" v-if="user">
        <span class="greeting">Bonjour, {{ user.firstName }}</span>
        <button @click="isLoggedOut" class="logout">logout</button>
      </div>
    </nav>
    
    <main><router-view /></main>
  </div>
</template>



<style scoped>
/* Navigation */
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 64px;
  background: #ffffff;
  border-bottom: 1px solid #eaeaea;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 32px;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Le fond noir pour l'icône */
.logo-black-box {
  width: 32px;
  height: 32px;
  background: #000000;
  color: #ffffff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-svg {
  width: 18px;
  height: 18px;
}

nav h1 {
  font-size: 1.1rem;
  margin: 0;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #000;
}

nav a {
  color: #666666;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s;
}

nav a:hover {
  color: #000;
}

/* Section Utilisateur */
.nav-user {
  display: flex;
  align-items: center;
  gap: 20px;
}

.greeting {
  font-size: 0.9rem;
  color: #666666;
}

/* Bouton Logout */
.logout {
  background-color: #f5f5f5;
  color: #111111;
  border: 1px solid #e0e0e0;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: auto;
  margin-top: 0;
}

.logout:hover {
  background-color: #111111;
  color: #ffffff;
  border-color: #111111;
}

main {
  width: 100%;
}
</style>