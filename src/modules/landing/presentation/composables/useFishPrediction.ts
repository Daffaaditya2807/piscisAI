// src/modules/landing/presentation/composables/useFishPrediction.ts
import { ref, onMounted } from 'vue'
import type * as TF from '@tensorflow/tfjs'
import type { TMModel } from '@teachablemachine/image'

export interface Prediction {
  name: string
  confidence: number
}

export function useFishPrediction() {
  const isLoading = ref(false)
  const showResults = ref(false)
  const predictionResults = ref<Prediction[]>([])
  const model = ref<TMModel | null>(null)
  const modelLoaded = ref(false)
  const modelError = ref<string | null>(null)

  let tmImageMod: { load: (m: string, md?: string) => Promise<TMModel>; tf?: typeof TF } | null =
    null
  let tf: typeof TF | null = null

  const loadModel = async () => {
    try {
      // 1) Dynamic import TM
      tmImageMod = await import('@teachablemachine/image')

      // 2) Ambil TFJS yang dipakai TM (satu instance engine)
      tf = tmImageMod.tf ?? (await import('@tensorflow/tfjs'))
      await tf.ready()

      // 4) Load model
      const base = import.meta.env.BASE_URL || '/'
      const modelURL = `${base}model/model.json`
      const metadataURL = `${base}model/metadata.json`
      // freeze mencegah HMR/accidental mutation
      model.value = Object.freeze(await tmImageMod.load(modelURL, metadataURL))

      modelLoaded.value = true
      modelError.value = null
    } catch (err: unknown) {
      console.error('Error loading model:', err)
      modelLoaded.value = false
      modelError.value = (err as Error)?.message || 'Gagal memuat model'
    }
  }

  onMounted(loadModel)

  const handlePredict = async (
    imageEl: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
  ) => {
    if (!model.value) {
      alert('Model belum siap, mohon tunggu...')
      return
    }

    // Add 2 second delay before showing loading widget
    // await new Promise(resolve => setTimeout(resolve, 2000))

    isLoading.value = true
    showResults.value = false
    predictionResults.value = []
    try {
      const preds = await model.value.predict(imageEl)
      const sorted = preds
        .map((p: { className: string; probability: number }) => ({
          name: p.className,
          confidence: parseFloat((p.probability * 100).toFixed(2)),
        }))
        .sort((a: Prediction, b: Prediction) => b.confidence - a.confidence)
        .slice(0, 5)
      predictionResults.value = sorted
      showResults.value = true
    } catch (e) {
      console.error('Error during prediction:', e)
      alert('Terjadi kesalahan saat memprediksi gambar')
    } finally {
      isLoading.value = false
    }
  }

  const resetPrediction = () => {
    showResults.value = false
    isLoading.value = false
    predictionResults.value = []
  }

  const handleDownload = () => {
    if (!predictionResults.value.length) return
    const csv = [
      'Ranking,Nama Ikan,Confidence (%)',
      ...predictionResults.value.map((r, i) => `${i + 1},${r.name},${r.confidence}`),
    ].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `fish-prediction-${Date.now()}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return {
    isLoading,
    showResults,
    predictionResults,
    modelLoaded,
    modelError,
    handlePredict,
    resetPrediction,
    handleDownload,
  }
}
