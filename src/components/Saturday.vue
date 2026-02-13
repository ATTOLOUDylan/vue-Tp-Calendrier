<script setup>
import TaskList from './TaskList.vue'
import { ref, onMounted } from 'vue'

const items = ref([])
const editingTask = ref(null)
const editedText = ref('')

onMounted(() => {
  const savedItems = localStorage.getItem("items")
  items.value = savedItems ? JSON.parse(savedItems) : []
})

function deleteTask(id) {
  items.value = items.value.filter(item => item.id !== id)
  save()
}

function editTask(task) {
  editingTask.value = task.id
  editedText.value = task.tache
}

function saveEdit() {
  const task = items.value.find(t => t.id === editingTask.value)
  if (task) task.tache = editedText.value

  editingTask.value = null
  editedText.value = ''
  save()
}

function save() {
  localStorage.setItem("items", JSON.stringify(items.value))
}


const emit = defineEmits(['selectDay'])

function select() {
  emit('selectDay', 'Saturday')
}

</script>

<template>
  <li
    class="day-column p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
    @click="select"
  >
    <!-- Titre du jour -->
    <h3 class="day-title text-2xl font-bold text-gray-800 mb-4">
      Saturday
    </h3>

    <!-- Liste des tâches -->
    <TaskList
      :items="items"
      jour="Saturday"
      @deleteTask="deleteTask"
      @editTask="editTask"
      class="space-y-2 mb-4"
    />

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

