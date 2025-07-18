<template>
  <div class="space-y-1/2">
    <div v-for="i in 5" :key="i"
      class="w-full flex items-center justify-between px-1 py-2 rounded-lg bg-white border-2 border-transparent mb-1">
      <div class="flex items-center space-x-3">
        <!-- Icon skeleton -->
        <div class="w-4 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
        <div>
          <!-- Category name skeleton -->
          <div class="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Pulse animation for skeleton */
@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Shimmer effect alternative */
.shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }

  100% {
    background-position: 200% 0;
  }
}
</style>
