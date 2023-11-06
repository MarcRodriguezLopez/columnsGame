<script setup>
defineProps({
  number: Number
})
</script>

<template>

  <img v-if="number > 0" :key="number" class="w-6 h-6" :src="'../src/assets/images/piece-' + number + '.png'" />
  <div v-else class="w-6 h-6">
    
  </div>
</template>