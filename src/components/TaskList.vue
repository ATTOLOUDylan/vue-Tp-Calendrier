<script setup>
import { computed } from 'vue'

const emit = defineEmits(['deleteTask', 'editTask'])

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

const filteredItems = computed(() =>
  props.items.filter(item => item && item.jour === props.jour)
)
</script>

<template>
  <ul class="space-y-2">
    <li
      v-for="item in filteredItems"
      :key="item.id"
      class="task-item flex justify-between items-center p-3 rounded-lg bg-green-50 border border-green-200 shadow-sm hover:shadow-md transition"
    >
      <span class="text-gray-800 font-medium">{{ item.tache }}</span>

      <div class="actions flex gap-2">
        <button
          @click="emit('editTask', item)"
          class="text-green-600 hover:text-green-800 transition text-lg"
          title="Modifier"
        >
          ✏️
        </button>
        <button
          @click="emit('deleteTask', item.id)"
          class="text-red-500 hover:text-red-700 transition text-lg"
          title="Supprimer"
        >
          🗑
        </button>
      </div>
    </li>
  </ul>
</template>
