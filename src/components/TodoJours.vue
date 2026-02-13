<script setup>
import Monday from './Monday.vue'
import Tuesday from './Tuesday.vue'
import Wednesday from './Wednesday.vue'
import Thursday from './Thursday.vue'
import Friday from './Friday.vue'
import Saturday from './Saturday.vue'
import Sunday from './Sunday.vue'

const emit = defineEmits(['NameDay', 'Modif2'])

function day(jour) {
  emit('NameDay', jour)
}
</script>

<template>
  <h1 class="text-2xl font-bold text-center mb-6">
    Calendar App
  </h1>

  <!-- Conteneur calendrier -->
  <ul
    class="
      flex
      gap-4
      overflow-x-auto
      px-4
      pb-4
    "
  >
    <Monday    @selectDay="day" />
    <Tuesday   @selectDay="day" />
    <Wednesday @selectDay="day" />
    <Thursday  @selectDay="day" />
    <Friday    @selectDay="day" />
    <Saturday  @selectDay="day" />
    <Sunday    @selectDay="day" />
  </ul>
</template>
