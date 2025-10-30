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

.cloud {
  position: absolute;
  z-index: 5;
  filter: blur(1px);
  opacity: 0.8;

  mix-blend-mode: screen;
}

.hero-content {
  position: relative;
  z-index: 10; /* Paling atas */
}

/* (Opsional) Animasi awan bergerak */
@keyframes drift {
  from {
    transform: translateX(-20px);
  }
  to {
    transform: translateX(20px);
  }
}

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

<script setup lang="ts">
import { ref } from 'vue'
import cloud1 from '@/assets/hero/cloud1.png'
import cloud2 from '@/assets/hero/cloud2.png'
import cloud3 from '@/assets/hero/cloud3.png'
import cloud4 from '@/assets/hero/cloud4.png'
import cloud5 from '@/assets/hero/cloud5.png'
import cloud6 from '@/assets/hero/cloud6.png'
import detech from '@/assets/hero/detech.png'
import load from '@/assets/fitur/load.png'
import predict from '@/assets/fitur/predict.png'
import chatai from '@/assets/fitur/chatai.png'
import logo from '@/assets/logo.png'
import FloatingNav from '@/ui/components/FloatingNav.vue'
import IconHero from '@/ui/components/IconHero.vue'

const features = ref([
  {
    title: 'Klasifikasi Gambar Otomatis',
    description: 'Unggah foto ikan dan dapatkan hasil prediksi instan.',
    placeholder: load,
  },
  {
    title: 'Confidence Bar',
    description: 'Visualisasi skor untuk setiap label dalam bentuk grafik.',
    placeholder: predict,
  },
  {
    title: 'Ekspor Hasil',
    description: 'Simpan hasil prediksi sebagai laporan PNG/CSV untuk analisis.',
    placeholder: chatai,
  },
])

