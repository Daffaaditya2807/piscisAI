// src/modules/landing/presentation/composables/useImageDrop.ts
import { ref } from 'vue'

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB in bytes

export function useImageDrop() {
  const fileInput = ref<HTMLInputElement | null>(null)
  const previewImage = ref<string | null>(null)
  const selectedFileName = ref<string>('')
  const isDragging = ref(false)

  const handleFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Hanya file gambar yang diperbolehkan!')
      target.value = ''
      return
    }

    // Validate file size (max 2MB)
    if (file.size > MAX_FILE_SIZE) {
      alert('Ukuran file terlalu besar! Maksimal 2MB.')
      target.value = ''
      return
    }

    selectedFileName.value = file.name
    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.value = e.target?.result as string
      target.value = ''
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (event: DragEvent) => {
    isDragging.value = false
    const file = event.dataTransfer?.files[0]

    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Hanya file gambar yang diperbolehkan!')
      return
    }

    // Validate file size (max 2MB)
    if (file.size > MAX_FILE_SIZE) {
      alert('Ukuran file terlalu besar! Maksimal 2MB.')
      return
    }

    selectedFileName.value = file.name
    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
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
