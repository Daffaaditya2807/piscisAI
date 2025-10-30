import { ref } from 'vue'

export function useTypingEffect(speed = 50, deleteSpeed = 30) {
  const displayedText = ref('')
  let interval: number | null = null

  function startTyping(fullText: string) {
    if (interval) clearInterval(interval)

    // Jika ada teks lama → hapus dulu
    let index = displayedText.value.length
    interval = window.setInterval(() => {
      if (index > 0) {
        displayedText.value = displayedText.value.slice(0, -1)
        index--
      } else {
        clearInterval(interval!)
        // Setelah selesai hapus → mulai ketik baru
        let newIndex = 0
        interval = window.setInterval(() => {
          displayedText.value += fullText[newIndex]
          newIndex++
          if (newIndex >= fullText.length) {
            clearInterval(interval!)
          }
        }, speed)
      }
    }, deleteSpeed)
  }

  return { displayedText, startTyping }
}
