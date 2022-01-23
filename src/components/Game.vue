<script setup lang="ts">
import { nextTick, reactive, ref } from "vue";
import Keyboard from "./Keyboard.vue";
import Board from "./Board.vue";
import BoardComponent from "../types/BoardComponent";
import KeyboardComponent from "../types/KeyboardComponent";
import Wordle, { letterData } from "../wordle/Wordle";

const keyboardRef = ref<InstanceType<typeof Keyboard>>()

const wordle = ref(new Wordle(Wordle.getWord()))
const word = ref('')
const keyStates = reactive<KeyboardComponent.KeyStates>({})
const board = reactive<BoardComponent.Board>([])
const cleared = ref(false)
const done = ref(false)

const onKey = (letter: string) => {

  if (word.value.length > 4) return
  if (done.value) return
  word.value += letter

}

const onDelete = () => {

  if (word.value.length < 1) return
  word.value = word.value.slice(0, -1)

}

const setKeyStates = (data: BoardComponent.Row) => {

  data.forEach(({ letter, state }) => {

    if (keyStates[letter] && keyStates[letter] >= state) return
    keyStates[letter] = state

  })

  nextTick(() => {
    keyboardRef.value?.$forceUpdate()
  })

}

const onEnter = () => {

  if (word.value.length !== 5) return

  const check = wordle.value.check(word.value)
  board.push(check)
  word.value = ''
  setKeyStates(check)

  if (board.length > 5) done.value = true
  if (check.every((data: letterData) => data.state === 2)) {
    done.value = true
    cleared.value = true
  }

}

const resetGame = () => {

  word.value = ''
  board.length = 0
  done.value = false
  cleared.value = false
  wordle.value = new Wordle(Wordle.getWord())
  for (const key in keyStates) {
    delete keyStates[key]
  }

}

</script>

<template>
  <div class="flex flex-col">
    <div class="flex-shrink-0 text-center font-bold text-4xl py-4 text-white">
      <h1>WORDLE</h1>
    </div>
    <div class="flex-shrink-0 flex my-2">
      <button class="wordle-button wordle-reset ml-auto" @click="resetGame">Reiniciar</button>
    </div>
    <Board class="flex-grow" :word="word" :board="board" />
    <Keyboard
      ref="keyboardRef"
      class="flex-shrink-0"
      :keyStates="keyStates"
      @key="onKey"
      @delete="onDelete"
      @enter="onEnter"
    />
  </div>
</template>

<style scoped>
.wordle-button {
  @apply px-2 py-1 rounded;
  @apply bg-gradient-to-b from-red-600 to-red-700 border-2 border-red-700;
  @apply text-white font-bold uppercase text-lg;
}
</style>