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
  'bg-gray-700 shadow-gray-800',
  'bg-orange-400 shadow-orange-400/50',
  'bg-green-500 shadow-green-500/50'
]

const getTileClass = (state: number) => `board-tile-${state} ${tileClasses[state]}`

</script>

<template>
  <div class="flex flex-col justify-center">
    <div v-for="(row, rowIndex) in board" :key="rowIndex" class="board-row board-check">
      <div
        v-for="(tile, tileIndex) in row"
        :key="tileIndex"
        class="board-tile text-white shadow-lg animate-flip"
        :class="[getTileClass(tile.state)]"
        :style="`animation-delay: ${tileIndex * 0.25}s;`"
      >{{ tile.letter }}</div>
    </div>
    <div v-if="board.length < 6" class="board-row board-input">
      <div
        v-for="(tile, tileIndex) in wordInput"
        :key="tileIndex"
        class="board-tile board-input-tile bg-gray-200 border-4"
        :class="[tile ? 'animate-grow border-black' : 'animate-none border-gray-400']"
      >{{ tile }}</div>
    </div>
    <template v-if="board.length < 6">
      <div
        v-for="(_, rowIndex) in Array(5 - board.length)"
        :key="rowIndex"
        class="board-row board-empty"
      >
        <div v-for="(_, tileIndex) in Array(5)" :key="tileIndex" class="board-tile bg-gray-200"></div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.board-row {
  @apply flex justify-center gap-2 my-1 h-1/6 max-h-16;
}
.board-tile {
  @apply w-1/5 max-w-16 rounded flex items-center justify-center;
  @apply uppercase font-bold text-2xl;
  @apply transition-colors duration-300 ease-in-out;
}

.animate-grow {
  @apply will-change-transform;
  animation: grow 0.3s ease-in-out 0s 1;
}

.animate-flip {
  @apply will-change-transform;
  backface-visibility: hidden;
  animation: flip 0.6s ease-out 0s 1 normal both;
}

@keyframes flip {
  0% {
    transform: rotateY(-180deg);
  }
  100% {
    transform: rotateY(0deg);
  }
}

@keyframes grow {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>