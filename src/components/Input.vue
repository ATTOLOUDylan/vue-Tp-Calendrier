<script setup>
import { ref, onMounted } from 'vue'
 
const items = ref([])
const newItem = ref("")
const props = defineProps({
    types: String
})

onMounted(() => {
  if (!localStorage.getItem("items")) {
    localStorage.setItem("items", JSON.stringify([]))
  }
  items.value = JSON.parse(localStorage.getItem("items"))
})

function addItem() {
  if (!newItem.value) return
  if (!props.types) return 

  items.value.push({id: Date.now(), jour: props.types, tache: newItem.value})
  newItem.value = ""

  localStorage.setItem("items", JSON.stringify(items.value))
}
</script>

<template>
  <div class="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto mt-4">
    <form @submit.prevent="addItem" class="flex flex-col gap-3">
      <h2 class="text-xl font-bold text-gray-800">Ajouter une tâche</h2>
      <h3 class="text-gray-600">{{ types }}</h3>

      <input 
        type="text" 
        v-model="newItem" 
        placeholder="Nouvelle tâche..." 
        required
        class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
      />

      <button 
        type="submit"
        class="px-5 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
      >
        Ajouter
      </button>
    </form>
  </div>
</template>
