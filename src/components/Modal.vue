<script lang="ts" setup>

interface Props {
  show?: boolean,
  title?: string
}

withDefaults(defineProps<Props>(), { show: false, title: '' })

const emits = defineEmits<{
  (e: 'update:show', show: boolean): void
}>()

const close = () => {

  emits('update:show', false)

}

</script>

<template>
  <div v-show="show" class="fixed inset-0 flex items-center justify-center" @click.self="close">
    <div
      class="bg-gray-100 max-w-full w-96 max-h-full h-96 rounded shadow animate-[bounce_0.5s_linear_0s_0.5]"
    >
      <div
        class="flex items-center justify-between pl-4 py-2 pr-2 border-b-2 border-rose-300 shadow"
      >
        <div class="modal-title font-semibold text-xl">{{ title }}</div>
        <button class="modal-close material-icons" @click="close">close</button>
      </div>
      <div class="modal-content p-4">
        <slot></slot>
      </div>
    </div>
  </div>
</template>