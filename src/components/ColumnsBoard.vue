<script setup>
import ColumnsCell from '@/components/ColumnsCell.vue'

defineProps({
  board: Object
})
</script>

<template>
  <div class="relative h-fit w-fit bg-black rounded-[5px]">
    <div v-for="(y, i) in board" :key="'row' + i" class="flex">
      <ColumnsCell v-for="(x, j) in y" :key="'col' + j" :number="x" />
    </div>
    <div
      class="absolute right-0 top-0 h-[100%] w-[1px] bg-white shadow-[0_0_10px_2px_white] shadow-white"
    />
    <div
      class="absolute left-0 top-0 h-[100%] w-[1px] bg-white shadow-[0_0_10px_2px_white] shadow-white"
    />
    <div
      class="absolute left-0 bottom-0 h-[1px] w-[100%] bg-white shadow-[0_0_10px_2px_white] shadow-white"
    />
  </div>
</template>
