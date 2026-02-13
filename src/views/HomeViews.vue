<script setup>
import { ref } from 'vue';
import CalendarViews from './CalendarViews.vue';
import HeaderViews from './HeaderViews.vue';
const Nameday=ref("")
 const emit = defineEmits(['NameDay'])
function day(jour) {
  Nameday.value=jour
}
</script>

<template>
<HeaderViews :type="Nameday" />
<CalendarViews @SelectDay="day"/>
</template>

<style scoped></style>
