<script lang="ts" setup>

interface Props {
  keyStates?: Record<string, number>
}

interface Emits {
  (e: 'key', letter: string): void,
  (e: 'enter'): void,
  (e: 'delete'): void
}

const props = withDefaults(defineProps<Props>(), {
  keyStates: () => ({})
})
const emits = defineEmits<Emits>()

const letters = "qwertyuiop.asdfghjklñ.zxcvbnm";

const keyClasses = [
  'from-gray-500 to-gray-600 border-gray-600',
  'from-orange-300 to-orange-400 border-orange-400',
  'from-green-500 to-green-600 border-green-600'
]

const getKeyClass = (letter: string) => {

  if (!props.keyStates.hasOwnProperty(letter)) return 'from-gray-300 to-gray-400 border-gray-400'

  const state = props.keyStates[letter]
  return `keyboard-key-state-${state} ${keyClasses[state]}`

}

</script>

<template>
  <div class="select-none bg-red-600">
    <div class="bg-gray-500 shadow rounded">
      <div v-for="(row, index) in letters.split('.')" class="flex justify-center">
        <div
          v-if="index === 2"
          class="keyboard-key keyboard-delete flex-grow"
          @click="emits('delete')"
        >Borrar</div>
        <div
          v-for="letter in row.split('')"
          class="keyboard-key"
          :class="[`keyboard-key-${letter}`, getKeyClass(letter)]"
          @click="emits('key', letter)"
        >
          <span>{{ letter }}</span>
        </div>
        <div
          v-if="index === 2"
          class="keyboard-key keyboard-enter flex-grow"
          @click="emits('enter')"
        >Enter</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.keyboard-key {
  @apply h-12 flex items-center justify-center text-lg font-black cursor-pointer capitalize;
  @apply bg-gradient-to-b text-white;
  @apply border;
  width: 10%;
}

.keyboard-delete,
.keyboard-enter {
  @apply from-gray-700 to-gray-800 border-gray-800;
}
</style>