const fileInput = ref<HTMLInputElement | null>(null)
const previewImage = ref<string | null>(null)
const selectedFileName = ref<string>('')
const isDragging = ref(false)

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file && file.type.startsWith('image/')) {
    selectedFileName.value = file.name
    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  const file = event.dataTransfer?.files[0]
  if (file && file.type.startsWith('image/')) {
    selectedFileName.value = file.name
    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const removeImage = () => {
  previewImage.value = null
  selectedFileName.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col overflow-y-auto">
    <FloatingNav />
    <main>
      <section
        id="beranda"
        class="hero-section relative h-screen min-h-[700px] w-full overflow-hidden bg-gradient-to-b from-white to-[#FFDABE]"
      >
        <img :src="cloud1" alt="Awan latar" class="cloud bottom-[0%] left-[0%]" />
        <img :src="cloud2" alt="Awan latar" class="cloud bottom-[0%] right-[0%]" />
        <img :src="cloud3" alt="Awan latar" class="cloud top-[0%] left-[0%]" />
        <img :src="cloud4" alt="Awan latar" class="cloud bottom-[0%] right-[0%]" />
        <img :src="cloud5" alt="Awan latar" class="cloud top-[10%] bottom-[10%] left-[0%]" />
        <img :src="cloud6" alt="Awan latar" class="cloud top-[20%] bottom-[20%] right-[5%]" />
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
              Unggah satu foto — biarkan PiscisAI menganalisis dan memberi tahu jenis ikan secara
              cepat, akurat, dan transparan.
            </p>
            <button
              class="mt-8 rounded-full bg-orange-500 px-6 py-3 font-semibold text-white shadow-lg hover:bg-orange-600 transition-colors"
            >
              Mulai Sekarang
            </button>
          </div>

          <div class="relative w-full max-w-4xl mx-auto mt-10 md:mt-10">
            <div
              class="relative w-full max-w-4xl rounded-2xl shadow-lg backdrop-blur-md bg-white/40 aspect-[16/9]"
            >
              <img
                :src="detech"
                alt="contoh deteksi"
                class="absolute inset-0 w-full h-full md:h-auto object-cover md:object-contain rounded-2xl pointer-events-none"
              />
            </div>

            <IconHero
              :rotation="30.61"
              class="absolute left-[4%] top-[-5%] md:left-[4%] md:top-[-5%] lg:left-[5%] lg:top-[-5%] pointer-events-none"
            >
              🐟
            </IconHero>
            <IconHero
              :rotation="15.55"
              class="absolute right-[4%] top-[-5%] md:right-[4%] md:top-[-10%] lg:right-[5%] lg:top-[-10%] pointer-events-none"
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
      <section
        id="fitur"
        class="relative bg-gray-50 py-1 sm:py-10 md:py-20 overflow-hidden px-4 sm:px-6 lg:px-8"
      >
        <div class="relative z-10 max-w-7xl mx-auto">
          <div class="text-center">
            <h2 class="text-3xl md:text-4xl font-semibold font-jakarta text-gray-800">
              Fitur yang Membuat <span class="text-orange-500">Kami Berbeda</span>
            </h2>
            <p class="mt-3 text-base font-jakarta text-gray-600 max-w-2xl mx-auto">
              Semua yang Anda butuhkan untuk mengenali ikan dengan cepat.
            </p>
          </div>

          <div class="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
            <div
              v-for="feature in features"
              :key="feature.title"
              class="relative flex flex-col h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl shadow-lg bg-gradient-to-b from-white to-[#FFDABE] overflow-hidden"
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

              <div
                class="relative z-0 flex flex-grow items-center justify-center pb-6 px-4 md:px-6"
              >
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
      <section id="ai-checker">
        <!-- Konten untuk bagian AI Checker akan ditambahkan di sini nanti -->
        <!-- Placeholder untuk bagian AI Checker -->
        <div class="relative z-10 max-w-7xl mx-auto"></div>
        <div
          class="relative text-center bg-gradient-to-b from-white to-[#FFDABE] overflow-hidden py-20"
        >
          <img
            :src="cloud1"
            alt="Awan latar"
            class="absolute cloud bottom-[0%] left-[0%] pointer-events-none"
          />
          <img
            :src="cloud2"
            alt="Awan latar"
            class="cloud top-[0%] right-[0%] pointer-events-none"
          />
          <h2 class="text-3xl md:text-4xl font-semibold font-jakarta text-gray-800">
            Identifikasi Dari <span class="text-orange-500">Gambar</span>
          </h2>
          <p class="mt-3 text-base font-jakarta text-gray-600 max-w-2xl mx-auto">
            Unggah satu foto untuk melihat Top-5 prediksi dan confidence.
          </p>
          <div
            class="absolute bottom-0 left-0 w-full h-[318px] bg-gradient-to-t from-white to-transparent z-9 pointer-events-none"
          ></div>
          <div class="mt-12 max-w-3xl mx-auto">
            <div class="shadow-lg backdrop-blur-md bg-white/20 rounded-2xl p-6">
              <div
                @drop.prevent="handleDrop"
                @dragover.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false"
                class="relative rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden"
                :class="isDragging ? 'border-orange-500 bg-orange-50' : 'border-gray-300 bg-white'"
              >
                <input
                  type="file"
                  ref="fileInput"
                  @change="handleFileSelect"
                  accept="image/*"
                  class="hidden"
                />

                <div
                  v-if="!previewImage"
                  @click="fileInput?.click()"
                  class="flex flex-col items-center justify-center py-16 px-6 cursor-pointer"
                >
                  <div
                    class="w-20 h-20 mb-4 rounded-full bg-orange-100 flex items-center justify-center"
                  >
                    <svg
                      class="w-10 h-10 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <p class="text-lg font-semibold font-jakarta text-gray-800 mb-2">
                    Klik untuk unggah atau drag & drop
                  </p>
                  <p class="text-sm text-gray-500">PNG, JPG, JPEG hingga 10MB</p>
                </div>

                <div v-else class="relative">
                  <img
                    :src="previewImage"
                    alt="Preview"
                    class="w-full h-auto max-h-96 object-contain"
                  />
                  <button
                    @click.stop="removeImage"
                    class="absolute top-4 right-4 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div class="p-4 bg-gray-50 border-t">
                    <p class="text-sm text-gray-600 truncate">{{ selectedFileName }}</p>
                  </div>
                </div>
              </div>

              <button
                v-if="previewImage"
                class="mt-6 w-full rounded-full bg-orange-500 px-8 py-4 font-semibold text-white shadow-lg hover:bg-orange-600 transition-colors text-lg"
              >
                Analisis Gambar
              </button>
            </div>
          </div>
        </div>
      </section>
      <section id="tentang">
        <!-- Konten untuk bagian Tentang akan ditambahkan di sini nanti -->
        <!-- Placeholder untuk bagian Tentang -->
        <div class="relative z-10 max-w-7xl mx-auto pt-10"></div>
        <div class="relative max-w-6xl mx-auto text-center overflow-hidden py-20">
          <h2 class="text-3xl md:text-6xl font-jakarta text-gray-800">
            PiscisAI menggabungkan visi komputer dan riset perikanan untuk mengidentifikasi spesies
            ikan dari foto secara cepat dan akurat. Seluruh proses berjalan langsung di browser<span
              class="shimmer-text"
            >
              —tanpa unggah ke server—agar privasi tetap terjaga. Kami membantu budidaya,
              laboratorium, dan pembelajaran membuat keputusan berbasis data.</span
            >
          </h2>
        </div>
      </section>
    </main>

    <footer class="bg-white py-12 border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between gap-8">
          <!-- Logo & Description -->
          <div class="flex-shrink-0">
            <div class="flex items-center mb-4">
              <img :src="logo" alt="PiscisAI Logo" class="h-8 w-auto" />
            </div>
            <p class="text-gray-600 text-sm max-w-xs">
              Identifikasi spesies ikan dengan teknologi AI secara cepat dan akurat.
            </p>
          </div>

          <!-- Menu & Contact Wrapper -->
          <div class="flex flex-col md:flex-row gap-8 md:gap-24">
            <!-- Quick Links -->
            <div>
              <h3 class="text-lg font-semibold mb-4 font-jakarta text-gray-900">Menu</h3>
              <ul class="space-y-2">
                <li>
                  <a
                    href="#beranda"
                    class="text-gray-600 hover:text-orange-500 transition-colors text-sm"
                  >
                    Beranda
                  </a>
                </li>
                <li>
                  <a
                    href="#fitur"
                    class="text-gray-600 hover:text-orange-500 transition-colors text-sm"
                  >
                    Fitur
                  </a>
                </li>
                <li>
                  <a
                    href="#ai-checker"
                    class="text-gray-600 hover:text-orange-500 transition-colors text-sm"
                  >
                    AI Checker
                  </a>
                </li>
                <li>
                  <a
                    href="#tentang"
                    class="text-gray-600 hover:text-orange-500 transition-colors text-sm"
                  >
                    Tentang
                  </a>
                </li>
              </ul>
            </div>

            <!-- Contact -->
            <div>
              <h3 class="text-lg font-semibold mb-4 font-jakarta text-gray-900">Kontak</h3>
              <ul class="space-y-2">
                <li class="flex items-center text-gray-600 text-sm">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  info@piscisai.com
                </li>
                <li class="flex items-center text-gray-600 text-sm">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Jakarta, Indonesia
                </li>
              </ul>

              <!-- Social Media -->
              <div class="flex space-x-4 mt-6">
                <a href="#" class="text-gray-600 hover:text-orange-500 transition-colors">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                    />
                  </svg>
                </a>
                <a href="#" class="text-gray-600 hover:text-orange-500 transition-colors">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    />
                  </svg>
                </a>
                <a href="#" class="text-gray-600 hover:text-orange-500 transition-colors">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div
          class="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p class="text-gray-600 text-sm">© 2024 PiscisAI. All rights reserved.</p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="text-gray-600 hover:text-orange-500 transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" class="text-gray-600 hover:text-orange-500 transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
