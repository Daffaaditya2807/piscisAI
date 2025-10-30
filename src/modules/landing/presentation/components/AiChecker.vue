<script setup lang="ts">
import { useImageDrop } from '../composables/useImageDrop'
import cloud1 from '@/assets/hero/cloud1.png'
import cloud2 from '@/assets/hero/cloud2.png'

const dz = useImageDrop()
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
      <img :src="cloud2" alt="Awan latar" class="cloud top-[0%] right-[0%] pointer-events-none" />
      <h2 class="text-3xl md:text-4xl font-semibold font-jakarta text-gray-800">
        Identifikasi Dari <span class="text-orange-500">Gambar</span>
      </h2>
      <p class="mt-3 text-base font-jakarta text-gray-600 max-w-2xl mx-auto">
        Unggah satu foto untuk melihat Top-5 prediksi dan confidence.
      </p>
      <div
        class="absolute bottom-0 left-0 w-full h-[318px] bg-gradient-to-t from-white to-transparent z-0 pointer-events-none"
      ></div>
      <div class="mt-12 max-w-3xl mx-auto">
        <div class="shadow-lg backdrop-blur-md bg-white/20 rounded-2xl p-6">
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
                @click.stop="dz.removeImage"
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
                <p class="text-sm text-gray-600 truncate">{{ dz.selectedFileName.value }}</p>
              </div>
            </div>
          </div>

          <button
            v-if="dz.previewImage.value"
            class="mt-6 w-full rounded-full bg-gradient-to-b from-[#fb923c] to-[#ea580c] px-8 py-4 font-semibold text-white shadow-[0_10px_30px_rgba(234,88,12,0.4)] hover:shadow-[0_15px_40px_rgba(234,88,12,0.5)] hover:scale-[1.02] transition-all duration-300 text-lg"
          >
            Analisis Gambar
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
