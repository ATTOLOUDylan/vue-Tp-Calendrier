<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  jour: {
    type: String,
    required: true
  }
})

// On déclare tous les événements émis
const emit = defineEmits(['editTask', 'requestDelete'])

const filteredItems = computed(() =>
  props.items.filter(item => item && item.jour === props.jour)
)
</script>

<template>
  <ul class="space-y-3">
    <!-- État vide -->
    <li v-if="filteredItems.length === 0"
        class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-sm text-gray-400">
      Aucune tâche prévue
    </li>

    <!-- Tâches -->
    <li v-for="item in filteredItems" :key="item.id"
        class="group flex items-center justify-between p-4 rounded-lg bg-white border border-gray-200 shadow-sm hover:border-black hover:shadow-md transition-all">

      <span class="text-sm text-gray-800">{{ item.tache }}</span>

      <div class="flex gap-3 opacity-0 group-hover:opacity-100 transition">
        <!-- EDIT -->
        <button @click="emit('editTask', item)"
                class="text-gray-400 hover:text-black transition"
                title="Modifier">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
               viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.816
                     a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685
                     a4.5 4.5 0 011.13-1.897L16.862 4.487z"/>
          </svg>
        </button>

        <!-- DELETE -->
        <button @click="emit('requestDelete', item.id)"
                class="text-gray-400 hover:text-red-600 transition"
                title="Supprimer">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
               viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862
                     a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6
                     M1 7h22m5-3H6a1 1 0 01-1-1V2h14v1a1 1 0 01-1 1z"/>
          </svg>
        </button>
      </div>
    </li>
  </ul>
</template>
