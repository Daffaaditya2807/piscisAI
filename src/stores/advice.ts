import { defineStore } from 'pinia'
import axios from 'axios'

interface AdviceSlip {
  id: number
  advice: string
}

interface AdviceState {
  advice: string
}

export const useAdviceStore = defineStore('advice', {
  state: (): AdviceState => ({
    advice: '...',
  }),
  actions: {
    async fetchAdvice() {
      try {
        const response = await axios.get<{ slip: AdviceSlip }>('https://api.adviceslip.com/advice')
        this.advice = response.data.slip.advice
      } catch (error) {
        this.advice = 'Failed to fetch advice.'
        console.error(error)
      }
    },
  },
})
