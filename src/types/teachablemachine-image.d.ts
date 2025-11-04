declare module '@teachablemachine/image' {
  import type * as TF from '@tensorflow/tfjs'

  export interface TMPrediction {
    className: string
    probability: number
  }

  export interface TMModel {
    predict(el: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement): Promise<TMPrediction[]>
    getTotalClasses?(): number
  }

  // fungsi yang dipanggil di code kamu
  export function load(modelUrl: string, metadataUrl?: string): Promise<TMModel>

  // beberapa build mengekspor tf juga; opsional:
  export const tf: typeof TF | undefined
}
