<script lang="ts" setup>
import { ref } from 'vue';
import Modal from './Modal.vue';
import BoardRow from './BoardRow.vue';
import Wordle from '../wordle/Wordle';

const show = ref(false)

const onClick = () => { show.value = !show.value }

const wordle = new Wordle('chico')
const examples = [
  {
    row: wordle.check('queso'),
    text: 'La letra <b>O</b> se encuentra en la palabra y esta en la posición correcta.'
  },
  {
    row: wordle.check('ostra'),
    text: 'La letra <b>O</b> se encuentra  en la palabra pero en la posición incorrecta.'
  },
  {
    row: wordle.check('rutas'),
    text: '<b>Ninguna</b> letra se encuentra en la palabra.'
  }
]

</script> 

<template>
  <div>
    <button class="flex items-center justify-center py-1 w-full" @click="onClick">
      <i class="material-icons !text-3xl">help</i>
    </button>
    <Modal v-model:show="show" title="Instrucciones">
      <div>
        <p>Dispones de 6 intentos para acertar la palabra.</p>
        <p class="my-2">Cada intento ha de ser una palabra de 5 letras existente.</p>
        <p>Despues de cada intento las letras cambiaran de color para indicar su existencia en la palabra.</p>
        <h4 class="text-xl font-semibold mt-6 mb-4">Ejemplos:</h4>
        <div v-for="(example, index) in examples" :key="index">
          <BoardRow class="!h-16 !w-80" :row="example.row" />
          <p v-html="example.text" class="mt-2 mb-4"></p>
        </div>
      </div>
    </Modal>
  </div>
</template>