<template>
  <div class="bg-white rounded-xl shadow-card overflow-hidden border-2 border-gray-200">
    <!-- Image Skeleton -->
    <div class="h-48 bg-gray-200 animate-pulse"></div>

    <!-- Content Skeleton -->
    <div class="p-4 space-y-3">
      <!-- Product Name Skeleton -->
      <div class="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>

      <!-- Price Skeleton -->
      <div class="flex items-center space-x-2">
        <div class="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
        <div class="h-3 bg-gray-200 rounded animate-pulse w-1/4"></div>
      </div>

      <!-- Stock Status Skeleton -->
      <div class="flex items-center space-x-1">
        <div class="w-2 h-2 bg-gray-200 rounded-full animate-pulse"></div>
        <div class="h-3 bg-gray-200 rounded animate-pulse w-1/4"></div>
      </div>

      <!-- Details Skeleton -->
      <div class="flex items-center justify-between">
        <div class="h-3 bg-gray-200 rounded animate-pulse w-1/5"></div>
        <div class="h-3 bg-gray-200 rounded animate-pulse w-1/5"></div>
        <div class="h-3 bg-gray-200 rounded animate-pulse w-1/5"></div>
      </div>

      <!-- Button Skeleton -->
      <div class="h-10 bg-gray-200 rounded-lg animate-pulse mt-4"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No props or logic needed for skeleton
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
