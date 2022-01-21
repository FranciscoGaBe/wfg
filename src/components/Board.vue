<script lang="ts" setup>
import { computed } from 'vue';
import type BoardComponent from '../types/BoardComponent';

interface Props {
  board?: BoardComponent.Board,
  word: string
}

const props = withDefaults(defineProps<Props>(), {
  board: () => []
})

const wordInput = computed<string[]>(() => Array(5).fill(0).map((_, index) => props.word[index] || ''))

const tileClasses = [
  'bg-gray-500 border-gray-600',
  'bg-orange-300 border-orange-400',
  'bg-green-500 border-green-600'
]

const getTileClass = (state: number) => `wordle-tile-${state} ${tileClasses[state]}`

</script>

<template>
  <div class="flex flex-col justify-center w-full">
    <div v-for="(row, rowIndex) in board" :key="rowIndex" class="wordle-row wordle-check">
      <div
        v-for="(tile, tileIndex) in row"
        :key="tileIndex"
        class="wordle-tile text-white"
        :class="[getTileClass(tile.state)]"
      >{{ tile.letter }}</div>
    </div>
    <div v-if="board.length < 6" class="wordle-row wordle-input">
      <div
        v-for="(tile, tileIndex) in wordInput"
        :key="tileIndex"
        class="wordle-tile wordle-input-tile"
        :class="{ 'border-gray-500': tile }"
      >{{ tile }}</div>
    </div>
    <div v-for="(_, rowIndex) in Array(5 - board.length)" :key="rowIndex" class="wordle-row">
      <div v-for="(_, tileIndex) in Array(5)" :key="tileIndex" class="wordle-tile"></div>
    </div>
  </div>
</template>

<style scoped>
.wordle-row {
  @apply flex justify-center gap-0.5 my-0.5 h-1/5 max-h-14;
}
.wordle-tile {
  @apply w-1/5 max-w-14 rounded-md flex items-center justify-center;
  @apply capitalize font-bold text-2xl;
  @apply border-2 shadow;
}
</style>