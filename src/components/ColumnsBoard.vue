<script setup>
import { ref } from 'vue'
import Columns from '@/assets/columsBoard.js'
import ColumnsCell from '@/components/ColumnsCell.vue'

const columns = ref(new Columns())
columns.value.generatePiece()
let i = 0
setInterval(() => {
  i++
  if (i === 9) {
    i = 0
    columns.value.update()
  }
}, 100)

document.onkeydown = function (event) {
  columns.value.makeMove(event.key)
}
</script>

<template>
  <div class="m-auto bg-black shadow-lg shadow-white rounded-[5px]" :key="i">
    <div v-for="(y, i) in columns.board" :key="'row' + i" class="flex">
      <ColumnsCell v-for="(x, j) in y" :key="'col' + j" :number="x" />
    </div>
  </div>
</template>
