<script lang="ts" setup>
import { ref } from "vue";

const show = ref(false)
const message = ref('')

let timeout: number | undefined = undefined

const hideAlert = () => {

  show.value = false

}

const alert = (msg: string) => {

  clearTimeout(timeout)

  message.value = msg
  show.value = true

  timeout = window.setTimeout(() => { hideAlert(); }, 3000)

}

defineExpose({
  alert
})

</script>

<template>
  <div v-show="show" class="fixed top-0 left-0 right-0 flex justify-center pt-4 animate-show">
    <div class="alert-message">{{ message }}</div>
  </div>
</template>

<style scoped>
.alert-message {
  @apply px-8 py-4 rounded;
  @apply text-white font-semibold text-center;
  @apply bg-black bg-opacity-90;
  @apply transition-all duration-300 ease-in-out;
}

.animate-show {
  @apply will-change-transform;
  animation: show 3s ease-in-out 0s 1 both;
}
@keyframes show {
  0% {
    transform: translateY(-0.5rem);
    opacity: 0;
  }
  10% {
    transform: translateY(0rem);
    opacity: 1;
  }
  90% {
    transform: translateY(0rem);
    opacity: 1;
  }
  100% {
    transform: translateY(-0.5rem);
    opacity: 0;
  }
}
</style>