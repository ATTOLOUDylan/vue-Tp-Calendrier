<script setup>
import TodoJours from '@/components/TodoJours.vue';
 const emit = defineEmits(['SelectDay'])
function day(jour) {
  emit('SelectDay', jour)
}
</script>

<template>
  <TodoJours @NameDay="day"/>
</template>

<style scoped>

</style>