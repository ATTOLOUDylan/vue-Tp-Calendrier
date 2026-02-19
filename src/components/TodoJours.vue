<!-- Todojours.vue -->
<script setup>
import { ref, onMounted, watch } from 'vue'

import Monday from './Monday.vue'
import Tuesday from './Tuesday.vue'
import Wednesday from './Wednesday.vue'
import Thursday from './Thursday.vue'
import Friday from './Friday.vue'
import Saturday from './Saturday.vue'
import Sunday from './Sunday.vue'

/* =============================
   STATE CENTRAL
============================= */
const tasks = ref([])

onMounted(() => {
  const saved = localStorage.getItem('items')
  tasks.value = saved ? JSON.parse(saved) : []
  updateButtons()
})

/* =============================
   SAUVEGARDE
============================= */
function save() {
  localStorage.setItem('items', JSON.stringify(tasks.value))
}

/* =============================
   CRUD
============================= */
function deleteTask(id) {
  tasks.value = tasks.value.filter(t => t.id !== id)
  save()
}

function editTask(payload) {
  const task = tasks.value.find(t => t.id === payload.id)
  if (task) {
    task.tache = payload.tache
    save()
  }
}

function moveTask(taskId, newJour) {
  const task = tasks.value.find(t => t.id === taskId)
  if (task) {
    task.jour = newJour
    save()
  }
}

/* =============================
   JOUR
============================= */
const emit = defineEmits(['NameDay'])
function day(jour) {
  emit('NameDay', jour)
}

const props = defineProps({
  element: Object
})

watch(
  () => props.element,
  (task) => {
    if (!task) return
    tasks.value.push(task)
    save()
  }
)

/* =============================
   SCROLL + BOUTONS
============================= */
const calendar = ref(null)
const isAtStart = ref(true)
const isAtEnd = ref(false)

function updateButtons() {
  const el = calendar.value
  if (!el) return
  isAtStart.value = el.scrollLeft <= 0
  isAtEnd.value =
    el.scrollLeft + el.clientWidth >= el.scrollWidth - 5
}

function scrollLeft() {
  calendar.value.scrollBy({ left: -320, behavior: 'smooth' })
  setTimeout(updateButtons, 350)
}

function scrollRight() {
  calendar.value.scrollBy({ left: 320, behavior: 'smooth' })
  setTimeout(updateButtons, 350)
}

// MODAL SUPPRESSION
const showDeleteModal = ref(false)
const taskToDelete = ref(null)

function confirmDelete(taskId) {
  taskToDelete.value = taskId
  showDeleteModal.value = true
}

function cancelDelete() {
  taskToDelete.value = null
  showDeleteModal.value = false
}

function performDelete() {
  if (taskToDelete.value !== null) {
    deleteTask(taskToDelete.value)
    cancelDelete()
  }
}
</script>

<template>
  <div class="w-full px-4 mt-10 flex justify-center">
    <div class="w-full max-w-7xl relative">

      <!-- BOUTON GAUCHE -->
      <button
        @click="scrollLeft"
        :disabled="isAtStart"
        class="
          hidden md:flex
          absolute left-2 top-1/2 -translate-y-1/2
          w-12 h-12 items-center justify-center
          rounded-full
          bg-black/70 backdrop-blur
          text-white text-2xl font-bold
          shadow-xl
          hover:bg-black
          active:scale-95
          transition-all
          disabled:opacity-30 disabled:cursor-not-allowed
          z-10
        "
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>
      </button>

      <!-- LISTE DES JOURS -->
      <ul
        ref="calendar"
        @scroll="updateButtons"
        class="flex gap-4 overflow-x-hidden pb-4"
      >
        <Monday
          :tasks="tasks.filter(t => t.jour === 'Monday')"
          @requestDelete="confirmDelete"
          
          @editTask="editTask"
          @selectDay="day"
          @dropTask="moveTask"
          class="flex-shrink-0 min-w-[220px] sm:min-w-[250px] md:min-w-[300px] bg-white shadow-md rounded-lg p-4"
        />

        <Tuesday
          :tasks="tasks.filter(t => t.jour === 'Tuesday')"
          @deleteTask="deleteTask"
          @editTask="editTask"
          @selectDay="day"
          @dropTask="moveTask"
          class="flex-shrink-0 min-w-[220px] sm:min-w-[250px] md:min-w-[300px] bg-white shadow-md rounded-lg p-4"
        />

        <Wednesday
          :tasks="tasks.filter(t => t.jour === 'Wednesday')"
          @deleteTask="deleteTask"
          @editTask="editTask"
          @selectDay="day"
          @dropTask="moveTask"
          class="flex-shrink-0 min-w-[220px] sm:min-w-[250px] md:min-w-[300px] bg-white shadow-md rounded-lg p-4"
        />

        <Thursday
          :tasks="tasks.filter(t => t.jour === 'Thursday')"
          @deleteTask="deleteTask"
          @editTask="editTask"
          @selectDay="day"
          @dropTask="moveTask"
          class="flex-shrink-0 min-w-[220px] sm:min-w-[250px] md:min-w-[300px] bg-white shadow-md rounded-lg p-4"
        />

        <Friday
          :tasks="tasks.filter(t => t.jour === 'Friday')"
          @deleteTask="deleteTask"
          @editTask="editTask"
          @selectDay="day"
          @dropTask="moveTask"
          class="flex-shrink-0 min-w-[220px] sm:min-w-[250px] md:min-w-[300px] bg-white shadow-md rounded-lg p-4"
        />

        <Saturday
          :tasks="tasks.filter(t => t.jour === 'Saturday')"
          @deleteTask="deleteTask"
          @editTask="editTask"
          @selectDay="day"
          @dropTask="moveTask"
          class="flex-shrink-0 min-w-[220px] sm:min-w-[250px] md:min-w-[300px] bg-white shadow-md rounded-lg p-4"
        />

        <Sunday
          :tasks="tasks.filter(t => t.jour === 'Sunday')"
          @deleteTask="deleteTask"
          @editTask="editTask"
          @selectDay="day"
          @dropTask="moveTask"
          class="flex-shrink-0 min-w-[220px] sm:min-w-[250px] md:min-w-[300px] bg-white shadow-md rounded-lg p-4"
        />
      </ul>

      <!-- BOUTON DROIT -->
      <button
        @click="scrollRight"
        :disabled="isAtEnd"
        class="
          hidden md:flex
          absolute right-2 top-1/2 -translate-y-1/2
          w-12 h-12 items-center justify-center
          rounded-full
          bg-black/70 backdrop-blur
          text-white text-2xl font-bold
          shadow-xl
          hover:bg-black
          active:scale-95
          transition-all
          disabled:opacity-30 disabled:cursor-not-allowed
          z-10
        "
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>
      </button>

    </div>
  </div>
  <!-- MODAL SUPPRESSION -->
<div
  v-if="showDeleteModal"
  class="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
>
  <div class="bg-white rounded-xl p-6 w-80 shadow-xl flex flex-col gap-4">
    <h3 class="text-lg font-semibold text-gray-800">Confirmer la suppression</h3>
    <p class="text-gray-600 text-sm">
      Êtes-vous sûr de vouloir supprimer cette tâche ? Cette action est irréversible.
    </p>
    
    <div class="flex justify-end gap-3 mt-4">
      <button
        @click="cancelDelete"
        class="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
      >
        Annuler
      </button>
      <button
        @click="performDelete"
        class="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
      >
        Supprimer
      </button>
    </div>
  </div>
</div>

</template>
