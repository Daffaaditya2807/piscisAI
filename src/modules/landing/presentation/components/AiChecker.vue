<script setup lang="ts">
import { useImageDrop } from '../composables/useImageDrop'
import { useFishPrediction } from '../composables/useFishPrediction'
import cloud1 from '@/assets/hero/cloud1.png'
import cloud2 from '@/assets/hero/cloud2.png'

const dz = useImageDrop()
const prediction = useFishPrediction()

// Function to handle prediction with image element
const handlePredictClick = async () => {
  if (!dz.previewImage.value) return

  // Set loading state immediately when button is clicked
  prediction.isLoading.value = true
  prediction.showResults.value = false
  prediction.predictionResults.value = []

  try {
    // Create an image element from the preview
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = dz.previewImage.value

    // Wait for image to load before predicting
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve()
      img.onerror = () => reject(new Error('Gagal memuat gambar'))
    })

    // Convert image to canvas for better compatibility
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      throw new Error('Tidak dapat membuat canvas context')
    }

    // Set canvas size to match Teachable Machine expected size (224x224)
    canvas.width = 224
    canvas.height = 224

    // Draw image on canvas with resize
    ctx.drawImage(img, 0, 0, 224, 224)

    // Predict using canvas
    await prediction.handlePredict(canvas)
  } catch (error) {
    console.error('Error during prediction:', error)
    alert(error instanceof Error ? error.message : 'Terjadi kesalahan saat memprediksi gambar')
    prediction.isLoading.value = false
  }
}

