// src/modules/landing/presentation/composables/useImageDrop.ts
import { ref } from 'vue'

export function useImageDrop() {
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
        target.value = ''
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

  return {
    fileInput,
    previewImage,
    selectedFileName,
    isDragging,
    handleFileSelect,
    handleDrop,
    removeImage,
  }
}
