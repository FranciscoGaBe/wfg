<script lang="ts" setup>

interface Props {
  show?: boolean,
  title?: string
}

withDefaults(defineProps<Props>(), { show: false, title: '' })

const emits = defineEmits<{
  (e: 'update:show', show: boolean): void
}>()

const close = () => { emits('update:show', false) }

</script>

<template>
  <transition name="fade">
    <div
      v-show="show"
      ref="modalRef"
      class="modal fixed -inset-8 flex items-center justify-center z-50 bg-black bg-opacity-70"
      @click.self="close"
    >
      <div class="p-1 max-w-[100vw] w-96 max-h-screen h-full md:h-auto">
        <div ref="bodyRef" class="bg-gray-800 w-full h-full rounded shadow flex flex-col">
          <div
            class="flex-shrink flex items-center justify-between pl-4 py-2 pr-2 border-b-2 border-rose-600 shadow shadow-rose-600/50"
          >
            <div class="modal-title font-bold text-3xl text-rose-700">{{ title }}</div>
            <button class="modal-close flex items-center justify-center" @click="close">
              <i class="material-icons !text-3xl text-rose-600 !font-bold">close</i>
            </button>
          </div>
          <div class="modal-content flex-grow p-4 text-rose-500 font-medium overflow-auto">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-2rem);
}
</style>