<script setup>
import TaskList from './TaskList.vue'
import { ref, defineProps, defineEmits } from 'vue'

/* =============================
   PROPS
   Le parent envoie UNIQUEMENT
   les tâches du mercredi
============================= */
const props = defineProps({
  tasks: Array
})

/* =============================
   EMITS
============================= */
const emit = defineEmits([
  'selectDay',
  'dropTask',
  'deleteTask',
  'editTask'
])

/* =============================
   ÉDITION (logique conservée)
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
  // On stocke UNIQUEMENT l'id de la tâche
  event.dataTransfer.setData('taskId', taskId)
}

function onDrop(event) {
  const taskId = Number(event.dataTransfer.getData('taskId'))

  // On informe le parent :
  // cette tâche passe au jour "Wednesday"
  emit('dropTask', taskId, 'Wednesday')
}

/* =============================
   SÉLECTION DU JOUR
============================= */
function select() {
  emit('selectDay', 'Wednesday')
}
</script>

<template>
  <li
    class="day-column p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"

    @click="select"

    @dragover.prevent
    @drop="onDrop"
  >
    <!-- Titre du jour -->
    <h3 class="day-title text-2xl font-bold text-gray-800 mb-4">
      Wednesday
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
        jour="Wednesday"
        @deleteTask="deleteTask"
        @editTask="editTask"
        class="space-y-2 mb-2"
      />
    </div>

    <!-- ZONE ÉDITION -->
    <div v-if="editingTask" class="flex flex-col sm:flex-row gap-2 mt-3">
      <input
        v-model="editedText"
        class="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        placeholder="Modifier la tâche..."
      />
      <button
        @click="saveEdit"
        class="px-5 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
      >
        Enregistrer
      </button>
    </div>
  </li>
</template>
