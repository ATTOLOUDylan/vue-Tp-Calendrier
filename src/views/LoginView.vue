<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { authService } from "@/services/authService";

const router = useRouter();

const email = ref("");
const password = ref("");
const errorMessage = ref("");

function login() {
  errorMessage.value = "";
  const connected = authService.login({
    email: email.value,
    password: password.value,
  });

  if (connected) {
    router.push("/home");
  } else {
    errorMessage.value = "Email ou mot de passe incorrect";
  }
}
</script>

<template>
  <div 
    class="min-h-screen flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat relative"
    style="background-image: url('/src/assets/images1.png');"
  >
    <div class="absolute inset-0 bg-black/60 z-0"></div>

    <div class="w-full max-w-[400px] bg-white/90 backdrop-blur-lg p-1 md:p-12 rounded-xl shadow-2xl border border-white/30 z-10">
      
      <header class="text-center mb-8">
        <div class="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center mx-auto mb-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-5 h-5">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
        <h1 class="text-2xl font-semibold text-gray-900 tracking-tight">Bon retour</h1>
        <p class="text-sm text-gray-600 mt-2">Connectez-vous à votre espace Calendlys.</p>
      </header>

      <form @submit.prevent="login" class="flex flex-col gap-5">
        <div class="flex flex-col gap-1.5">
          <label for="email" class="text-xs font-semibold text-gray-700">Email</label>
          <input 
            v-model="email" 
            type="email" 
            id="email" 
            placeholder="nom@exemple.com" 
            required 
            class="h-10 px-3 rounded-md border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-black focus:ring-4 focus:ring-black/5 transition-all"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <div class="flex justify-between items-center">
            <label for="password" class="text-xs font-semibold text-gray-700">Mot de passe</label>
          </div>
          <input 
            v-model="password" 
            type="password" 
            id="password" 
            placeholder="••••••••" 
            required 
            class="h-10 px-3 rounded-md border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-black focus:ring-4 focus:ring-black/5 transition-all"
          />
        </div>

        <Transition 
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="transform -translate-y-2 opacity-0"
          enter-to-class="transform translate-y-0 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <p v-if="errorMessage" class="text-xs text-red-600 bg-red-50 p-2.5 rounded-md border border-red-200 text-center">
            {{ errorMessage }}
          </p>
        </Transition>

        <button 
          type="submit" 
          class="h-11 bg-black text-white rounded-md text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all mt-2 cursor-pointer"
        >
          Se connecter
        </button>
      </form>

      <footer class="mt-8 text-center text-sm text-gray-600">
        <span>Pas encore de compte ?</span>
        <router-link to="/register" class="text-black font-semibold ml-1 hover:underline">
          S'inscrire gratuitement
        </router-link>
      </footer>
    </div>
  </div>
</template>

<style scoped>
/* On garde juste les animations complexes si nécessaire, 
   mais Tailwind gère déjà les transitions via les classes enter/leave */
</style>