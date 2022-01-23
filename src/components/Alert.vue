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
  <div class="fixed top-0 left-0 right-0 flex justify-center pt-4">
    <div
      class="alert-message"
      :class="[show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2']"
    >{{ message }}</div>
  </div>
</template>

<style scoped>
.alert-message {
  @apply px-8 py-4 rounded;
  @apply text-white font-semibold text-center;
  @apply bg-black bg-opacity-90;
  @apply transition-all duration-300 ease-in-out;
}
</style>