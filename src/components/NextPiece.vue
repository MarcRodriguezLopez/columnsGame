<script setup>
import ColumnsCell from '@/components/ColumnsCell.vue'

defineProps({
  piece: Object
})
</script>

<template>
  <div
    class="relative flex flex-col flex-wrap content-center justify-center h-[15%] p-6 aspect-square"
  >
    <ColumnsCell v-for="(cell, i) in piece" :key="i" :number="cell" />
    <div
      class="absolute right-0 top-0 h-[100%] w-[1px] bg-white shadow-[0_0_10px_2px_white] shadow-white"
    />
    <div
      class="absolute left-0 top-0 h-[1px] w-[100%] bg-white shadow-[0_0_10px_2px_white] shadow-white"
    />
    <div
      class="absolute left-0 bottom-0 h-[1px] w-[100%] bg-white shadow-[0_0_10px_2px_white] shadow-white"
    />
  </div>
</template>
