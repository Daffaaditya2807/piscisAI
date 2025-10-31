// src/modules/landing/presentation/composables/useFishPrediction.ts
import { ref } from 'vue'

export interface Prediction {
  name: string
  confidence: number
}

export function useFishPrediction() {
  const isLoading = ref(false)
  const showResults = ref(false)

  // Dummy prediction results
  const predictionResults = ref<Prediction[]>([
    { name: 'Nila', confidence: 61.77 },
    { name: 'Pearch Perak', confidence: 11.46 },
    { name: 'Ikan Mas Rumput laut', confidence: 9.46 },
    { name: 'Tambakan', confidence: 9.27 },
    { name: 'Ketang Laut', confidence: 5.97 },
  ])

  // Predict function
  const handlePredict = async () => {
    isLoading.value = true
    showResults.value = false

    // Simulate API call with 2 second delay
    // TODO: Replace with actual API call when model is ready
    await new Promise((resolve) => setTimeout(resolve, 2000))

    isLoading.value = false
    showResults.value = true
  }

  // Reset function
  const resetPrediction = () => {
    showResults.value = false
    isLoading.value = false
  }

  // Download results (placeholder)
  const handleDownload = () => {
    // TODO: Implement actual download functionality
    alert('Fitur download akan segera hadir!')
  }

  return {
    isLoading,
    showResults,
    predictionResults,
    handlePredict,
    resetPrediction,
    handleDownload,
  }
}
