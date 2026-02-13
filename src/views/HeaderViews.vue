<script setup>
import Input from '@/components/Input.vue';
const props=defineProps({
    type:String
})

</script>

<template>

  <Input :types="type"/>
</template>

<style scoped>

</style>