<!-- src/ui/components/CloudLayer.vue -->
<script setup lang="ts">
import cloud1 from '@/assets/hero/cloud1.png'
import cloud2 from '@/assets/hero/cloud2.png'
import cloud3 from '@/assets/hero/cloud3.png'
import cloud4 from '@/assets/hero/cloud4.png'
import cloud5 from '@/assets/hero/cloud5.png'
import cloud6 from '@/assets/hero/cloud6.png'
</script>

<template>
  <div class="pointer-events-none">
    <div class="hero-rays" />
    <img :src="cloud1" class="cloud bottom-[0%] left-[0%]" />
    <img :src="cloud2" class="cloud bottom-[0%] right-[0%]" />
    <img :src="cloud3" class="cloud top-[0%] left-[0%]" />
    <img :src="cloud4" class="cloud bottom-[0%] right-[0%]" />
    <img :src="cloud5" class="cloud top-[10%] left-[0%]" />
    <img :src="cloud6" class="cloud top-[20%] right-[5%]" />
  </div>
</template>

<style scoped>
.hero-rays {
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0.3;
  background: linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0.15) 10%,
    transparent 11%,
    transparent 30%,
    rgba(255, 255, 255, 0.15) 31%,
    transparent 32%,
    transparent 60%,
    rgba(255, 255, 255, 0.15) 61%,
    transparent 62%,
    transparent 100%
  );
  background-size: 300px 300px;
}
.cloud {
  position: absolute;
  z-index: 5;
  filter: blur(1px);
  opacity: 0.8;
  mix-blend-mode: screen;
}
</style>
