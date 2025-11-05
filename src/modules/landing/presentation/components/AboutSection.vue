<style scoped>
/* Shimmering text effect */
@keyframes shimmer {
  0% {
    background-position: -200% -200%;
  }
  100% {
    background-position: 200% 200%;
  }
}

.shimmer-text {
  background: linear-gradient(135deg, #d1d5db 0%, #ffffff 50%, #d1d5db 100%);
  background-size: 200% 200%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 5s linear infinite;
}
</style>
<template>
  <section id="tentang">
    <div class="relative z-10 max-w-7xl mx-auto pt-10"></div>
    <div class="relative max-w-6xl mx-auto text-center overflow-hidden py-20">
      <h2
        class="text-3xl md:text-6xl font-jakarta text-gray-800"
        data-aos="fade-up"
        data-aos-duration="1200"
      >
        PiscisAI menggabungkan visi komputer dan riset perikanan untuk mengidentifikasi spesies ikan
        dari foto secara cepat dan akurat. Seluruh proses berjalan langsung di browser<span
          class="shimmer-text"
        >
          —tanpa unggah ke server—agar privasi tetap terjaga. Kami membantu budidaya, laboratorium,
          dan pembelajaran membuat keputusan berbasis data.</span
        >
      </h2>
    </div>
  </section>
</template>
