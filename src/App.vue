<script setup>
import { useRouter, useRoute } from 'vue-router';
import { authService } from './services/authService';
import { ref, onMounted, watch } from 'vue';

const router = useRouter();
const route = useRoute(); // On récupère la route actuelle
const user = ref(null);

// Fonction pour rafraîchir les données de l'utilisateur
const refreshUser = () => {
  const storedUser = localStorage.getItem("currentUser");
  user.value = storedUser ? JSON.parse(storedUser) : null;
};

// 1. Vérification au chargement initial
onMounted(() => {
  refreshUser();
});

// 2. Le Watch : On surveille le changement de route
// Dès que l'URL change (ex: passage de /login à /home), on vérifie le user
watch(
  () => route.path,
  () => {
    refreshUser();
  }
);

const isLoggedOut = () => {
  authService.logOut();
  user.value = null;
  router.push("/");
};
</script>

<template>
  <div
    class="min-h-screen bg-cover bg-center bg-no-repeat relative"
    style="background-image: url('/src/assets/CalendrierBG2.png');"
  >
    <!-- Overlay sombre -->
    <div class="absolute inset-0 bg-black/50 z-0"></div>

    <div class="relative z-10 flex flex-col min-h-screen">
      
      <!-- NAVBAR -->
      <nav
        v-if="!$route.meta.hideNav"
        class="h-16 px-8 flex items-center justify-between bg-white border-b border-gray-200 sticky top-0 z-50"
      >
        <!-- Brand -->
        <div class="flex items-center gap-8">
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                class="w-[18px] h-[18px]"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>

            <h1 class="text-[1.05rem] font-bold tracking-tight text-black">
              Calendlys
            </h1>
          </div>

          <router-link
            :to="{ name: 'home' }"
            class="text-sm font-medium text-gray-600 hover:text-black transition-colors"
          >
            Tableau de bord
          </router-link>
        </div>

        <!-- User -->
        <div v-if="user" class="flex items-center gap-5">
          <span class="text-sm text-gray-600">
            Bonjour, <span class="font-medium">{{ user.firstName }}</span>
          </span>

          <button
            @click="isLoggedOut"
            class="px-4 py-1.5 text-xs font-semibold border border-gray-300 rounded-md bg-gray-100 text-black hover:bg-black hover:text-white hover:border-black transition-all"
          >
            Logout
          </button>
        </div>
      </nav>

      <!-- CONTENU -->
      <main class="flex-1 w-full">
        <router-view />
      </main>

    </div>
  </div>
</template>
