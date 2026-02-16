<script setup>
import TaskList from './TaskList.vue'
import { ref, onMounted, defineProps, defineEmits } from 'vue'

/* =============================
   PROPS : tâches du lundi
============================= */
const props = defineProps({
  tasks: Array
})

/* =============================
   EMITS
============================= */
const emit = defineEmits(['selectDay', 'dropTask'])

/* =============================
   ÉDITION (ton code inchangé)
============================= */
const editingTask = ref(null)
const editedText = ref('')

function deleteTask(id) {
  emit('deleteTask', id)
}

function editTask(task) {
  editingTask.value = task.id
  editedText.value = task.tache
}

function saveEdit() {
  emit('editTask', {
    id: editingTask.value,
    tache: editedText.value
  })
  editingTask.value = null
  editedText.value = ''
}

/* =============================
   DRAG & DROP
============================= */
function onDragStart(event, taskId) {
  // On stocke uniquement l'id (jamais l'objet complet)
  event.dataTransfer.setData('taskId', taskId)
}

function onDrop(event) {
  // Récupération de l'id
  const taskId = Number(event.dataTransfer.getData('taskId'))

  // On informe le parent que la tâche
  // doit passer au jour "Monday"
  emit('dropTask', taskId, 'Monday')
}

/* =============================
   Sélection du jour
============================= */
function select() {
  emit('selectDay', 'Monday')
}
</script>

<template>
  <li
    class="day-column p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
    @click="select"

    @dragover.prevent
    @drop="onDrop"
  >
    <h3 class="day-title text-2xl font-bold text-gray-800 mb-4">
      Monday
    </h3>

    <!-- TÂCHES DRAGGABLES -->
    <div
      v-for="task in tasks"
      :key="task.id"
      draggable="true"
      @dragstart="onDragStart($event, task.id)"
    >
      <TaskList
        :items="[task]"
        jour="Monday"
        @deleteTask="deleteTask"
        @editTask="editTask"
        class="space-y-2 mb-2"
      />
    </div>

    <!-- ÉDITION -->
    <div v-if="editingTask" class="flex flex-col sm:flex-row gap-2 mt-3">
      <input
        v-model="editedText"
        class="flex-1 p-3 border border-gray-300 rounded-lg"
        placeholder="Modifier la tâche..."
      />
      <button
        @click="saveEdit"
        class="px-5 py-3 bg-green-500 text-white rounded-lg"
      >
        Enregistrer
      </button>
    </div>
  </li>
</template>
