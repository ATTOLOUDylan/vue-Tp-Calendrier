<!-- Input.vue -->
<script setup>
import { ref } from "vue";

const newItem = ref("");
const startTime = ref("12:00"); // Valeur par défaut
let i = 1;
const props = defineProps({
  types: String,
});

// On définit l'emit
const emit = defineEmits(["added"]);

function addItem() {
  if (!newItem.value || !props.types) return;

  emit("added", {
    id: Date.now(),
    jour: props.types,
    tache: newItem.value,
    heure: startTime.value, // On ajoute l'heure ici
  });

  newItem.value = "";
}
</script>

<template>
  <div class="w-full px-6 mt-10 flex justify-center">
    <!-- Conteneur avec largeur maximale -->
    <div class="flex justify-between items-center gap-16 w-full max-w-6xl">
      <!-- IMAGE -->
      <div class="flex-shrink-0">
        <!-- <img
          src="@/assets/CalendrierBG2.png"
          alt="Calendrier de projet"
          class="w-96 h-auto rounded-xl shadow-xl "
        /> -->
      </div>

      <!-- FORMULAIRE -->
      <div
        class="flex-shrink-0 w-96 p-8 bg-white rounded-xl shadow-lg border border-gray-200"
      >
        <form @submit.prevent="addItem" class="flex flex-col gap-5">
          <h2 class="text-2xl font-semibold text-black">Ajouter une tâche</h2>
          <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {{ types }}
          </h3>

          <input
            type="text"
            v-model="newItem"
            placeholder="Nouvelle tâche..."
            required
            class="p-4 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
          />
          <div class="flex flex-col gap-2">
            <label class="text-xs font-bold text-gray-400"
              >HEURE DE DÉBUT</label
            >
            <input
              type="time"
              v-model="startTime"
              class="p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          <button
            type="submit"
            class="px-6 py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Ajouter
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
