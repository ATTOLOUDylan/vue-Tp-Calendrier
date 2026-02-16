<script setup>
import { ref, onMounted } from 'vue'

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
})

/* =============================
   SAUVEGARDE
============================= */
function save() {
  localStorage.setItem('items', JSON.stringify(tasks.value))
}

/* =============================
   DRAG & DROP
============================= */
function moveTask(taskId, newJour) {
  const task = tasks.value.find(t => t.id === taskId)
  if (task) {
    task.jour = newJour
    save()
  }
}

/* =============================
   JOUR SÉLECTIONNÉ
============================= */
const emit = defineEmits(['NameDay'])

function day(jour) {
  emit('NameDay', jour)
}
</script>

<template>
  <h1 class="text-2xl font-bold text-center mb-6">
    Calendar App
  </h1>

  <ul class="flex gap-4 overflow-x-auto px-4 pb-4">
    <Monday
      :tasks="tasks.filter(t => t.jour === 'Monday')"
      @selectDay="day"
      @dropTask="moveTask"
    />

    <Tuesday
      :tasks="tasks.filter(t => t.jour === 'Tuesday')"
      @selectDay="day"
      @dropTask="moveTask"
    />

    <Wednesday
      :tasks="tasks.filter(t => t.jour === 'Wednesday')"
      @selectDay="day"
      @dropTask="moveTask"
    />

    <Thursday
      :tasks="tasks.filter(t => t.jour === 'Thursday')"
      @selectDay="day"
      @dropTask="moveTask"
    />

    <Friday
      :tasks="tasks.filter(t => t.jour === 'Friday')"
      @selectDay="day"
      @dropTask="moveTask"
    />

    <Saturday
      :tasks="tasks.filter(t => t.jour === 'Saturday')"
      @selectDay="day"
      @dropTask="moveTask"
    />

    <Sunday
      :tasks="tasks.filter(t => t.jour === 'Sunday')"
      @selectDay="day"
      @dropTask="moveTask"
    />
  </ul>
</template>
