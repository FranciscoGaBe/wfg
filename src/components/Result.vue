<script lang="ts" setup>import { ref } from 'vue';
import BoardComponent from '../types/BoardComponent';
import Modal from './Modal.vue';

interface Props {
  cleared: boolean,
  board: BoardComponent.Board,
  word: string
}

const props = defineProps<Props>()

const show = ref(true)

const colors = [
  '⬛',
  '🟦',
  '🟩'
]

const url = 'https://FranciscoGaBe.github.io/wfg'
const getBoardText = () => props.board.map(row => {

  return row.map(({ state }) => colors[state]).join('')

}).join('%0A')
const share = [
  {
    text: 'Twitter',
    link: `https://twitter.com/intent/tweet?url=${url}&text=WFG%20(ES)%0A%0A${getBoardText()}%0A%0A`
  }
]

</script>

<template>
  <Modal v-model:show="show" title="Resultado">
    <div class="w-80">
      <div class="flex items-center justify-between">
        <h4 class="font-bold text-xl text-rose-600">Palabra:</h4>
        <div class="text-center text-lg uppercase border-b-2 border-current">
          <a
            class="px-1 inline-flex items-center justify-center"
            :href="`https://dle.rae.es/?w=${word}`"
            target="_blank"
          >
            <span class="mr-2">{{ word }}</span>
            <i class="material-icons !text-lg">launch</i>
          </a>
        </div>
      </div>
    </div>
    <div class="flex mt-4">
      <div class="w-1/2 py-8 border-r-2 border-rose-700 flex flex-col items-center">
        <div v-for="(row, rowIndex) in board" :key="rowIndex" class="flex">
          <div v-for="(tile, tileIndex) in row" :key="tileIndex">{{ colors[tile.state] }}</div>
        </div>
      </div>
      <div class="w-1/2 flex flex-col items-center">
        <h5 class="font-bold text-lg text-rose-700 mb-1">Compartir</h5>
        <div v-for="item in share" :key="item.text">
          <a :href="item.link" target="_blank">{{ item.text }}</a>
        </div>
      </div>
    </div>
  </Modal>
</template>