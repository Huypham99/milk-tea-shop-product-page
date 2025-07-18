<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black opacity-50 transition-opacity" />

    <!-- Modal Content -->
    <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full transform transition-all">
      <div class="p-6">
        <!-- Icon -->
        <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
          <AlertTriangle class="w-6 h-6 text-red-600" />
        </div>

        <!-- Title -->
        <h3 class="text-lg font-semibold text-gray-900 text-center mb-2">
          {{ title }}
        </h3>

        <!-- Message -->
        <p class="text-gray-600 text-center mb-6">
          {{ message }}
        </p>

        <!-- Buttons -->
        <div class="flex gap-3">
          <button
            @click="$emit('cancel')"
            class="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            {{ cancelText }}
          </button>
          <button
            @click="$emit('confirm')"
            class="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AlertTriangle } from 'lucide-vue-next'

interface Props {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
}

interface Emits {
  (e: 'confirm'): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  confirmText: 'Xác nhận',
  cancelText: 'Hủy'
})

const emit = defineEmits<Emits>()
</script>
