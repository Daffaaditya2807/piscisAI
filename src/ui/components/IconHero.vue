<template>
  <div
    class="icon-hero flex items-center justify-center w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[80px] md:h-[80px] lg:w-[91.21px] lg:h-[91.21px] bg-gradient-to-br from-[#FB923C] to-[#FF832A] rounded-[10px] md:rounded-[20px] shadow-[inset_3px_3px_10px_rgba(0,0,0,0.2)]"
    :style="containerStyle"
  >
    <span
      class="text-white items-center justify-center mx-auto text-2xl md:text-4xl lg:text-5xl font-light"
      :style="contentStyle"
    >
      <slot>≈</slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 1. Tentukan props yang diterima (dengan TypeScript)
interface Props {
  rotation?: number // Tanda '?' berarti prop ini opsional
}

// 2. Gunakan withDefaults untuk memberi nilai default jika prop tidak diberikan
const props = withDefaults(defineProps<Props>(), {
  rotation: 0, // Nilai default jika 'rotation' tidak diset
})

// 3. Buat computed property untuk style container utama
const containerStyle = computed(() => ({
  '--rotation': `${props.rotation}deg`,
}))

// 4. Buat computed property untuk memutar balik konten di dalam slot
const contentStyle = computed(() => ({
  transform: `rotate(-${props.rotation}deg)`,
}))
</script>

<style scoped>
@keyframes floating {
  0%, 100% {
    transform: translateY(0px) rotate(var(--rotation));
  }
  50% {
    transform: translateY(-15px) rotate(var(--rotation));
  }
}

.icon-hero {
  animation: floating 3s ease-in-out infinite;
  --rotation: 0deg;
}
</style>
