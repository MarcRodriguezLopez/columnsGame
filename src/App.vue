<script setup>
import ColumnsBoard from '@/components/ColumnsBoard.vue'
import NextPiece from './components/NextPiece.vue'
import { ref } from 'vue'
import Columns from '@/assets/columsBoard.js'

const columns = ref(new Columns())
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
  <main class="flex flex-wrap justify-center content-center h-screen align-middle bg-black">
    <ColumnsBoard :key="i" :board="columns.board" />
    <NextPiece :piece="columns.nextPiece" />
  </main>
</template>
