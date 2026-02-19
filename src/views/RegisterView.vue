<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import bcrypt from "bcryptjs";
import { authService } from "@/services/authService";

const router = useRouter();

const getName = ref("");
const getFirstName = ref("");
const getEmail = ref("");
const getPassword = ref("");
const getConfirm = ref("");
const errorMessage = ref("");

function register() {
  errorMessage.value = "";

  const currentUsers = authService.getUsers();

  if (currentUsers.some(user => user.email === getEmail.value)) {
    errorMessage.value = "Cet email existe déjà";
    return;
  }

  const regPassword =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!regPassword.test(getPassword.value)) {
    errorMessage.value =
      "Mot de passe invalide (8 caractères, majuscule, chiffre, caractère spécial)";
    getPassword.value = "";
    return;
  }

  if (getPassword.value !== getConfirm.value) {
    errorMessage.value = "Les mots de passe ne correspondent pas";
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(getPassword.value, salt);

  currentUsers.push({
    id: Date.now(),
    name: getName.value,
    firstName: getFirstName.value,
    email: getEmail.value,
    password: hashed,
  });

  localStorage.setItem("db_users", JSON.stringify(currentUsers));
  router.push("/");
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat relative"
    style="background-image: url('/src/assets/CalendrierBG.png');"
  >
    <div class="absolute inset-0 bg-black/60 z-0"></div>

    <div
      class="w-full max-w-[420px] bg-white/75 backdrop-blur-lg p-8 md:p-12 rounded-xl shadow-2xl border border-white/30 z-10"
    >
      <!-- Header -->
      <header class="text-center mb-8">
        <div
          class="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center mx-auto mb-4"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-5 h-5">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>

        <h1 class="text-2xl font-semibold text-gray-900 tracking-tight">
          Créer un compte
        </h1>
        <p class="text-sm text-gray-600 mt-2">
          Rejoignez Calendlys dès maintenant
        </p>
      </header>

      <!-- Form -->
      <form @submit.prevent="register" class="flex flex-col gap-5">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-gray-700">Nom</label>
            <input
              v-model="getName"
              type="text"
              placeholder="Nom"
              required
              class="h-10 px-3 rounded-md border border-gray-300 text-sm focus:border-black focus:ring-4 focus:ring-black/5"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-gray-700">Prénom</label>
            <input
              v-model="getFirstName"
              type="text"
              placeholder="Prénom"
              required
              class="h-10 px-3 rounded-md border border-gray-300 text-sm focus:border-black focus:ring-4 focus:ring-black/5"
            />
          </div>
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold text-gray-700">Email</label>
          <input
            v-model="getEmail"
            type="email"
            placeholder="nom@exemple.com"
            required
            class="h-10 px-3 rounded-md border border-gray-300 text-sm focus:border-black focus:ring-4 focus:ring-black/5"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold text-gray-700">Mot de passe</label>
          <input
            v-model="getPassword"
            type="password"
            placeholder="••••••••"
            required
            class="h-10 px-3 rounded-md border border-gray-300 text-sm focus:border-black focus:ring-4 focus:ring-black/5"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold text-gray-700">
            Confirmer le mot de passe
          </label>
          <input
            v-model="getConfirm"
            type="password"
            placeholder="••••••••"
            required
            class="h-10 px-3 rounded-md border border-gray-300 text-sm focus:border-black focus:ring-4 focus:ring-black/5"
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
          <p
            v-if="errorMessage"
            class="text-xs text-red-600 bg-red-50 p-2.5 rounded-md border border-red-200 text-center"
          >
            {{ errorMessage }}
          </p>
        </Transition>

        <button
          type="submit"
          class="h-11 bg-black text-white rounded-md text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all mt-2"
        >
          S'inscrire
        </button>
      </form>

      <!-- Footer -->
      <footer class="mt-8 text-center text-sm text-gray-600">
        <span>Déjà un compte ?</span>
        <router-link to="/" class="text-black font-semibold ml-1 hover:underline">
          Se connecter
        </router-link>
      </footer>
    </div>
  </div>
</template>
