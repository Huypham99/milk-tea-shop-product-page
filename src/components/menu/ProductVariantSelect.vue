<template>
  <div v-if="variants?.length" class="mb-6">
    <div class="space-y-6">
      <div v-for="variant in variants" :key="variant.type" class="space-y-3">
        <!-- Variant Type Name -->
        <div class="flex items-center gap-2">
          <h4 class="font-medium text-gray-800">{{ variant.name }}</h4>
          <span v-if="variant.required" class="text-red-500 text-sm">*</span>
        </div>

        <!-- Variant Options -->
        <div class="grid grid-cols-2 gap-3">
          <button v-for="option in variant.options" :key="option.id"
            @click="selectVariantOption(variant.type, option.id)" :disabled="!option.available"
            class="p-3 border rounded-lg text-left transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            :class="{
              'border-violet-500 bg-violet-50 text-primary-700': selectedVariants[variant.type] === option.id,
              'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50': selectedVariants[variant.type] !== option.id && option.available,
              'border-gray-200 bg-gray-50 text-gray-400': !option.available
            }">
            <div class="flex items-center justify-between">
              <span class="font-medium">{{ option.name }}</span>
              <div class="flex items-center gap-2">
                <span v-if="option.priceModifier > 0" class="text-sm text-green-600 font-medium">
                  +{{ formatPrice(option.priceModifier) }}
                </span>
                <div class="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all" :class="{
                  'border-violet-500 bg-violet-500': selectedVariants[variant.type] === option.id,
                  'border-gray-300': selectedVariants[variant.type] !== option.id
                }">
                  <Check v-if="selectedVariants[variant.type] === option.id"
                    class="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Check } from 'lucide-vue-next'
import type { ProductVariant } from '@/types/menu'

interface Props {
  variants: ProductVariant[] | undefined
  selectedVariants: Record<string, string>
}

interface Emits {
  (e: 'variant-selected', variantType: string, optionId: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Methods
const selectVariantOption = (variantType: string, optionId: string) => {
  emit('variant-selected', variantType, optionId)
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}
</script>