// Reset function - reset both image and prediction
const handleReset = () => {
  prediction.resetPrediction()
  dz.removeImage()
}
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
        class="absolute cloud hidden xl:flex bottom-[0%] left-[0%] pointer-events-none"
      />
      <img
        :src="cloud2"
        alt="Awan latar"
        class="cloud hidden xl:flex top-[0%] right-[0%] pointer-events-none"
      />
      <h2
        class="text-3xl md:text-4xl font-semibold font-jakarta text-gray-800"
        data-aos="fade-up"
      >
        Identifikasi Dari <span class="text-orange-500">Gambar</span>
      </h2>
      <p
        class="mt-3 px-3 md:px-0 text-base font-jakarta text-gray-600 max-w-2xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Unggah satu foto untuk melihat Top-5 prediksi dan skor keputusannya. AI hanya dapat
        memprediksi spesies ikan berikut :
        <span class="italic text-gray-800"
          >Bandeng, Belanak, Bulan-Bulan, Ikan Mas India, Ikas Mas Koki, Ikan Mas Perak, Ikan Mas
          Rumput, Kakap, Ketang Laut, Nila, Patin, Senangin, Wader Bintik Hitam.</span
        >
      </p>
      <div
        class="absolute bottom-0 left-0 w-full h-[318px] bg-gradient-to-t from-white to-transparent z-0 pointer-events-none"
      ></div>
      <div class="mt-0 md:mt-12 max-w-3xl mx-auto">
        <!-- Upload Section -->
        <div
          v-if="!prediction.showResults.value"
          class="backdrop-blur-md bg-white/20 rounded-2xl p-6"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div
            @drop.prevent="dz.handleDrop"
            @dragover.prevent="dz.isDragging.value = true"
            @dragleave.prevent="dz.isDragging.value = false"
            class="relative rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden"
            :class="
              dz.isDragging.value ? 'border-orange-500 bg-orange-50' : 'border-gray-300 bg-white'
            "
          >
            <input
              type="file"
              :ref="dz.fileInput"
              @change="dz.handleFileSelect"
              accept="image/*"
              class="hidden"
            />

            <div
              v-if="!dz.previewImage.value"
              @click="dz.fileInput.value?.click()"
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
                <span class="text-orange-500">Klik Ini</span> untuk unggah atau
                <span class="text-orange-500">drag & drop</span>
              </p>
              <p class="text-sm text-gray-500">PNG, JPG, JPEG hingga 10MB</p>
            </div>

            <div v-else class="relative">
              <img
                :src="dz.previewImage.value"
                alt="Preview"
                class="w-full h-auto max-h-96 object-contain"
              />
              <button
                v-if="!prediction.isLoading.value"
                @click.stop="dz.removeImage"
                class="absolute top-4 right-4 w-10 h-10 bg-gray-200 hover:bg-red-500 text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg group z-10"
                title="Tutup"
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
                <p class="text-sm text-gray-600 truncate">{{ dz.selectedFileName.value }}</p>
              </div>
            </div>
          </div>

          <!-- Loading State -->
          <div
            v-if="prediction.isLoading.value"
            class="mt-6 flex flex-col items-center justify-center py-8"
          >
            <div class="relative w-20 h-20 mb-4">
              <div
                class="absolute w-20 h-20 border-4 border-orange-200 rounded-full animate-ping"
              ></div>
              <div
                class="absolute w-20 h-20 border-4 border-t-orange-500 border-r-orange-500 border-b-transparent border-l-transparent rounded-full animate-spin"
              ></div>
            </div>
            <p class="text-lg font-semibold text-gray-700 animate-pulse">
              Sedang menganalisis gambar...
            </p>
            <p class="text-sm text-gray-500 mt-2">Mohon tunggu sebentar</p>
          </div>

          <!-- Predict Button -->
          <button
            v-else-if="dz.previewImage.value"
            @click="handlePredictClick"
            :disabled="!prediction.modelLoaded.value"
            class="mt-6 w-full rounded-full bg-gradient-to-b from-[#fb923c] to-[#ea580c] px-8 py-4 font-semibold text-white shadow-[0_10px_30px_rgba(234,88,12,0.4)] hover:shadow-[0_15px_40px_rgba(234,88,12,0.5)] hover:scale-[1.02] transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ prediction.modelLoaded.value ? 'Prediksi Sekarang' : 'Memuat Model...' }}
          </button>
        </div>

        <!-- Results Section -->
        <div
          v-else
          class="relative mt-5 md:mt-0 backdrop-blur-md bg-white/90 rounded-2xl p-8"
          data-aos="fade-up"
        >
          <!-- Close Button -->
          <button
            @click="handleReset"
            class="absolute top-4 right-4 w-10 h-10 bg-gray-200 hover:bg-red-500 text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg group z-10"
            title="Tutup"
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

          <h3 class="text-2xl md:text-3xl font-bold font-jakarta text-gray-800 mb-6">
            Prediksi Top 5
          </h3>

          <div class="grid md:grid-cols-2 gap-6 mb-8">
            <!-- Fish Image -->
            <div class="rounded-xl overflow-hidden shadow-md">
              <img
                :src="dz.previewImage.value || ''"
                alt="Fish Image"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Predictions List -->
            <div class="space-y-4">
              <div
                v-for="(result, index) in prediction.predictionResults.value"
                :key="index"
                class="transition-all duration-300 hover:scale-[1.02]"
                :data-aos="'fade-left'"
                :data-aos-delay="index * 100"
              >
                <div class="flex justify-between items-center mb-1">
                  <span class="font-semibold text-gray-700 font-jakarta">{{ result.name }}</span>
                  <span class="font-bold text-gray-800">{{ result.confidence }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    class="h-full rounded-full transition-all duration-1000 ease-out"
                    :class="index === 0 ? 'bg-orange-500' : 'bg-orange-400'"
                    :style="{ width: result.confidence + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Download Button -->
          <button
            @click="prediction.handleDownload"
            class="w-full rounded-full bg-gradient-to-b from-[#fb923c] to-[#ea580c] px-8 py-4 font-semibold text-white shadow-[0_10px_30px_rgba(234,88,12,0.4)] hover:shadow-[0_15px_40px_rgba(234,88,12,0.5)] hover:scale-[1.02] transition-all duration-300 text-lg"
          >
            Unduh Hasil Sekarang
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
