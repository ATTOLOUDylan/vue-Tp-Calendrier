<!-- HeaderViews.vue -->
<script setup>
import Input from '@/components/Input.vue'

// Props
const props = defineProps({
  type: String
})


const emit = defineEmits(['added'])
function handleAdded(task) {
  emit('added', task)
}
</script>

<template>

  <Input :types="type" @added="handleAdded" />
</template>
