<!-- calendar.vue -->

<script setup>
import TodoJours from '@/components/TodoJours.vue';
 const emit = defineEmits(['SelectDay'])
function day(jour) {
  emit('SelectDay', jour)
}
const props = defineProps({
  type: Number
})


</script>

<template>
  <TodoJours @NameDay="day" :element="type"/>
</template>

<style scoped>

</style>