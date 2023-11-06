<script setup>
import {ref} from 'vue'
import Columns from '@/assets/columsBoard.js'

const columns = ref(new Columns())
columns.value.generatePiece()
let i = 0
setInterval(() => {
    columns.value.update()
    i++
}, 100)
</script>

<template>
  <div class="m-auto" :key="i">
    <div v-for="(y, i) in columns.board" :key="'row' + i" class="flex">
      <div v-for="(x, j) in y" :key="'col' + j" class="w-6 h-6 bg-black text-white">{{ x }}</div>
    </div>
  </div>
</template>
