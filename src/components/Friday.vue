<script setup>
import TaskList from './TaskList.vue'
import { ref, defineProps, defineEmits } from 'vue'

/* =============================
   PROPS
   Le parent envoie uniquement
   les tâches du vendredi
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
   ÉDITION
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
  event.dataTransfer.setData('taskId', taskId)
}

function onDrop(event) {
  const taskId = Number(event.dataTransfer.getData('taskId'))
  emit('dropTask', taskId, 'Friday')
}

/* =============================
   SÉLECTION DU JOUR
============================= */
function select() {
  emit('selectDay', 'Friday')
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
      Friday
    </h3>

    <!-- Tâches draggable -->
    <div
      v-for="task in tasks"
      :key="task.id"
      draggable="true"
      @dragstart="onDragStart($event, task.id)"
    >
      <TaskList
        :items="[task]"
        jour="Friday"
        @deleteTask="deleteTask"
        @editTask="editTask"
        class="space-y-2 mb-2"
      />
    </div>

    <!-- Zone édition -->
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
