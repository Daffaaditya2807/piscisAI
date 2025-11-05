<script setup lang="ts">
import IconHero from '@/ui/components/IconHero.vue'
import CloudLayer from '@/ui/components/CloudLayer.vue'
import detech from '@/assets/hero/detech.png'
</script>

<style scoped>
.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Membuat beberapa garis diagonal transparan. 
    Ini adalah bagian yang paling rumit, Anda bisa menyesuaikan 'rgba'
    untuk kejelasan dan '10%'/'11%' untuk ketebalan sinar.
  */
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
  background-size: 300px 300px; /* Mengatur jarak antar sinar */
  opacity: 0.3; /* Membuatnya sangat samar */
  z-index: 1; /* Di atas gradasi, tapi di bawah awan & konten */
  pointer-events: none; /* Agar tidak bisa diklik */
}
.hero-content {
  position: relative;
  z-index: 10; /* Paling atas */
}

.shimmer-button {
  position: relative;
  overflow: hidden;
}

.shimmer-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

.shimmer-button::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  padding: 2px;
  background: linear-gradient(45deg, #fb923c, #ea580c, #fb923c);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  animation: glow-pulse 2s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.8;
  }
}
</style>

<template>
  <section
    id="beranda"
    class="hero-section relative h-screen min-h-[700px] w-full overflow-hidden bg-gradient-to-b from-white to-[#FFDABE]"
  >
    <CloudLayer />
    <div
      class="bg-ray absolute w-[408px] h-[1122px] right-[-20%] top-[-40%] bg-gradient-to-br from-white/40 to-transparent rotate-[-45deg] z-2 blur-xl pointer-events-none"
    ></div>
    <div
      class="bg-ray absolute w-[408px] h-[1122px] left-[10%] top-[-40%] bg-gradient-to-br from-white/40 to-transparent rotate-[-45deg] z-2 blur-xl pointer-events-none"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-full h-[318px] bg-gradient-to-t from-white to-transparent z-9 pointer-events-none"
    ></div>

    <div
      class="hero-content flex h-full w-full items-center justify-start md:justify-center flex-col pt-28 md:pt-0 md:mt-36 lg:mt-40 px-4 sm:px-6 lg:px-8"
    >
      <div class="text-center text-gray-800">
        <h1
          class="text-3xl md:text-5xl lg:text-6xl max-w-4xl font-semibold font-jakarta mx-auto leading-tight"
        >
          Kenali Setiap Spesies Ikan dengan
          <span class="text-orange-500 font-jakarta font-semibold">Kecerdasan Buatan</span>
        </h1>
        <p class="mt-2 text-xs md:text-lg text-gray-600 max-w-2xl mx-auto">
          Unggah satu foto — biarkan PiscisAI menganalisis dan memprediksi jenis ikan dengan AI.
        </p>
        <button
          class="shimmer-button mt-8 rounded-full bg-gradient-to-b from-[#fb923c] to-[#ea580c] px-6 py-3 font-semibold text-white shadow-[0_10px_30px_rgba(234,88,12,0.4)] hover:shadow-[0_15px_40px_rgba(234,88,12,0.6)] hover:scale-[1.05] transition-all duration-300"
          onclick="document.getElementById('ai-checker').scrollIntoView({ behavior: 'smooth' })"
        >
          Mulai Sekarang
        </button>
      </div>

      <div class="relative w-full max-w-4xl mx-auto mt-24 md:mt-10">
        <div
          class="relative w-full max-w-4xl rounded-2xl shadow-lg backdrop-blur-md bg-white/40 aspect-[16/9]"
        >
          <img
            :src="detech"
            alt="contoh deteksi"
            class="absolute inset-0 w-full h-full md:h-auto object-cover md:object-contain rounded-2xl"
          />
        </div>

        <IconHero
          :rotation="30.61"
          class="absolute left-[4%] top-[-5%] md:left-[4%] md:top-[-5%] lg:left-[5%] lg:top-[-5%]"
        >
          🐟
        </IconHero>
        <IconHero
          :rotation="15.55"
          class="absolute right-[4%] top-[-5%] md:right-[4%] md:top-[-10%] lg:right-[5%] lg:top-[-10%]"
        >
          👇
        </IconHero>
        <IconHero
          :rotation="-11.99"
          class="absolute left-[-2%] top-[45%] md:left-[-2%] md:top-[35%] lg:left-[-5%] lg:top-[30%]"
        >
          👌
        </IconHero>
        <IconHero
          :rotation="25.23"
          class="absolute right-[-2%] top-[45%] md:right-[-2%] md:top-[35%] lg:right-[-5%] lg:top-[30%]"
        >
          💦
        </IconHero>
      </div>
    </div>
  </section>
</template>
