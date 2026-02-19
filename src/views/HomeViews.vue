<!-- HomeViews.vue -->
<script setup>
import { ref } from 'vue';
import CalendarViews from './CalendarViews.vue';
import HeaderViews from './HeaderViews.vue';

const Nameday=ref("")
 const emit = defineEmits(['NameDay'])
function day(jour) {
  Nameday.value=jour
}

const valeur =ref("")
function handleAdded(task) {
  valeur.value = task
}
</script>

<template>
<HeaderViews :type="Nameday" @added="handleAdded" />
<CalendarViews @SelectDay="day" :type="valeur" />
</template>

<style scoped></style>
