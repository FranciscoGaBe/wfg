<script lang="ts" setup>
import { computed } from 'vue';
import type BoardComponent from '../types/BoardComponent';
import BoardRow from './BoardRow.vue';

interface Props {
  board?: BoardComponent.Board,
  word: string
}

const props = withDefaults(defineProps<Props>(), {
  board: () => []
})

const wordInput = computed<string[]>(() => Array(5).fill(0).map((_, index) => props.word[index] || ''))

const rows = computed<(BoardComponent.Row | string[] | null)[]>(() => {

  let addedInput = false

  return Array(6).fill(0).map((_, index) => {

    if (props.board[index]) return props.board[index]
    if (!addedInput) {

      addedInput = true
      return wordInput.value

    }
    return null

  })

})

</script>

<template>
  <div class="overflow-auto">
    <BoardRow v-for="(row, index) in rows" :key="index" :row="row" />
  </div>
</template>