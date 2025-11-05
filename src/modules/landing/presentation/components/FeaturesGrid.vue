<script setup lang="ts">
import { ref } from 'vue'
import cloud1 from '@/assets/hero/cloud1.png'
import cloud2 from '@/assets/hero/cloud2.png'
import load from '@/assets/fitur/load.png'
import predict from '@/assets/fitur/predict.png'
import chatai from '@/assets/fitur/chatai.png'

const features = ref([
  {
    title: 'Klasifikasi Beberapa spesies Ikan',
    description: 'Unggah foto ikan dan dapatkan hasil prediksi instan.',
    placeholder: chatai,
  },
  {
    title: 'Skor Kepeputusan',
    description: 'Visualisasi skor untuk setiap label dalam bentuk grafik.',
    placeholder: predict,
  },
  {
    title: 'Ekspor Hasil',
    description: 'Simpan hasil prediksi sebagai laporan CSV untuk analisis.',
    placeholder: load,
  },
])
</script>

<style scoped>
.cloud {
  position: absolute;
  z-index: 5;
  filter: blur(1px);
  opacity: 0.8;

  mix-blend-mode: screen;
}
</style>

<template>
  <section
    id="fitur"
    class="relative bg-white py-1 sm:py-10 md:py-20 overflow-hidden px-4 sm:px-6 lg:px-8"
  >
    <div class="relative z-10 max-w-7xl mx-auto">
      <div class="text-center">
        <h2
          class="text-3xl md:text-4xl font-semibold font-jakarta text-gray-800"
          data-aos="fade-up"
        >
          Fitur yang Membuat <span class="text-orange-500">Kami Berbeda</span>
        </h2>
        <p class="mt-3 text-base font-jakarta text-gray-600 max-w-2xl mx-auto" data-aos="fade-up">
          Semua yang Anda butuhkan untuk mengenali ikan dengan cepat.
        </p>
      </div>

      <div class="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
        <div
          v-for="(feature, index) in features"
          :key="feature.title"
          class="relative flex flex-col h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl shadow-lg bg-gradient-to-b from-white to-[#FFDABE] overflow-hidden"
          data-aos="fade-up"
        >
          <img :src="cloud1" alt="Awan latar" class="cloud bottom-[0%] left-[0%]" />
          <img :src="cloud2" alt="Awan latar" class="cloud top-[0%] right-[0%]" />
          <div class="relative z-10 p-6">
            <div class="text-center md:text-left">
              <h3 class="text-xl font-semibold font-jakarta text-gray-900">
                {{ feature.title }}
              </h3>
              <p class="mt-1 text-sm text-gray-600">
                {{ feature.description }}
              </p>
            </div>
          </div>

          <div class="relative z-0 flex flex-grow items-center justify-center pb-6 px-4 md:px-6">
            <img
              :src="feature.placeholder"
              alt="Feature visual"
              class="w-full h-full object-contain max-h-[250px] md:max-h-[350px] lg:max-h-[450px]"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
