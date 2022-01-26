<script lang="ts" setup>

interface Props {
  keyStates?: Record<string, number>
}

interface Emits {
  (e: 'key', letter: string): void,
  (e: 'enter'): void,
  (e: 'delete'): void
}

withDefaults(defineProps<Props>(), {
  keyStates: () => ({})
})
const emits = defineEmits<Emits>()

const letters = "qwertyuiop.asdfghjklñ.zxcvbnm";

const getClasses = (letter: string, keyStates: Record<string, number>) => {

  const classes = [
    'border-gray-200 shadow-gray-200/50',
    'border-gray-700 shadow-gray-700/50',
    'border-orange-400 shadow-orange-400/50',
    'border-green-500 shadow-green-500/50'
  ]

  return classes[(keyStates[letter] === undefined ? -1 : keyStates[letter]) + 1]

}

</script>

<template>
  <div class="select-none">
    <div>
      <div
        v-for="(row, index) in letters.split('.')"
        :key="index"
        class="flex justify-center gap-1 my-1"
      >
        <button
          v-if="index === 2"
          class="keyboard-key keyboard-enter flex-grow"
          @click="emits('enter')"
        >
          <span class="material-icons">check</span>
        </button>
        <button
          v-for="letter in row.split('')"
          :key="letter"
          class="keyboard-key"
          :class="[`keyboard-key-${letter}`, keyStates.hasOwnProperty(letter) ? `keyboard-key-state-${keyStates[letter]}` : '']"
          @click="emits('key', letter)"
        >
          <span>{{ letter }}</span>
          <div
            class="border-2 w-1/2 rounded my-2 mx-auto shadow transition-colors"
            :class="[getClasses(letter, keyStates)]"
          ></div>
        </button>
        <button
          v-if="index === 2"
          class="keyboard-key keyboard-delete flex-grow"
          @click="emits('delete')"
        >
          <span class="material-icons">backspace</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.keyboard-key {
  @apply w-[10%] rounded pt-2 will-change-transform hover:-translate-y-0.5 active:translate-y-0.5;
  @apply bg-gray-900 shadow-sm hover:shadow-md shadow-rose-100 hover:shadow-rose-700 active:shadow-none;
  @apply uppercase font-semibold text-rose-100 hover:text-rose-700;
  @apply transition-all duration-300;
}

.keyboard-delete,
.keyboard-enter {
  @apply from-rose-700 to-rose-900 border-rose-900;
}
</style>