<script setup>
import TaskList from './TaskList.vue'
import { ref, defineProps, defineEmits } from 'vue'

/* =============================
   PROPS
   Le parent envoie uniquement
   les tâches du samedi
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
  emit('dropTask', taskId, 'Saturday')
}

/* =============================
   SÉLECTION DU JOUR
============================= */
function select() {
  emit('selectDay', 'Saturday')
}
function handleDelete(id) {
 
  
  emit('requestDelete', id)
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
      Saturday
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
        jour="Saturday"
       @requestDelete="handleDelete"
        @editTask="editTask"
        class="space-y-2 mb-2"
      />
    </div>

    <!-- Zone édition -->
  <div
  v-if="editingTask"
  class="
    mt-4
    flex flex-col sm:flex-row gap-3
    p-4
    rounded-xl
    bg-gray-50
    border border-gray-200
    shadow-sm
    animate-fade-in
  "
>
  <!-- INPUT -->
  <input
    v-model="editedText"
    placeholder="Modifier la tâche…"
    class="
      flex-1
      px-4 py-3
      text-sm
      text-gray-800
      bg-white
      border border-gray-300
      rounded-lg
      outline-none
      transition
      focus:border-black
      focus:ring-1 focus:ring-black
      placeholder-gray-400
    "
  />

  <!-- BOUTON -->
  <button
    @click="saveEdit"
    class="
      px-6 py-3
      text-sm font-medium
      text-white
      bg-black
      rounded-lg
      transition
      hover:bg-gray-800
      active:scale-95
      whitespace-nowrap
    "
  >
    Enregistrer
  </button>
</div>

  </li>
</template>
