<script setup lang="ts">
import { nextTick, reactive, ref } from "vue";
import Keyboard from "./Keyboard.vue";
import Board from "./Board.vue";
import Alert from './Alert.vue'
import BoardComponent from "../types/BoardComponent";
import KeyboardComponent from "../types/KeyboardComponent";
import Wordle, { letterData } from "../wordle/Wordle";
import Help from "./Help.vue";
import Result from "./Result.vue";

interface AlertInstance extends InstanceType<typeof Alert> {
  alert: (msg: string) => void
}

const keyboardRef = ref<InstanceType<typeof Keyboard>>()
const alertRef = ref<AlertInstance>()

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

  try {
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
  catch (err) {

    alertRef.value?.alert(typeof err === 'string' ? err : (<Error>err).message)

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
    <div
      class="flex-shrink-0 py-2 px-2 text-rose-700 flex items-center justify-between border-b-2 border-rose-800"
    >
      <div class="w-1/6">
        <Help />
      </div>
      <h1 class="text-center font-bold text-4xl">WFG (ES)</h1>
      <div class="w-1/6">
        <button
          class="wordle-button wordle-reset flex items-center justify-center py-1 w-full"
          @click="resetGame"
        >
          <i class="material-icons !text-3xl">refresh</i>
        </button>
      </div>
    </div>
    <Board class="flex-grow p-1" :word="word" :board="board" />
    <Keyboard
      ref="keyboardRef"
      class="flex-shrink-0 p-1"
      :keyStates="keyStates"
      @key="onKey"
      @delete="onDelete"
      @enter="onEnter"
    />
    <Alert ref="alertRef" />
    <Result v-if="done" :word="wordle.word" :board="board" :cleared="cleared" />
  </div>
</template>